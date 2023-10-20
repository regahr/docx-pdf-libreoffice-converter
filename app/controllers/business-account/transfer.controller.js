import errorsConfig from '../../configs/business-account/errors.config';
import { TransferFunc } from '../../functions/business-account/transfer.function';
import { errorsGenerator } from '../../utils/error.util';
import { okResponse } from '../../variables/common.variable';

export const TransferController = {

  async lockExchangeRate(req, res, next) {
    const name = 'Exchange rate lock and hold';
    try {
      const organizationId = req.credentials.organization._id.toString();
      const userEmail = req.credentials.user.emailAddresses[0];
      const { niumCustomerId } = req.credentials.organization;
      const { destinationCurrency, niumWalletId, currency } = req.query;
      if (!niumWalletId) throw new Error(errorsConfig.BA_WALLET_NOT_FOUND_ON_NIUM.message);
      let selectedCurrency = 'SGD';
      if (currency) {
        selectedCurrency = currency;
      }

      const response = await TransferFunc
        .lockExchangeRate(
          niumCustomerId,
          destinationCurrency,
          niumWalletId,
          userEmail,
          organizationId,
          selectedCurrency
        );
      if (!response) throw new Error('Critical! Failed to interact with database');
      res.status(200).json(okResponse('OK', '00', response, name));
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        errorsConfig.BA_WALLET_NOT_FOUND_ON_NIUM
      ]);
      next({ req: { ...req }, name, metaResponse });
    }
  }

};

export default { TransferController };
