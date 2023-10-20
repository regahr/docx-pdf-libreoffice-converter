import UserTrail from '../../models/auth/UserTrail.model';

export const UserTrailFunc = {
  /**
   * Create user trail.
   * @param {Object} data
   * @returns created user trail
   */
  async create(emailAddress, phoneNumber, sessionId, isLogin) {
    const payload = {
      emailAddress,
      phoneNumber,
      sessionId
    };
    if (isLogin) {
      payload.loginAt = new Date();
    }
    else {
      payload.logoutAt = new Date();
    }
    return UserTrail.create(payload);
  }
};

export function noop() {}
