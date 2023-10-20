import { bugsLevel } from '../../variables/common.variable';

export default {
  UNCATEGORIZED: {
    httpStatus: 500,
    level: bugsLevel.MAJOR,
    code: '98'
  },
  CRITICAL: {
    httpStatus: 500,
    level: bugsLevel.CRITICAL,
    code: '99'
  },
  AUTH_EMPTY_DIAL_CODE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '200',
    message: 'Dial code cannot be empty!'
  },
  AUTH_INVALID_FORMAT_DIAL_CODE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '201',
    message: 'Dial code must be in correct format! ex: +65'
  },
  AUTH_EMPTY_PHONE_NUMBER: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '202',
    message: 'Phone number cannot be empty!'
  },
  AUTH_INVALID_FORMAT_PHONE_NUMBER: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '203',
    message: 'Phone number must be in correct format! ex: 90466279'
  },
  AUTH_EMPTY_EMAIL_ADDRESS: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '204',
    message: 'Email address cannot be empty!'
  },
  AUTH_INVALID_FORMAT_EMAIL_ADDRESS: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '205',
    message: 'Email address must be in correct format! ex: johndoe@sproutasia.com'
  },
  AUTH_EMPTY_PIN: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '206',
    message: 'PIN cannot be empty!'
  },
  AUTH_INVALID_FORMAT_PIN: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '207',
    message: 'PIN must be already in bcrypt format!'
  },
  AUTH_DUPLICATE_PHONE_NUMBER: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '208',
    message: 'Phone number already exists!'
  },
  AUTH_DUPLICATE_EMAIL_ADDRESS: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '209',
    message: 'Email address already exists!'
  },
  AUTH_TOKEN_NOT_PRESENT: {
    httpStatus: 403,
    level: bugsLevel.MINOR,
    code: '210',
    message: 'Token not present!'
  },
  AUTH_TOKEN_INVALID: {
    httpStatus: 403,
    level: bugsLevel.MINOR,
    code: '211',
    message: 'Token not valid!'
  },
  AUTH_SEND_CODE_FAILED: {
    httpStatus: 500,
    level: bugsLevel.MINOR,
    code: '212',
    message: 'Code failed to be sent!'
  },
  AUTH_VERIFY_CODE_FAILED: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '213',
    message: 'Code failed to be verified!'
  },
  AUTH_CHANNEL_NOT_PRESENT: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '214',
    message: 'Channel not present!'
  },
  AUTH_INVALID_VALUE_CHANNEL: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '215',
    message: 'Channel must be in correct value! ex: sms or email'
  },
  AUTH_CODE_NOT_PRESENT: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '216',
    message: 'Code not present!'
  },
  AUTH_INVALID_FORMAT_CODE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '217',
    message: 'Code must be in correct format! ex: 999999'
  },
  AUTH_WRONG_CODE: {
    httpStatus: 403,
    level: bugsLevel.MINOR,
    code: '218',
    message: 'Incorrect OTP, Please try again.'
  },
  AUTH_INVALID_FORMAT_PHONE_NUMBER_WITH_DIAL_CODE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '219',
    message: 'Phone number must be in correct format! ex: +6590466279'
  },
  AUTH_INVALID_FORMAT_IS_PHONE_NUMBER_VERIFIED: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '220',
    message: 'Is phone number verified must be in boolean'
  },
  AUTH_INVALID_FORMAT_IS_EMAIL_ADDRESS_VERIFIED: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '221',
    message: 'Is email address verified must be in boolean'
  },
  AUTH_INVALID_FORMAT_IS_ACTIVE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '222',
    message: 'Is active verified must be in boolean'
  },
  AUTH_EMPTY_COMPANY_NAME: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '223',
    message: 'Company name cannot be empty!'
  },
  AUTH_EMPTY_COUNTRY_OF_LEGAL_TRANSACTION: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '224',
    message: 'Country of legal transaction cannot be empty!'
  },
  AUTH_INVALID_FORMAT_COUNTRY_OF_LEGAL_TRANSACTION: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '225',
    message: 'Country of legal transaction must be in correct format! ex: SG, ID, MY'
  },
  AUTH_EMPTY_TYPE_OF_LEGAL_ENTITY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '226',
    message: 'Type of legal entity transaction cannot be empty!'
  },
  AUTH_EMPTY_TYPE_OF_BUSINESS: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '227',
    message: 'Type of business cannot be empty!'
  },
  AUTH_EMPTY_PRIMARY_CURRENCY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '228',
    message: 'Primary currency cannot be empty!'
  },
  AUTH_INVALID_FORMAT_PRIMARY_CURRENCY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '229',
    message: 'Primary currency must be in correct format! ex: SGD'
  },
  AUTH_USER_NOT_EXISTS(credentialType) {
    if (credentialType === 'phone') {
      return {
        httpStatus: 404,
        level: bugsLevel.MINOR,
        code: '230',
        message: 'Phone Number doesn\'t exist.'
      };
    } if (credentialType === 'email') {
      return {
        httpStatus: 404,
        level: bugsLevel.MINOR,
        code: '230',
        message: 'Email Address doesn\'t exist.'
      };
    }
    return {
      httpStatus: 404,
      level: bugsLevel.MINOR,
      code: '230',
      message: 'User doesn\'t exist.'
    };
  },
  AUTH_USER_NOT_ACTIVE: {
    httpStatus: 401,
    level: bugsLevel.MINOR,
    code: '231',
    message: 'Sorry! Your account has been deactivated. Please contact Customer Service.'
  },
  AUTH_WRONG_PIN(device, wrongAttempt) {
    let message = 'Error at attempting to check wrong PIN, please contact admin';
    let httpStatus = 401;
    let code = '232';
    if (device === 'web') {
      message = `Wrong PIN for ${wrongAttempt === 1 ? '1st' : '2nd'} attempt! Your account will be blocked after 3rd attempt!`;
      if (wrongAttempt > 2) {
        code = '234';
        message = 'Your account has been blocked! Please contact Customer Service';
      }
    }
    else {
      message = `Incorrect PIN, try again (${4 - wrongAttempt})`;
      if (wrongAttempt > 3) {
        // failed to authenticate = 401
        // failed to do action because of lack of permission = 403
        httpStatus = 403;
        code = '234';
        message = 'Your account has been blocked! Please contact Customer Service.';
      }
    }
    return {
      httpStatus,
      level: bugsLevel.MINOR,
      code,
      message
    };
  },
  AUTH_USER_BLOCKED(device) {
    return {
      httpStatus: 403,
      level: bugsLevel.MINOR,
      code: '234',
      message: device === 'mobile'
        ? 'You have reached maximum PIN attempt, your account is blocked. Please visit customer support.'
        : 'Your account has been blocked! Please contact Customer Service.'
    };
  },
  AUTH_MISSING_PHONE_EMAIL: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '235',
    message: 'At least one of Phone Number and Email Address must present!'
  },
  AUTH_INVALID_FORMAT_PHONE_NUMBER_FULL: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '236',
    message: 'Full phone number must be in correct format! ex: +6590466279'
  },
  AUTH_EMPTY_TO_BE_CHECKED: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '237',
    message: 'To be checked cannot be empty!'
  },
  AUTH_DUPLICATE_COMPANY_NAME: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '238',
    message: 'Company name already exists!'
  },
  AUTH_NOT_LINKED_TO_ORGANIZATION: {
    httpStatus: 403,
    level: bugsLevel.MINOR,
    code: '239',
    message: 'User not linked to any organization!'
  },
  AUTH_ORGANIZATION_NOT_FOUND: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '240',
    message: 'Organization not found!'
  },
  AUTH_ORGANIZATION_NOT_LINKED: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '241',
    message: 'Organization not actually linked to user!'
  },
  AUTH_EMPTY_SELECTED_ORGANIZATION_ID: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '242',
    message: 'Selected organization id cannot be empty!'
  },
  AUTH_MISSING_EMAIL: {
    httpStatus: 403,
    level: bugsLevel.MINOR,
    code: '243',
    message: 'Missing email in token!'
  },
  AUTH_MISSING_PHONE: {
    httpStatus: 403,
    level: bugsLevel.MINOR,
    code: '244',
    message: 'Missing phone in token!'
  },
  AUTH_MISSING_ORGANIZATION_ID: {
    httpStatus: 403,
    level: bugsLevel.MINOR,
    code: '245',
    message: 'Missing organization id in token!'
  },
  AUTH_EMPTY_FIRST_NAME: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '246',
    message: 'First name cannot be empty!'
  },
  AUTH_EMPTY_LAST_NAME: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '247',
    message: 'Last name cannot be empty!'
  },
  AUTH_INCORRECT_AT_CHECK_PIN: {
    httpStatus: 401,
    level: bugsLevel.MINOR,
    code: '248',
    message: 'Incorrect PIN!'
  },
  AUTH_EMPTY_DEVICE_ID: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '249',
    message: 'Device id cannot be empty!'
  },
  AUTH_MINIMUM_LENGTH: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '250',
    message: 'Must be at least 5 chars long!'
  },
  AUTH_DEVICE_ALREADY_REGISTERED: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '251',
    message: 'Device already registered!'
  },
  AUTH_MULTIPLE_USERS_ASSOCIATED_PHONE_NUMBER: {
    httpStatus: 401,
    level: bugsLevel.MINOR,
    code: '252',
    message: 'Multiple users associated by this phone number!'
  },
  AUTH_ORGANIZATION_INACTIVE: {
    httpStatus: 401,
    level: bugsLevel.MINOR,
    code: '253',
    message: 'Sorry! Your organization has been deactivated. Please contact Customer Service.'
  },
  AUTH_ORGANIZATION_ACCESS_FROZEN: {
    httpStatus: 401,
    level: bugsLevel.MINOR,
    code: '254',
    message: 'Sorry! Your access to this organization has been frozen. Please contact your Approver or Customer Service.'
  },
  AUTH_ORGANIZATION_ACCESS_LOCKED: {
    httpStatus: 401,
    level: bugsLevel.MINOR,
    code: '255',
    message: 'Sorry! Your access to this organization has been locked. Please contact Customer Service.'
  },
  AUTH_ORGANIZATION_ACCESS_REVOKED: {
    httpStatus: 401,
    level: bugsLevel.MINOR,
    code: '256',
    message: 'Sorry! Your access to this organization has been revoked. Please contact your Approver or Customer Service.'
  },
  AUTH_ORGANIZATION_FROZEN: {
    httpStatus: 401,
    level: bugsLevel.MINOR,
    code: '257',
    message: 'Sorry! Your organization has been frozen. Please contact Customer Service.'
  },
  AUTH_EMPTY_UEN: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '258',
    message: 'UEN cannot be empty!'
  },
  AUTH_EMPTY_FREEMIUM_DETAILS: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '259',
    message: 'freemiumDetails cannot be empty object!'
  },
  AUTH_EMPTY_REGISTRATION_COUNTRY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '260',
    message: 'Registration country cannot be empty!'
  },
  AUTH_INVALID_FORMAT_REGISTRATION_COUNTRY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '261',
    message: 'Registration country must be in correct format! ex: SG'
  },
  AUTH_EMPTY_CALL_FIRST_NAME: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '262',
    message: 'Call first name cannot be empty!'
  },
  AUTH_EMPTY_CALL_LAST_NAME: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '263',
    message: 'Call last name cannot be empty!'
  },
  AUTH_EMAIL_ADDRESSES_MUST_ARRAY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '264',
    message: 'emailAddresses must be in form of array!'
  },
  AUTH_ORGANIZATION_USERS_MUST_ARRAY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '265',
    message: 'users must be in form of array!'
  },
  AUTH_ISACTIVE_MUST_BOOLEAN: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '266',
    message: 'isActive must be boolean'
  },
  AUTH_ISBLOCKED_MUST_BOOLEAN: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '267',
    message: 'isBlocked must be boolean'
  },
  AUTH_WRONG_PIN_ATTEMPT_MUST_NUMBER: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '268',
    message: 'wrongPinAttempt must be number'
  },
  AUTH_EMPTY_UNIQUE_ID: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '269',
    message: 'Unique Id cannot be empty!'
  },
  DOWNLOAD_LINK_EXPIRED: {
    httpStatus: 403,
    level: bugsLevel.MINOR,
    code: '270',
    message: 'Link Expired!'
  },
  DOWNLOAD_LINK_INVALID: {
    httpStatus: 403,
    level: bugsLevel.MINOR,
    code: '271',
    message: 'Link Invalid'
  },
  AUTH_ORGANIZATION_ACCESS_INACTIVE: {
    httpStatus: 401,
    level: bugsLevel.MINOR,
    code: '272',
    message: 'Sorry! Your access to this organization has been deactivated. Please contact your Approver or Customer Service.'
  },
  AUTH_EMPTY_FULL_NAME: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '273',
    message: 'Full name cannot be empty!'
  },
  AUTH_EMPTY_ROLE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '274',
    message: 'Role cannot be empty!'
  }
};
