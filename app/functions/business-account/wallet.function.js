import errorsConfig from '../../configs/business-account/errors.config';
import Wallet from '../../models/business-account/Wallet.model';
import SystemVariable from '../../models/SystemVariables.model';
import { NiumApiService } from '../../services/service.nium';
import { postNiumError } from '../../services/service.slack';
import { niumServiceWrapper } from '../../utils/mapstruct.util';
import {
  EUR_2ISO_CODE, EuroSysVarCode, VirtualAccountPayloads, WalletCurrencies
} from '../../variables/enum.variable';
import { OrganizationFunc } from '../auth/organization.function';

let secondsBeforeChecked = 0;

export const WalletFunc = {

  /**
   * Update wallet data.
   * @param {Object} data
   * @param {string} _id
   * @returns updated wallet
   */
  async put(payload, _id) {
    return Wallet.findOneAndUpdate({ _id }, {
      ...payload
      // commenting $inc because causing error MongoDB UpdateConflict
      // $inc: { __v: 1 }
    }, { new: true });
  },

  /**
   * Get wallet data by organizationId.
   * @param {string} userEmail
   * @param {object} organization
   * @returns {Promise<NiumWallet[]>}
   */
  async getWallets(userEmail, organization) {
    const organizationId = organization._id.toString();
    const wallets = await Wallet.find({ organizationId }).lean();
    if (!wallets || (wallets && wallets.length === 0)) {
      throw new Error(errorsConfig.BA_WALLET_LIST_EMPTY.message);
    }
    const walletHashId = wallets[0].niumWalletId;
    WalletCurrencies.forEach(async (currency) => {
      const isWalletNotExist = wallets.filter((w) => w.currency === currency).length === 0;
      if (isWalletNotExist) {
        await Wallet.create(
          {
            niumWalletId: walletHashId,
            organizationId: organization._id,
            createdBy: organization._id,
            currency
          }
        );
      }
    });
    const updatedWallet = await Promise.all(wallets.map(async (w) => {
      const fw = w;

      // if (process.env.NODE_ENV !== 'production') {
      const checkSeconds = (new Date().getSeconds() - secondsBeforeChecked);
      // cant update second wallet coz of checkSeconds, add temp solution: checkSeconds = 0
      if (checkSeconds > 30 || checkSeconds < -30 || checkSeconds === 0) {
        secondsBeforeChecked = new Date().getSeconds();
        this.updateWalletBalance(w, organizationId, userEmail).catch(async (e) => {
          if (process.env.NODE_ENV !== 'test') {
            postNiumError(organizationId, organization.companyName, w.niumWalletId, 'GET Wallet', e);
          }
        });
      }
      // }
      // else {
      // this.updateWalletBalance(w, organizationId, userEmail);
      // }
      if (fw.currency === 'EUR') {
        const findCurrencyFlag = await SystemVariable.findOne({ code: EuroSysVarCode });
        if (!findCurrencyFlag) throw new Error('EUR currency variable not found in DB!');
        // TODO not relatable anymore countryFlag x currencyFlag
        fw.countryFlag = findCurrencyFlag.value.flagUrl;
        fw.countryFlagCircle = findCurrencyFlag.value.flagUrlCircle;
        fw.countryIso2Code = EUR_2ISO_CODE;
        return fw;
      }
      const findCountryFlag = await SystemVariable.findOne({ 'value.currencyCode': fw.currency });
      fw.countryFlag = findCountryFlag.value.countryFlagUrl;
      fw.countryFlagCircle = findCountryFlag.value.countryFlagUrlCircle;
      fw.countryIso2Code = findCountryFlag.value.countryIso2Code;
      fw.countryName = findCountryFlag.value.countryName;
      return fw;
    }));
    if (!updatedWallet || (updatedWallet && updatedWallet.length === 0)) {
      throw new Error(errorsConfig.BA_WALLET_LIST_EMPTY.message);
    }
    return updatedWallet;
  },

  async getWalletByParams(params) {
    const wallet = await Wallet.findOne(params);
    if (!wallet) throw new Error(errorsConfig.BA_WALLET_LIST_EMPTY.message);
    return wallet;
  },

  async updateWalletBalance(walletData, organizationId, userEmail = '') {
    const organization = await OrganizationFunc.findById(organizationId);
    const wallet = typeof walletData.toJSON === 'function' ? walletData.toJSON() : walletData;
    const fn = await niumServiceWrapper(NiumApiService.getWallets(
      organization.niumCustomerId, wallet.niumWalletId
    ), {
      organizationId,
      organizationName: organization.companyName,
      niumWalletId: wallet.niumWalletId,
      niumApi: 'Update Wallet Balance'
    });
    const filteredFn = fn.filter((w) => w.curSymbol === wallet.currency);
    const payload = {
      ...wallet,
      balance: filteredFn[0].balance,
      holdingBalance: filteredFn[0].withHoldingBalance,
      currency: filteredFn[0].curSymbol,
      default: filteredFn[0].default
    };
    const details = await niumServiceWrapper(NiumApiService.getVirtualAccount(
      organization.niumCustomerId, wallet.niumWalletId
    ), {
      organizationId,
      organizationName: organization.companyName,
      niumWalletId: wallet.niumWalletId,
      niumApi: 'updateWalletBalance Function - Get Virtual Account'
    });

    const isVanFound = details.filter((detail) => detail.currencyCode === wallet.currency)
      .length > 0;
    if (!isVanFound) {
      const vaPayload = VirtualAccountPayloads
        .filter((vap) => vap.currency === wallet.currency);
      if (!vaPayload.length) throw new Error(`Virtual Account payload not found for ${wallet.currency}`);
      vaPayload.forEach(async (vap) => {
        await niumServiceWrapper(NiumApiService
          .assignVirtualAccount(
            organization.niumCustomerId,
            wallet.niumWalletId,
            vap.payload
          ), {
          organizationId,
          organizationName: organization.companyName,
          niumWalletId: wallet.niumWalletId,
          niumApi: 'updateWalletBalance Function - Assign Virtual Account'
        });
      });
    }

    details.forEach((detail) => {
      if (detail.currencyCode === wallet.currency) {
        let vaType = detail.accountType.toLowerCase();

        if (vaType === 'local+global') {
          vaType = 'global';
        }
        else if (vaType === 'global') {
          vaType = 'overseas';
        }

        const virtualAccountDetail = {
          currencyCode: detail.currencyCode,
          accountName: detail.accountName,
          accountType: detail.accountType,
          accountNumber: detail.uniquePaymentId,
          bankName: detail.bankName,
          fullBankName: detail.fullBankName,
          bankAddress: detail.bankAddress,
          routingCodeType1: detail.routingCodeType1,
          routingCodeValue1: detail.routingCodeValue1,
          routingCodeType2: detail.routingCodeType2,
          routingCodeValue2: detail.routingCodeValue2,
          isVanLocked: true,
          accountNameMPES: '',
          bankCode: '',
          branchCode: ''
        };

        if (!payload.virtualAccounts) {
          payload.virtualAccounts = {};
        }

        if (payload.virtualAccounts[`${vaType}`] && payload.virtualAccounts[`${vaType}`].isVanLocked) {
          return;
        }

        payload.virtualAccounts[`${vaType}`] = virtualAccountDetail;
      }
    });
    if (userEmail) payload.updatedBy = userEmail;
    await this.put(payload, wallet._id);
  }

};

export default { WalletFunc };
