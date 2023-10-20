import errorsConfig from '../../configs/business-account/errors.config';
import { WalletFunc } from '../../functions/business-account/wallet.function';
import { errorsGenerator } from '../../utils/error.util';
import { okResponse } from '../../variables/common.variable';
import { RolePermissionValue } from '../../variables/enum.variable';

export const WalletController = {
  async getWallets(req, res, next) {
    const name = 'Get wallets';
    try {
      const { organization, user, permission } = req.credentials;
      const userEmail = user.emailAddresses[0];
      let response = await WalletFunc
        .getWallets(userEmail, organization);
      if (!response) throw new Error('Critical! Failed to interact with database');
      if (
        permission.value === RolePermissionValue.NO_ACCESS
      ) {
        response = response.map((wallet) => ({
          niumWalletId: wallet.niumWalletId,
          currency: wallet.currency,
          countryFlag: wallet.countryFlag,
          countryFlagCircle: wallet.countryFlagCircle
        }));
      }
      res.status(200).json(okResponse('OK', '00', response, name));
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        errorsConfig.BA_WALLET_LIST_EMPTY,
        errorsConfig.BA_WALLET_NOT_FOUND_ON_NIUM
      ]);
      next({ req: { ...req }, name, metaResponse });
    }
  }
};

export default { WalletController };
