import Users from '../../models/auth/Users.model';
import { getDatas } from '../../utils/mongo-query-builder.util';

const concatDialCodeToPhoneNumber = {
  $addFields: {
    dialCodePhoneNumber: {
      $concat: ['$dialCode', '$phoneNumber']
    }
  }
};
const toMatchPhones = (phones) => ({
  $match: {
    $and: [
      {
        dialCodePhoneNumber: {
          $in: phones
        }
      }
    ]
  }
});

const toMatchPhone = (phone) => ({
  $match: {
    $and: [
      {
        dialCodePhoneNumber: {
          $eq: phone
        }
      }
    ]
  }
});

export const UsersFunc = {
  /**
   * Create user.
   * @param {Object} data
   * @returns created users
   */
  async create(payload) {
    return Users.create(payload);
  },

  /**
   * Find all users.
   * @returns users
   */
  async getAll(opts = null) {
    return getDatas(Users, opts);
  },

  /**
   * Find user by id.
   * @returns user
   */
  async findOne(id) {
    return Users.findById(id);
  },

  /**
   * Sign up user.
   * @param {Object} data
   * @returns created users
   */
  async signUp(data) {
    const payload = {
      dialCode: data.dialCode,
      phoneNumber: data.phoneNumber,
      emailAddresses: [data.emailAddress.toLowerCase()],
      pin: data.pin,
      callFirstName: data.firstName,
      callLastName: data.lastName
    };
    return Users.create(payload);
  },
  /**
   * Find one user by email.
   * @param {string} email
   * @returns user
   */
  async findOneByEmail(emailAddress) {
    return Users.findOne({ emailAddresses: emailAddress });
  },
  /**
   * Find one user by phone number.
   * @param {string} phoneNumber
   * @returns user
   */
  async findOneByPhoneNumber(phoneNumber) {
    return Users.findOne({ phoneNumber });
  },

  /**
   * Find one user by list phone number.
   * @param {string[]} phoneNumbers
   * @returns {Promise<Users>}
   */
  async findOneInPhoneNumber(phoneNumbers) {
    return Users.findOne({ phoneNumber: { $in: phoneNumbers } });
  },

  /**
   *  To get one user by  concatenation of dial code and phone number
   * @param {string} phone
   * @returns {Promise<Users>}
   */
  async findOneByConcatDialCodeAndPhoneNumber(phone) {
    const users = await Users.aggregate([
      concatDialCodeToPhoneNumber,
      toMatchPhone(phone)
    ]).exec();

    return users[0];
  },

  /**
   *  To get all user by  concatenation of dial code and phone number
   * @param {string[]} phones
   * @returns {Promise<Users[]>}
   */
  async findAllByConcatDialCodeAndPhoneNumber(phones) {
    const users = await Users.aggregate([
      concatDialCodeToPhoneNumber,
      toMatchPhones(phones)
    ]).exec();

    return users;
  },

  /**
   * Find one user by dial code and phone number.
   * @param {string} dialcode
   * @param {string} phoneNumber
   * @returns user
   */
  async findOneByDialCodeAndPhoneNumber(dialCode, phoneNumber) {
    return Users.findOne({ dialCode, phoneNumber });
  },

  /**
   * Find users by phone number.
   * @param {string} dialcode
   * @param {string} phoneNumber
   * @returns user
   */
  async findByPhoneNumber(phoneNumber) {
    return Users.find({ phoneNumber });
  },

  /**
   * Find users by email address.
   * @param {string} emailAddress
   * @returns user
   */
  async findByEmailAddress(emailAddress) {
    return Users.find({
      emailAddresses: {
        $eq: emailAddress
      }
    });
  },

  /**
   * Find one user by deviceId.
   * @param {string} deviceId
   * @returns user
   */
  async findOneByDeviceId(deviceId) {
    return Users.findOne({ deviceId });
  },
  /**
   * Update one user by email.
   * @param {string} email
   * @returns users
   */
  async updateOneByEmail(email, payload) {
    return Users.findOneAndUpdate({ emailAddresses: email }, {
      ...payload,
      $inc: { __v: 1 }
    }, { new: true });
  },

  /**
   * Update one user.
   * @param {string} id
   * @returns users
   */
  async update(id, payload) {
    return Users.findOneAndUpdate({ _id: id }, {
      ...payload,
      $inc: { __v: 1 }
    }, { new: true });
  },

  /**
   * Update one user by phone number.
   * @param {string} phoneNumber
   * @returns users
   */
  async updateOneByPhoneNumber(phoneNumber, payload) {
    return Users.findOneAndUpdate({ phoneNumber }, {
      ...payload,
      $inc: { __v: 1 }
    }, { new: true });
  },
  /**
   * To get all user by list of phone number
   * @param {string[]} phoneNumbers
   * @returns {Promise<Users[]>}
   */
  async findByPhoneNumbers(phoneNumbers) {
    return Users.find({
      phoneNumber: {
        $in: phoneNumbers
      }
    });
  },

  /**
   * To get all user by ids of phone number
   * @param {string[]} phoneNumbers
   * @returns {Promise<Users[]>}
   */
  async findByEmailAddresses(emailAddresses) {
    return Users.find({
      emailAddresses: {
        $in: emailAddresses
      }
    });
  }

};

export function noop() { }
