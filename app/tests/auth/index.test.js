import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import CryptoJS from 'crypto-js';
import Users from '../../models/auth/Users.model';
import * as api from '../utils/api.util.test';
import { dummyData } from '../seeds/auth/dummyData';
import { AuthFunc } from '../../functions/auth/index.function';
import { UsersFunc } from '../../functions/auth/users.function';
import { OrganizationFunc } from '../../functions/auth/organization.function';
import { dummyDataBusinessAccount } from '../seeds/dummyDataBusinessAccount';
import { CoaOrganizationFunc } from '../../functions/coa/coa-organization.function';
import ApplicationFunc from '../../functions/business-account/application.function';
import applicationErrorConfig from '../../configs/errors/application.config';
import { DocumentFunc } from '../../functions/general/document.function';
import SystemVariable from '../../models/SystemVariables.model';
import { dummyDataCountry } from '../seeds/general/dummyDataCountry';
import { UserTrailFunc } from '../../functions/auth/user-trail.function';
import { CacheUtil } from '../../utils/cache.util';
import { DummyNiumConstant } from '../seeds/dummyNiumData';
import { DummyConstant } from '../seeds/dummyConstants';
import { UserKycFunc } from '../../functions/user-kyc/userKyc.function';

describe('Auth API', () => {
  describe('Sign Up', () => {
    let sandbox = null;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });
    it('Successfully sign up', async () => {
      const payload = {
        dialCode: '+62',
        firstName: 'Rega',
        lastName: 'Halma Ruzty',
        phoneNumber: '87758684682',
        emailAddress: 'rega.hruzty@gmail.com',
        pin: '$2a$12$fgJZhZgGXXaF18kE4aOuIeTw8rMCBpDdPtAKnvdS.ldz5e7GKd6Xu'
      };
      sandbox.stub(Users, 'create').returns(dummyData.Users);
      sandbox.stub(SendgridFunc, 'addingContact').returns({});
      const res = await api.auth({ method: 'signup', payload });
      res.should.have.status(200);
      res.body.should.have.property('code').eql('00');
    });
    it('Failed to sign up because of dialCode is missing', async () => {
      const payload = {
        firstName: 'Rega',
        lastName: 'Halma Ruzty',
        phoneNumber: '87758684682',
        emailAddress: 'rega.hruzty@gmail.com',
        pin: '$2a$12$fgJZhZgGXXaF18kE4aOuIeTw8rMCBpDdPtAKnvdS.ldz5e7GKd6Xu'
      };
      sandbox.stub(Users, 'create').returns(dummyData.Users);
      const res = await api.auth({ method: 'signup', payload });
      res.should.have.status(422);
      res.body.should.have.property('code').eql('200');
    });
    it('Failed to sign up because of dialCode format invalid', async () => {
      const payload = {
        firstName: 'Rega',
        lastName: 'Halma Ruzty',
        dialCode: '62',
        phoneNumber: '87758684682',
        emailAddress: 'rega.hruzty@gmail.com',
        pin: '$2a$12$fgJZhZgGXXaF18kE4aOuIeTw8rMCBpDdPtAKnvdS.ldz5e7GKd6Xu'
      };
      sandbox.stub(Users, 'create').returns(dummyData.Users);
      const res = await api.auth({ method: 'signup', payload });
      res.should.have.status(422);
      res.body.should.have.property('code').eql('201');
    });
    it('Failed to sign up because of phoneNumber is missing', async () => {
      const payload = {
        firstName: 'Rega',
        lastName: 'Halma Ruzty',
        dialCode: '+62',
        emailAddress: 'rega.hruzty@gmail.com',
        pin: '$2a$12$fgJZhZgGXXaF18kE4aOuIeTw8rMCBpDdPtAKnvdS.ldz5e7GKd6Xu'
      };
      sandbox.stub(Users, 'create').returns(dummyData.Users);
      const res = await api.auth({ method: 'signup', payload });
      res.should.have.status(422);
      res.body.should.have.property('code').eql('202');
    });
    it('Failed to sign up because of phoneNumber format invalid', async () => {
      const payload = {
        firstName: 'Rega',
        lastName: 'Halma Ruzty',
        dialCode: '+62',
        phoneNumber: 'abcde',
        emailAddress: 'rega.hruzty@gmail.com',
        pin: '$2a$12$fgJZhZgGXXaF18kE4aOuIeTw8rMCBpDdPtAKnvdS.ldz5e7GKd6Xu'
      };
      sandbox.stub(Users, 'create').returns(dummyData.Users);
      const res = await api.auth({ method: 'signup', payload });
      res.should.have.status(422);
      res.body.should.have.property('code').eql('203');
    });
    it('Failed to sign up because of emailAddress is missing', async () => {
      const payload = {
        firstName: 'Rega',
        lastName: 'Halma Ruzty',
        dialCode: '+62',
        phoneNumber: '87758684682',
        pin: '$2a$12$fgJZhZgGXXaF18kE4aOuIeTw8rMCBpDdPtAKnvdS.ldz5e7GKd6Xu'
      };
      sandbox.stub(Users, 'create').returns(dummyData.Users);
      const res = await api.auth({ method: 'signup', payload });
      res.should.have.status(422);
      res.body.should.have.property('code').eql('204');
    });
    it('Failed to sign up because of emailAddress format invalid', async () => {
      const payload = {
        firstName: 'Rega',
        lastName: 'Halma Ruzty',
        dialCode: '+62',
        phoneNumber: '87758684682',
        emailAddress: 'rega.hruzty',
        pin: '$2a$12$fgJZhZgGXXaF18kE4aOuIeTw8rMCBpDdPtAKnvdS.ldz5e7GKd6Xu'
      };
      sandbox.stub(Users, 'create').returns(dummyData.Users);
      const res = await api.auth({ method: 'signup', payload });
      res.should.have.status(422);
      res.body.should.have.property('code').eql('205');
    });
    it('Failed to sign up because of pin is missing', async () => {
      const payload = {
        firstName: 'Rega',
        lastName: 'Halma Ruzty',
        dialCode: '+62',
        phoneNumber: '87758684682',
        emailAddress: 'rega.hruzty@gmail.com'
      };
      sandbox.stub(Users, 'create').returns(dummyData.Users);
      const res = await api.auth({ method: 'signup', payload });
      res.should.have.status(422);
      res.body.should.have.property('code').eql('206');
    });
    it('Failed to sign up because of pin format invalid', async () => {
      const payload = {
        firstName: 'Rega',
        lastName: 'Halma Ruzty',
        dialCode: '+62',
        phoneNumber: '87758684682',
        emailAddress: 'rega.hruzty@gmail.com',
        pin: '123456'
      };
      sandbox.stub(Users, 'create').returns(dummyData.Users);
      const res = await api.auth({ method: 'signup', payload });
      res.should.have.status(422);
      res.body.should.have.property('code').eql('207');
    });
    it('Failed to sign up phoneNumber already exists', async () => {
      const payload = {
        firstName: 'Rega',
        lastName: 'Halma Ruzty',
        dialCode: '+62',
        phoneNumber: '87758684682',
        emailAddress: 'rega.hruzty@gmail.com',
        pin: '$2a$12$fgJZhZgGXXaF18kE4aOuIeTw8rMCBpDdPtAKnvdS.ldz5e7GKd6Xu'
      };
      const errorDuplicate = {
        index: 0,
        code: 11000,
        keyPattern: { phoneNumber: 1 },
        keyValue: { phoneNumber: '+6287758684682' }
      };
      sandbox.stub(Users, 'create').throws(errorDuplicate);
      const res = await api.auth({ method: 'signup', payload });
      res.should.have.status(400);
      res.body.should.have.property('code').eql('208');
    });
    it('Failed to sign up because of email address already exists', async () => {
      const payload = {
        firstName: 'Rega',
        lastName: 'Halma Ruzty',
        dialCode: '+62',
        phoneNumber: '87758684682',
        emailAddress: 'rega.hruzty@gmail.com',
        pin: '$2a$12$fgJZhZgGXXaF18kE4aOuIeTw8rMCBpDdPtAKnvdS.ldz5e7GKd6Xu'
      };
      const errorDuplicate = {
        index: 0,
        code: 11000,
        keyPattern: { emailAddresses: 1 },
        keyValue: { emailAddresses: 'rega.hruzty@gmail.com' }
      };
      sandbox.stub(Users, 'create').throws(errorDuplicate);
      const res = await api.auth({ method: 'signup', payload });
      res.should.have.status(400);
      res.body.should.have.property('code').eql('209');
    });
    it('Failed to sign up because of first name is missing', async () => {
      const payload = {
        lastName: 'Halma Ruzty',
        dialCode: '+62',
        phoneNumber: '87758684682',
        emailAddress: 'rega.hruzty@gmail.com',
        pin: '$2a$12$fgJZhZgGXXaF18kE4aOuIeTw8rMCBpDdPtAKnvdS.ldz5e7GKd6Xu'
      };
      sandbox.stub(Users, 'create').returns(dummyData.Users);
      const res = await api.auth({ method: 'signup', payload });
      res.should.have.status(422);
      res.body.should.have.property('code').eql('246');
    });
    it('Failed to sign up because of last name is missing', async () => {
      const payload = {
        firstName: 'Rega',
        dialCode: '+62',
        phoneNumber: '87758684682',
        emailAddress: 'rega.hruzty@gmail.com',
        pin: '$2a$12$fgJZhZgGXXaF18kE4aOuIeTw8rMCBpDdPtAKnvdS.ldz5e7GKd6Xu'
      };
      sandbox.stub(Users, 'create').returns(dummyData.Users);
      const res = await api.auth({ method: 'signup', payload });
      res.should.have.status(422);
      res.body.should.have.property('code').eql('247');
    });
  });

  describe('Check Token', () => {
    let sandbox = null;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });
    it('Check return valid', async () => {
      const cookies = 'access_token=accesstoken';
      sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
      sandbox.stub(UsersFunc, 'findOneByEmail').returns(dummyData.Users);
      sandbox.stub(OrganizationFunc, 'findOne').returns(dummyDataBusinessAccount.organization);
      const res = await api.auth({ method: 'check-token', cookies });
      res.should.have.status(200);
      res.body.should.have.property('code').eql('00');
    });
    it('Check return invalid because jwt malformed', async () => {
      const cookies = 'access_token=invalidToken';
      const res = await api.auth({ method: 'check-token', cookies });
      res.should.have.status(500);
      res.body.should.have.property('code').eql('98');
    });
    it('Check return invalid because token not present', async () => {
      const cookies = 'notatoken=noneimportant';
      const res = await api.auth({ method: 'check-token', cookies });
      res.should.have.status(403);
      res.body.should.have.property('code').eql('210');
    });
  });

  describe('Request Code', () => {
    let sandbox = null;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });
    it('Code sent', async () => {
      const cookies = 'access_token=accesstoken';
      sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
      sandbox.stub(AuthFunc, 'requestCode').returns(dummyData.SentCode);
      const res = await api.auth({ method: 'request-code', payload: { channel: 'sms' }, cookies });
      res.should.have.status(200);
      res.body.should.have.property('code').eql('00');
    });
    it('Code failed to sent because channel not exists', async () => {
      const cookies = 'access_token=accesstoken';
      sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
      sandbox.stub(AuthFunc, 'requestCode').returns(dummyData.SentCode);
      const res = await api.auth({ method: 'request-code', payload: { }, cookies });
      res.should.have.status(422);
      res.body.should.have.property('code').eql('214');
    });
    it('Code failed to sent because channel invalid', async () => {
      const cookies = 'access_token=accesstoken';
      sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
      sandbox.stub(AuthFunc, 'requestCode').returns(dummyData.SentCode);
      const res = await api.auth({ method: 'request-code', payload: { channel: 'invalid' }, cookies });
      res.should.have.status(422);
      res.body.should.have.property('code').eql('215');
    });
    it('Code failed to sent because token not present', async () => {
      const cookies = 'invalid=accesstoken';
      sandbox.stub(AuthFunc, 'requestCode').returns(dummyData.SentCode);
      const res = await api.auth({ method: 'request-code', payload: { channel: 'sms' }, cookies });
      res.should.have.status(422);
      res.body.should.have.property('code').eql('200');
    });
  });

  describe('Verify Code', () => {
    let sandbox = null;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });
    it('Code verified', async () => {
      const cookies = 'access_token=accesstoken';
      sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
      sandbox.stub(AuthFunc, 'verifyCode').returns(dummyData.VerifiedCode);
      sandbox.stub(UsersFunc, 'updateOneByEmail').returns(dummyData.VerifiedPhoneUsers);
      const res = await api.auth({ method: 'verify-code', payload: { channel: 'sms', code: '123456' }, cookies });
      res.should.have.status(200);
      res.body.should.have.property('code').eql('00');
    });
    it('Code failed to verified because channel not exists', async () => {
      const cookies = 'access_token=accesstoken';
      sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
      sandbox.stub(AuthFunc, 'verifyCode').returns(dummyData.VerifiedCode);
      sandbox.stub(UsersFunc, 'updateOneByEmail').returns(dummyData.VerifiedPhoneUsers);
      const res = await api.auth({ method: 'verify-code', payload: { code: '123456' }, cookies });
      res.should.have.status(422);
      res.body.should.have.property('code').eql('214');
    });
    it('Code failed to verified because channel invalid', async () => {
      const cookies = 'access_token=accesstoken';
      sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
      sandbox.stub(AuthFunc, 'verifyCode').returns(dummyData.VerifiedCode);
      sandbox.stub(UsersFunc, 'updateOneByEmail').returns(dummyData.VerifiedPhoneUsers);
      const res = await api.auth({ method: 'verify-code', payload: { channel: 'invalid', code: '123456' }, cookies });
      res.should.have.status(422);
      res.body.should.have.property('code').eql('215');
    });
    it('Code failed to verified because code not exists', async () => {
      const cookies = 'access_token=accesstoken';
      sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
      sandbox.stub(AuthFunc, 'verifyCode').returns(dummyData.VerifiedCode);
      sandbox.stub(UsersFunc, 'updateOneByEmail').returns(dummyData.VerifiedPhoneUsers);
      const res = await api.auth({ method: 'verify-code', payload: { channel: 'sms' }, cookies });
      res.should.have.status(422);
      res.body.should.have.property('code').eql('216');
    });
    it('Code failed to verified because code invalid', async () => {
      const cookies = 'access_token=accesstoken';
      sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
      sandbox.stub(AuthFunc, 'verifyCode').returns(dummyData.VerifiedCode);
      sandbox.stub(UsersFunc, 'updateOneByEmail').returns(dummyData.VerifiedPhoneUsers);
      const res = await api.auth({ method: 'verify-code', payload: { channel: 'sms', code: 'invalid' }, cookies });
      res.should.have.status(422);
      res.body.should.have.property('code').eql('217');
    });
    it('Code failed to verified because token not present', async () => {
      const cookies = 'invalid=accesstoken';
      sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
      sandbox.stub(AuthFunc, 'verifyCode').returns(dummyData.VerifiedCode);
      sandbox.stub(UsersFunc, 'updateOneByEmail').returns(dummyData.VerifiedPhoneUsers);
      const res = await api.auth({ method: 'verify-code', payload: { channel: 'sms', code: '123456' }, cookies });
      res.should.have.status(422);
      res.body.should.have.property('code').eql('200');
    });
  });

  describe('Sign In', () => {
    let sandbox = null;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });
    it('Successfully sign in with recognized device id', async () => {
      const payload = {
        dialCode: '+62',
        phoneNumber: '87758684682',
        emailAddress: 'rega.hruzty@gmail.com',
        encryptedPin: 'U2FsdGVkX1/hygpKTf+WDkqX0lCPxS8w1y2wX4ZC8ag=',
        deviceId: 'recognizedDeviceId'
      };
      sandbox.stub(AuthFunc, 'signin').returns(dummyData.UsersWithRecognizedId);
      sandbox.stub(UserKycFunc, 'getByQuery').returns([]);
      const res = await api.auth({ method: 'signin', payload });
      res.should.have.status(200);
      res.body.should.have.property('code').eql('00');
      res.body.should.have.property('data').eql({
        status: 'Authenticated',
        isRecognized: true,
        credentials: {
          emailAddresses: [
            'rega.hruzty@gmail.com'
          ],
          mainEmailAddress: 'rega.hruzty@gmail.com',
          phoneNumber: '+6287758684682',
          userKycId: null
        }
      });
    });
    it('Successfully sign in with not recognized device id', async () => {
      const payload = {
        dialCode: '+62',
        phoneNumber: '87758684682',
        emailAddress: 'rega.hruzty@gmail.com',
        encryptedPin: 'U2FsdGVkX1/hygpKTf+WDkqX0lCPxS8w1y2wX4ZC8ag=',
        deviceId: 'notRecognizedDeviceId'
      };
      sandbox.stub(AuthFunc, 'signin').returns(dummyData.UsersWithNotRecognizedId);
      sandbox.stub(UserKycFunc, 'getByQuery').returns([]);
      const res = await api.auth({ method: 'signin', payload });
      res.should.have.status(200);
      res.body.should.have.property('code').eql('00');
      res.body.should.have.property('data').eql({
        status: 'Authenticated',
        isRecognized: false,
        credentials: {
          emailAddresses: [
            'rega.hruzty@gmail.com'
          ],
          mainEmailAddress: 'rega.hruzty@gmail.com',
          phoneNumber: '+6287758684682',
          userKycId: null
        }
      });
    });
    it('Failed sign in, device id not present', async () => {
      const payload = {
        dialCode: '+62',
        phoneNumber: '87758684682',
        emailAddress: 'rega.hruzty@gmail.com',
        encryptedPin: 'U2FsdGVkX1/hygpKTf+WDkqX0lCPxS8w1y2wX4ZC8ag='
      };
      const res = await api.auth({ method: 'signin', payload });
      res.should.have.status(422);
      res.body.should.have.property('code').eql('249');
    });
    it('Failed sign in, user is not exists', async () => {
      const payload = {
        dialCode: '+62',
        phoneNumber: '87758684682',
        emailAddress: 'rega.hruzty@gmail.com',
        encryptedPin: 'U2FsdGVkX1/hygpKTf+WDkqX0lCPxS8w1y2wX4ZC8ag=',
        deviceId: 'notRecognizedDeviceId'
      };
      sandbox.stub(UsersFunc, 'findOneByEmail').returns(null);
      const res = await api.auth({ method: 'signin', payload });
      res.should.have.status(404);
      res.body.should.have.property('code').eql('230');
    });
    it('Failed sign in, user is inactive', async () => {
      const payload = {
        dialCode: '+62',
        phoneNumber: '87758684682',
        emailAddress: 'rega.hruzty@gmail.com',
        encryptedPin: 'U2FsdGVkX1/hygpKTf+WDkqX0lCPxS8w1y2wX4ZC8ag=',
        deviceId: 'notRecognizedDeviceId'
      };
      sandbox.stub(UsersFunc, 'findOneByEmail').returns(dummyData.InactiveUsers);
      sandbox.stub(OrganizationFunc, 'findOrganizationByUser').returns(dummyData.Organization);
      sandbox.stub(UserTrailFunc, 'create').returns({});
      const res = await api.auth({ method: 'signin', payload });
      res.should.have.status(401);
      res.body.should.have.property('code').eql('231');
    });
    it('Failed sign in, user is blocked', async () => {
      const payload = {
        dialCode: '+62',
        phoneNumber: '87758684682',
        emailAddress: 'rega.hruzty@gmail.com',
        encryptedPin: 'U2FsdGVkX1/hygpKTf+WDkqX0lCPxS8w1y2wX4ZC8ag=',
        deviceId: 'notRecognizedDeviceId'
      };
      sandbox.stub(UsersFunc, 'findOneByEmail').returns(dummyData.InactiveUsers);
      sandbox.stub(OrganizationFunc, 'findOrganizationByUser').returns(dummyData.Organization);
      sandbox.stub(UsersFunc, 'updateOneByEmail').returns({});
      sandbox.stub(UserTrailFunc, 'create').returns({});
      const res = await api.auth({ method: 'signin', payload });
      res.should.have.status(401);
      res.body.should.have.property('code').eql('231');
    });
    it('Failed sign in, wrong pin attempt', async () => {
      const payload = {
        dialCode: '+62',
        phoneNumber: '87758684682',
        emailAddress: 'rega.hruzty@gmail.com',
        encryptedPin: 'wrongpin',
        deviceId: 'notRecognizedDeviceId'
      };
      sandbox.stub(UsersFunc, 'findOneByEmail').returns(dummyData.Users);
      sandbox.stub(OrganizationFunc, 'findOrganizationByUser').returns(dummyData.Organization);
      sandbox.stub(CryptoJS.AES, 'decrypt').returns({
        words: [627359522, 357364596, 2008462679, 1091555737],
        sigBytes: -110
      });
      sandbox.stub(bcrypt, 'compareSync').returns(false);
      sandbox.stub(UsersFunc, 'updateOneByEmail').returns(dummyData.Users);
      sandbox.stub(UserTrailFunc, 'create').returns({});
      const res = await api.auth({ method: 'signin', payload });
      res.should.have.status(401);
      res.body.should.have.property('code').eql('232');
    });
  });

  describe('Exists check', () => {
    let sandbox = null;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });
    it('Exists as phone number with dial code and + symbol', async () => {
      const payload = {
        toBeChecked: '+6287758684682'
      };
      sandbox.stub(UsersFunc, 'findByEmailAddress').returns([]);
      sandbox.stub(UsersFunc, 'findOneByConcatDialCodeAndPhoneNumber').returns(dummyData.Users);
      const res = await api.auth({ method: 'exists-check', payload });
      res.should.have.status(200);
      res.body.should.have.property('code').eql('00');
      res.body.should.have.property('data').eql({
        exists: true,
        as: 'phoneNumber',
        credential: {
          isActive: true,
          isBlocked: false,
          dialCode: '+62',
          phoneNumber: '87758684682'
        },
        isHaveMultiCredential: false
      });
    });

    it('Exists as phone number w/o dial code', async () => {
      const payload = {
        toBeChecked: '6287758684682'
      };
      sandbox.stub(UsersFunc, 'findByEmailAddress').returns([]);
      sandbox.stub(UsersFunc, 'findOneByConcatDialCodeAndPhoneNumber').returns(null);
      sandbox.stub(UsersFunc, 'findAllByConcatDialCodeAndPhoneNumber').returns([]);
      sandbox.stub(UsersFunc, 'findByPhoneNumbers').returns([dummyData.Users]);
      const res = await api.auth({ method: 'exists-check', payload });
      res.should.have.status(200);
      res.body.should.have.property('code').eql('00');
      res.body.should.have.property('data').eql({
        exists: true,
        as: 'phoneNumber',
        credential: {
          isActive: true,
          isBlocked: false,
          dialCode: '+62',
          phoneNumber: '87758684682'
        },
        isHaveMultiCredential: false
      });
    });

    it('Exists as phone number w/o dial code with multi credential', async () => {
      const payload = {
        toBeChecked: '6287758684682'
      };
      sandbox.stub(UsersFunc, 'findByEmailAddress').returns([]);
      sandbox.stub(UsersFunc, 'findOneByConcatDialCodeAndPhoneNumber').returns(null);
      sandbox.stub(UsersFunc, 'findAllByConcatDialCodeAndPhoneNumber').returns([]);
      sandbox.stub(UsersFunc, 'findByPhoneNumbers').returns([dummyData.Users, dummyData.Users]);
      const res = await api.auth({ method: 'exists-check', payload });
      res.should.have.status(200);
      res.body.should.have.property('code').eql('00');
      res.body.should.have.property('data').eql({
        exists: true,
        as: 'phoneNumber',
        credential: {
          phoneNumber: '87758684682'
        },
        isHaveMultiCredential: true
      });
    });

    it('Exists as email address', async () => {
      const payload = {
        toBeChecked: 'rega.hruzty@gmail.com'
      };
      sandbox.stub(UsersFunc, 'findByEmailAddress').returns([dummyData.Users]);
      const res = await api.auth({ method: 'exists-check', payload });
      res.should.have.status(200);
      res.body.should.have.property('code').eql('00');
      res.body.should.have.property('data').eql({
        exists: true,
        as: 'emailAddress',
        credential: {
          isActive: true,
          isBlocked: false,
          mainEmailAddress: 'rega.hruzty@gmail.com'
        },
        isHaveMultiCredential: false
      });
    });

    it('Exists as email address by mobile app', async () => {
      const payload = {
        toBeChecked: 'rega.hruzty@gmail.com'
      };
      sandbox.stub(UsersFunc, 'findByEmailAddress').returns([dummyData.Users]);
      const res = await api.auth({ method: 'exists-check', payload, userAgent: 'mobile' });
      res.should.have.status(200);
      res.body.should.have.property('code').eql('00');
      res.body.should.have.property('data').eql({
        exists: true,
        as: 'emailAddress',
        credential: {
          isActive: true,
          isBlocked: false,
          mainEmailAddress: 'rega.hruzty@gmail.com',
          dialCode: '+62',
          phoneNumber: '87758684682'
        },
        isHaveMultiCredential: false
      });
    });

    it('Failed because not found as email address and length < 5 chars', async () => {
      const payload = {
        toBeChecked: '1234'
      };
      sandbox.stub(UsersFunc, 'findByEmailAddress').returns([]);
      const res = await api.auth({ method: 'exists-check', payload });
      res.should.have.status(422);
      res.body.should.have.property('code').eql('250');
    });
    it('Not exists', async () => {
      const payload = {
        toBeChecked: '+6287758684682'
      };
      sandbox.stub(UsersFunc, 'findByEmailAddress').returns([]);
      sandbox.stub(UsersFunc, 'findOneByConcatDialCodeAndPhoneNumber').returns(null);
      sandbox.stub(UsersFunc, 'findAllByConcatDialCodeAndPhoneNumber').returns([]);
      sandbox.stub(UsersFunc, 'findByPhoneNumbers').returns([]);
      const res = await api.auth({ method: 'exists-check', payload });
      res.should.have.status(200);
      res.body.should.have.property('code').eql('00');
      res.body.should.have.property('data').eql({
        exists: false
      });
    });
  });

  describe('Onboard Company', () => {
    let sandbox = null;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });
    it('Successfully onboard company', async () => {
      const cookies = 'access_token=accesstoken';
      sandbox.stub(CacheUtil, 'getNiumConstant')
        .withArgs('IndustrySector').returns(DummyNiumConstant.IndustrySector.map((item) => item.code))
        .withArgs('TotalEmployees')
        .returns(DummyNiumConstant.TotalEmployees.map((item) => item.code))
        .withArgs('AnnualTurnOver')
        .returns(DummyNiumConstant.AnnualTurnOver.map((item) => item.code));
      sandbox.stub(CacheUtil, 'getDataCache')
        .withArgs('Countries').returns(DummyConstant.Countries);

      const payload = {
        companyName: 'Rega HR Corp',
        countryOfLegalRegistration: 'SG',
        // typeOfLegalEntity: 'PRIVATE LIMITED',
        // typeOfBusiness: 'INFORMATION TECHNOLOGY',
        primaryCurrency: 'SGD',
        legalDetails: {
          uen: '12133135A'
        },
        riskProfileAssessment: {
          countryOfOperations: ['Singapore'],
          annualTurnover: 'SG009',
          totalEmployees: 'EM008'
        },
        businessDetails: {
          primaryIndustry: 'IS150',
          doingBusinessAs: 'Trade Name',
          businessWebsite: 'www.industry.com'
        },
        locationOfBusiness: 'SG',
        address: {
          unit: '10A',
          level: 'Under',
          blockHouse: 'Ground',
          buildingName: 'Tower A',
          streetName: 'St. John F. Kennedy',
          postalCode: '675848'
        }
      };
      sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
      sandbox.stub(SystemVariable, 'find').returns(dummyDataCountry.CountryData);
      sandbox.stub(AuthFunc, 'onboardCompany').returns(dummyData.NewSingleOrganization);
      sandbox.stub(CoaOrganizationFunc, 'create').returns(dummyData.CoaOrganization);
      sandbox.stub(OrganizationFunc, 'update').returns({});
      const res = await api.auth({ method: 'onboard-company', payload, cookies });
      res.should.have.status(200);
      res.body.should.have.property('code').eql('00');
    });

    it('Successfully onboard company Non SG', async () => {
      const cookies = 'access_token=accesstoken';
      sandbox.stub(CacheUtil, 'getNiumConstant')
        .withArgs('IndustrySector').returns(DummyNiumConstant.IndustrySector.map((item) => item.code))
        .withArgs('TotalEmployees')
        .returns(DummyNiumConstant.TotalEmployees.map((item) => item.code))
        .withArgs('AnnualTurnOver')
        .returns(DummyNiumConstant.AnnualTurnOver.map((item) => item.code));
      sandbox.stub(CacheUtil, 'getDataCache')
        .withArgs('Countries').returns(DummyConstant.Countries);

      const payload = {
        companyName: 'Rega HR Corp',
        countryOfLegalRegistration: 'SG',
        // typeOfLegalEntity: 'PRIVATE LIMITED',
        // typeOfBusiness: 'INFORMATION TECHNOLOGY',
        primaryCurrency: 'SGD',
        legalDetails: {
          uen: '12133135A'
        },
        riskProfileAssessment: {
          countryOfOperations: ['Singapore'],
          annualTurnover: 'SG009',
          totalEmployees: 'EM008'
        },
        businessDetails: {
          primaryIndustry: 'IS150',
          doingBusinessAs: 'Trade Name',
          businessWebsite: 'www.industry.com'
        },
        locationOfBusiness: 'ID',
        address: {
          addressLine1: 'st. John F Kennedy',
          postalCode: '762354',
          city: 'Jakarta',
          state: 'Jakarta'
        }
      };
      sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
      sandbox.stub(SystemVariable, 'find').returns(dummyDataCountry.CountryData);
      sandbox.stub(AuthFunc, 'onboardCompany').returns(dummyData.NewSingleOrganization);
      sandbox.stub(CoaOrganizationFunc, 'create').returns(dummyData.CoaOrganization);
      sandbox.stub(OrganizationFunc, 'update').returns({});
      const res = await api.auth({ method: 'onboard-company', payload, cookies });
      res.should.have.status(200);
      res.body.should.have.property('code').eql('00');
    });

    it('Failed onboard company because token not present', async () => {
      sandbox.stub(CacheUtil, 'getNiumConstant')
        .withArgs('IndustrySector').returns(DummyNiumConstant.IndustrySector.map((item) => item.code))
        .withArgs('TotalEmployees')
        .returns(DummyNiumConstant.TotalEmployees.map((item) => item.code))
        .withArgs('AnnualTurnOver')
        .returns(DummyNiumConstant.AnnualTurnOver.map((item) => item.code));
      sandbox.stub(CacheUtil, 'getDataCache')
        .withArgs('Countries').returns(DummyConstant.Countries);

      const payload = {
        companyName: 'Rega HR Corp',
        countryOfLegalRegistration: 'SG',
        // typeOfLegalEntity: 'PRIVATE LIMITED',
        // typeOfBusiness: 'INFORMATION TECHNOLOGY',
        primaryCurrency: 'SGD',
        legalDetails: {
          uen: '12133135A'
        },
        riskProfileAssessment: {
          countryOfOperations: ['Singapore'],
          annualTurnover: 'SG009',
          totalEmployees: 'EM008'
        },
        businessDetails: {
          primaryIndustry: 'IS150',
          doingBusinessAs: 'Trade Name',
          businessWebsite: 'www.industry.com'
        },
        locationOfBusiness: 'SG',
        address: {
          unit: '10A',
          level: 'Under',
          blockHouse: 'Ground',
          buildingName: 'Tower A',
          streetName: 'St. John F. Kennedy',
          postalCode: '675848'
        }
      };
      sandbox.stub(SystemVariable, 'find').returns(dummyDataCountry.CountryData);
      sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
      sandbox.stub(AuthFunc, 'onboardCompany').returns(dummyData.Organization);
      const res = await api.auth({ method: 'onboard-company', payload, cookies: '' });
      res.should.have.status(403);
      res.body.should.have.property('code').eql('210');
    });
  });

  describe('Onboard Company Detail', () => {
    let sandbox = null;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });
    it('Failed get onboard company detail - application not found', async () => {
      const cookies = 'access_token=accesstoken';
      sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
      sandbox.stub(UsersFunc, 'findOneByEmail').returns(dummyData.Users);
      sandbox.stub(OrganizationFunc, 'findOne').returns(dummyData.OneOrganization);
      sandbox.stub(ApplicationFunc, 'getOnboardCompanyDetail').returns(null);
      const res = await api.auth({ method: 'onboard-company-detail', cookies });
      res.should.have.status(applicationErrorConfig.APPLICATION_NOT_FOUND.httpStatus);
      res.body.should.have.property('code').eql(applicationErrorConfig.APPLICATION_NOT_FOUND.code);
      res.body.should.have.property('message').eql(applicationErrorConfig.APPLICATION_NOT_FOUND.message);
    });

    it('Successfully get onboard company detail', async () => {
      const cookies = 'access_token=accesstoken';
      sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
      sandbox.stub(UsersFunc, 'findOneByEmail').returns(dummyData.Users);
      sandbox.stub(OrganizationFunc, 'findOne').returns(dummyData.OneOrganization);
      sandbox.stub(ApplicationFunc, 'getOnboardCompanyDetail').returns({ ...dummyData.ApplicationDetail, additionalDocuments: [{ _id: '123456789012345678901234', fileName: 'test.jpg' }] });
      const res = await api.auth({ method: 'onboard-company-detail', cookies });
      res.should.have.status(200);
      res.body.should.have.property('code').eql('00');
    });
  });

  describe('Add Onboard Company Document', () => {
    let sandbox = null;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });
    it('Successfully add onboard company document', async () => {
      const cookies = 'access_token=accesstoken';
      const payload = {
        additionalDocumentIds: [
          '123456789012345678901234',
          '123456789012345678901234'

        ]
      };
      sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
      sandbox.stub(UsersFunc, 'findOneByEmail').returns(dummyData.Users);
      sandbox.stub(OrganizationFunc, 'findOne').returns(dummyData.OneOrganization);
      sandbox.stub(DocumentFunc, 'getAllByOrganizationIdFileTypeAndIds').returns(dummyData.DocumentKYB);
      sandbox.stub(DocumentFunc, 'updateOrganizationIdByIds').returns({});
      const res = await api.auth({ method: 'onboard-company-document', cookies, payload });
      res.should.have.status(200);
      res.body.should.have.property('code').eql('00');
      res.body.should.have.property('data').eql(2);
    });
  });

  describe('Organization selection', () => {
    let sandbox = null;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });
    it('Successfully select organization', async () => {
      const payload = {
        selectedOrganizationId: '61f2065b41f582eed9721e43'
      };
      const cookies = 'access_token=accesstoken';
      sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
      sandbox.stub(UsersFunc, 'findOneByEmail').returns(dummyData.Users);
      sandbox.stub(OrganizationFunc, 'findOne').returns(dummyData.OneOrganization);
      const res = await api.auth({ method: 'select-organization', payload, cookies });
      res.should.have.status(200);
      res.body.should.have.property('code').eql('00');
    });
    it('Failed select organization because organization not actually linked with user', async () => {
      const payload = {
        selectedOrganizationId: '61f2065b41f582eed9721e43'
      };
      const cookies = 'access_token=accesstoken';
      sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
      sandbox.stub(UsersFunc, 'findOneByEmail').returns(dummyData.Users);
      sandbox.stub(OrganizationFunc, 'findOne').returns(dummyData.NotLinkedOrganization);
      const res = await api.auth({ method: 'select-organization', payload, cookies });
      res.should.have.status(400);
      res.body.should.have.property('code').eql('241');
    });
    it('Failed select organization because token not present', async () => {
      const payload = {
        selectedOrganizationId: '61f2065b41f582eed9721e43'
      };
      sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
      sandbox.stub(UsersFunc, 'findOneByEmail').returns(dummyData.Users);
      sandbox.stub(OrganizationFunc, 'findOne').returns(dummyData.NotLinkedOrganization);
      const res = await api.auth({ method: 'select-organization', payload });
      res.should.have.status(403);
      res.body.should.have.property('code').eql('210');
    });
    it('Failed select organization because token invalid', async () => {
      const payload = {
        selectedOrganizationId: '61f2065b41f582eed9721e43'
      };
      const cookies = 'access_token=invalidtoken';
      sandbox.stub(jwt, 'verify').returns(null);
      sandbox.stub(UsersFunc, 'findOneByEmail').returns(dummyData.Users);
      sandbox.stub(OrganizationFunc, 'findOne').returns(dummyData.NotLinkedOrganization);
      const res = await api.auth({ method: 'select-organization', payload, cookies });
      res.should.have.status(403);
      res.body.should.have.property('code').eql('211');
    });
    it('Failed select organization because organization not actually linked with user', async () => {
      const payload = {
        selectedOrganizationId: '61f2065b41f582eed9721e43'
      };
      const cookies = 'access_token=accesstoken';
      sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
      sandbox.stub(UsersFunc, 'findOneByEmail').returns(dummyData.Users);
      sandbox.stub(OrganizationFunc, 'findOne').returns(null);
      const res = await api.auth({ method: 'select-organization', payload, cookies });
      res.should.have.status(404);
      res.body.should.have.property('code').eql('240');
    });
    it('Failed select organization because selected organization id empty', async () => {
      const payload = {
        selectedOrganizationId: ''
      };
      const cookies = 'access_token=accesstoken';
      sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
      sandbox.stub(UsersFunc, 'findOneByEmail').returns(dummyData.Users);
      sandbox.stub(OrganizationFunc, 'findOne').returns(null);
      const res = await api.auth({ method: 'select-organization', payload, cookies });
      res.should.have.status(422);
      res.body.should.have.property('code').eql('242');
    });
    it('Failed select organization because selected organization inactive', async () => {
      const payload = {
        selectedOrganizationId: '61f2065b41f582eed9721e43'
      };
      const cookies = 'access_token=accesstoken';
      sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
      sandbox.stub(UsersFunc, 'findOneByEmail').returns(dummyData.Users);
      sandbox.stub(OrganizationFunc, 'findOne').returns(dummyData.InactiveOrganization);
      const res = await api.auth({ method: 'select-organization', payload, cookies });
      res.should.have.status(401);
      res.body.should.have.property('code').eql('253');
    });
    it('Failed select organization because selected organization frozen', async () => {
      const payload = {
        selectedOrganizationId: '61f2065b41f582eed9721e43'
      };
      const cookies = 'access_token=accesstoken';
      sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
      sandbox.stub(UsersFunc, 'findOneByEmail').returns(dummyData.Users);
      sandbox.stub(OrganizationFunc, 'findOne').returns(dummyData.FrozenOrganization);
      const res = await api.auth({ method: 'select-organization', payload, cookies });
      res.should.have.status(401);
      res.body.should.have.property('code').eql('257');
    });
    it('Failed select organization because access to selected organization frozen', async () => {
      const payload = {
        selectedOrganizationId: '61f2065b41f582eed9721e43'
      };
      const cookies = 'access_token=accesstoken';
      sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
      sandbox.stub(UsersFunc, 'findOneByEmail').returns(dummyData.Users);
      sandbox.stub(OrganizationFunc, 'findOne').returns(dummyData.FrozenAccessOrganization);
      const res = await api.auth({ method: 'select-organization', payload, cookies });
      res.should.have.status(401);
      res.body.should.have.property('code').eql('254');
    });
    it('Failed select organization because access to selected organization locked', async () => {
      const payload = {
        selectedOrganizationId: '61f2065b41f582eed9721e43'
      };
      const cookies = 'access_token=accesstoken';
      sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
      sandbox.stub(UsersFunc, 'findOneByEmail').returns(dummyData.Users);
      sandbox.stub(OrganizationFunc, 'findOne').returns(dummyData.LockedAccessOrganization);
      const res = await api.auth({ method: 'select-organization', payload, cookies });
      res.should.have.status(401);
      res.body.should.have.property('code').eql('255');
    });
    it('Failed select organization because access to selected organization revoked', async () => {
      const payload = {
        selectedOrganizationId: '61f2065b41f582eed9721e43'
      };
      const cookies = 'access_token=accesstoken';
      sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
      sandbox.stub(UsersFunc, 'findOneByEmail').returns(dummyData.Users);
      sandbox.stub(OrganizationFunc, 'findOne').returns(dummyData.RevokedAccessOrganization);
      const res = await api.auth({ method: 'select-organization', payload, cookies });
      res.should.have.status(401);
      res.body.should.have.property('code').eql('256');
    });
    it('Failed select organization because user inactive', async () => {
      const payload = {
        selectedOrganizationId: '61f2065b41f582eed9721e43'
      };
      const cookies = 'access_token=accesstoken';
      sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
      sandbox.stub(UsersFunc, 'findOneByEmail').returns(dummyData.InactiveUsers);
      sandbox.stub(OrganizationFunc, 'findOne').returns(dummyData.RevokedAccessOrganization);
      const res = await api.auth({ method: 'select-organization', payload, cookies });
      res.should.have.status(401);
      res.body.should.have.property('code').eql('231');
    });
    it('Failed select organization because user blocked', async () => {
      const payload = {
        selectedOrganizationId: '61f2065b41f582eed9721e43'
      };
      const cookies = 'access_token=accesstoken';
      sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
      sandbox.stub(UsersFunc, 'findOneByEmail').returns(dummyData.BlockedUsers);
      sandbox.stub(OrganizationFunc, 'findOne').returns(dummyData.RevokedAccessOrganization);
      const res = await api.auth({ method: 'select-organization', payload, cookies });
      res.should.have.status(403);
      res.body.should.have.property('code').eql('234');
    });
  });
  describe('Check PIN', () => {
    let sandbox = null;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });
    it('Successfully check PIN', async () => {
      const payload = {
        encryptedPin: 'U2FsdGVkX1/hygpKTf+WDkqX0lCPxS8w1y2wX4ZC8ag='
      };
      const cookies = 'access_token=accesstoken';
      sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
      sandbox.stub(AuthFunc, 'checkPin').returns(dummyData.Users);
      const res = await api.auth({ method: 'check-pin', payload, cookies });
      res.should.have.status(200);
      res.body.should.have.property('code').eql('00');
    });
    // it('Failed check pin, wrong pin attempt', async () => {
    //   const payload = {
    //     encryptedPin: 'wrongpin'
    //   };

    //   const cookies = 'access_token=accesstoken';
    //   sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
    //   sandbox.stub(AuthFunc, 'checkPin').returns({
    //     words: [627359522, 357364596, 2008462679, 1091555737],
    //     sigBytes: -110
    //   });
    //   sandbox.stub(bcrypt, 'compareSync').returns(false);
    //   const res = await api.auth({ method: 'check-pin', payload, cookies });
    //   res.should.have.status(401);
    //   res.body.should.have.property('code').eql('248');
    // });
  });
  const userAgent = 'Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.77 Mobile/15E148 Safari/604.1';
  describe('Device Registration', () => {
    let sandbox = null;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });
    afterEach(() => {
      sandbox.restore();
    });
    it('Successfully register device', async () => {
      const payload = {
        deviceId: 'NotYetRegisteredDevice'
      };
      const cookies = 'access_token=accesstoken';
      sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
      sandbox.stub(UsersFunc, 'findOneByEmail').returns(dummyData.Users);
      sandbox.stub(UsersFunc, 'update').returns(dummyData.Users);
      const res = await api.auth({
        method: 'register-device', payload, cookies, userAgent
      });
      res.should.have.status(200);
      res.body.should.have.property('code').eql('00');
    });
    it('Failed register device, device id empty', async () => {
      const payload = {
        deviceId: ''
      };
      const cookies = 'access_token=accesstoken';
      sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
      sandbox.stub(UsersFunc, 'findOneByEmail').returns(dummyData.Users);
      sandbox.stub(UsersFunc, 'update').returns(dummyData.Users);
      const res = await api.auth({ method: 'register-device', payload, cookies });
      res.should.have.status(422);
      res.body.should.have.property('code').eql('249');
    });
    it('Failed register device, device id registered', async () => {
      const payload = {
        deviceId: 'registereddeviceid'
      };
      const cookies = 'access_token=accesstoken';
      sandbox.stub(jwt, 'verify').returns(dummyData.VerifiedJwt);
      sandbox.stub(UsersFunc, 'findOneByEmail').returns(dummyData.UsersWithRegisteredDeviceId);
      const res = await api.auth({
        method: 'register-device', payload, cookies, userAgent
      });
      res.should.have.status(400);
      res.body.should.have.property('code').eql('251');
    });
  });
});
