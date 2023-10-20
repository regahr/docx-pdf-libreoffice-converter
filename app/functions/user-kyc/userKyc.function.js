import UserKyc from '../../models/user-kyc/UserKyc.model';

export const UserKycFunc = {

  async getByQuery(query) {
    const userKyc = await UserKyc.find(query);
    return userKyc;
  }

};

export default function noop() { }
