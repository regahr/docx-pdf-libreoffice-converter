/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import { NiumApiService } from '../../services/service.nium';
import { WalletFunc } from './wallet.function';
import { niumServiceWrapper } from '../../utils/mapstruct.util';

export const TransferFunc = {

  /**
   * Exchange rate lock and hold.
   * @param {string} niumCustomerId
   * @param {string} destinationCurrency
   * @param {string} niumWalletId
   * @param {string} userEmail
   * @param {string} organizationId
   * @returns {Promise<NiumExchangeRateLockAndHold>}
   */
  async lockExchangeRate(
    niumCustomerId, destinationCurrency, niumWalletId, userEmail, organizationId, currency
  ) {
    const wallet = await WalletFunc.getWalletByParams({ organizationId, niumWalletId, currency });

    const niumResponse = await niumServiceWrapper(NiumApiService
      .getExchangeRate(niumCustomerId, niumWalletId, wallet.currency, destinationCurrency), {
      organizationId,
      organizationName: userEmail,
      niumWalletId,
      niumApi: 'Lock Exchange Rate - Get Exchange Rate'
    });
    if (!niumResponse) throw new Error('Critical! Failed to interact with nium');
    return niumResponse;
  }
};

export default { TransferFunc };
