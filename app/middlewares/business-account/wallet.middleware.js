import { isValidObjectId } from 'mongoose';
import errorsConfig from '../../configs/business-account/errors.config';
import { postError } from '../../services/service.slack';
import { errorsGenerator } from '../../utils/error.util';
import { errorResponse } from '../../variables/common.variable';

export const WalletMid = {
  async getWallets(req, res, next) {
    const name = 'Get Wallets';
    try {
      const { organizationId } = req.credentials;
      const validity = isValidObjectId(organizationId);
      if (!validity) throw new Error(errorsConfig.INVALID_ORGANIZATION_ID.message);
      next();
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        errorsConfig.INVALID_ORGANIZATION_ID
      ]);
      res.status(metaResponse.httpStatus).json(errorResponse('ERROR',
        metaResponse.code,
        metaResponse.message));
      if (process.env.NODE_ENV !== 'test') {
        postError(req, name, metaResponse.level, metaResponse.message);
      }
    }
  }
};

export default { WalletMid };
