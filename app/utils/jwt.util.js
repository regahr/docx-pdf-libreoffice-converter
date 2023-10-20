import jwt from 'jsonwebtoken';
import envConfig from '../configs/env.config';

/**
 * For generate JWT token
 * @param {any} payload
 * @param {string} secret
 * @param {string} expiresIn  The expired time of the token. Can be 1d, 1m and etc
 * @returns {string}
 */
export const sign = (payload, secret, expiresIn) => jwt.sign(payload, secret, {
  expiresIn
});

/**
 * For generate JWT token for KYB Doc downloading purpose
 * @param {any} payload
 * @returns {string}
 */
export const signForKYBDoc = (payload) => {
  const { secret, ttl } = envConfig.doc;
  return sign(payload, secret, ttl);
};

export default {
  sign,
  signForKYBDoc
};
