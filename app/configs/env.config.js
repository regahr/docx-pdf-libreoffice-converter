require('dotenv').config();

const env = process.env.NODE_ENV || 'dev'; // 'dev', 'test', 'staging', 'production'

const dev = {
  app: {
    host: process.env.DEV_APP_HOST,
    port: Number(process.env.DEV_APP_PORT) || 4003,
    jwtSecret: process.env.DEV_JWT_SECRET,
    serverBaseUrl: process.env.DEV_APP_SERVER_BASE_URL || 'http://localhost:4003'
  },
  db: {
    url: process.env.DEV_DB_URL || ''
  },
  slack: {
    url: process.env.DEV_SLACK_URL,
    idOne: process.env.DEV_SLACK_ID_ONE,
    idTwo: process.env.DEV_SLACK_ID_TWO,
    accessToken: process.env.DEV_SLACK_ACCESS_TOKEN,
    niumError: {
      channelId: process.env.DEV_SLACK_NE_CHANNEL_ID,
      accessToken: process.env.DEV_SLACK_NE_ACCESS_TOKEN
    }
  },
  s3: {
    bucketBEAN: process.env.DEV_BEAN_S3_BUCKET,
    regionBEAN: process.env.DEV_BEAN_S3_REGION,
    accessKeyBEAN: process.env.DEV_BEAN_S3_API_KEY,
    secretKeyBEAN: process.env.DEV_BEAN_S3_SECRET_KEY
  },
  auth: {
    encryption: {
      algorithm: process.env.DEV_AUTH_ALGORITHM,
      secret: process.env.DEV_AUTH_SECRET
    },
    OTPTimeToLive: {
      cardShowEncryptedData:
        process.env.DEV_AUTH_OTP_TTL_CARD_SHOW_ENCRYPTED_DATA
          ? Number(process.env.DEV_AUTH_OTP_TTL_CARD_SHOW_ENCRYPTED_DATA) : 5 * 60 * 1000
    }
  },
  nium: {
    apiUrl: process.env.DEV_NIUM_API_URL,
    apiUrlV2: process.env.DEV_NIUM_API_URL_V2,
    apiUrlV4: process.env.DEV_NIUM_API_URL_V4,
    clientHashId: process.env.DEV_NIUM_CLIENT_HASH_ID,
    apiKey: process.env.DEV_NIUM_API_KEY,
    requestId: process.env.DEV_NIUM_REQUEST_ID,
    region: process.env.DEV_NIUM_REGION,
    kycModeApplicant: process.env.DEV_NIUM_KYC_MODE_APPLICANT
  },
  doc: {
    secret: process.env.DEV_DOC_JWT_SECRET,
    ttl: process.env.DEV_DOC_JWT_TTL || '1d'
  },
  util: {
    cacheTTL: process.env.DEV_UTIL_CACHE_TTL
      ? Number(process.env.DEV_UTIL_CACHE_TTL)
      : 60 * 60
  },
  newUserInvitationMail: {
    secret: process.env.DEV_DOC_JWT_SECRET,
    ttl: process.env.DEV_INVITATION_JWT_TTL || '7d'
  }
};

const test = {
  app: {
    host: process.env.TEST_APP_HOST,
    port: Number(process.env.TEST_APP_PORT) || 4003,
    jwtSecret: process.env.TEST_JWT_SECRET,
    serverBaseUrl: process.env.TEST_APP_SERVER_BASE_URL || 'http://localhost:4003'
  },
  db: {
    url: process.env.TEST_DB_URL || ''
  },
  slack: {
    url: process.env.TEST_SLACK_URL,
    idOne: process.env.TEST_SLACK_ID_ONE,
    idTwo: process.env.TEST_SLACK_ID_TWO,
    accessToken: process.env.TEST_SLACK_ACCESS_TOKEN,
    niumError: {
      channelId: process.env.TEST_SLACK_NE_CHANNEL_ID,
      accessToken: process.env.TEST_SLACK_NE_ACCESS_TOKEN
    }
  },
  s3: {
    bucketBEAN: process.env.TEST_BEAN_S3_BUCKET,
    regionBEAN: process.env.TEST_BEAN_S3_REGION,
    accessKeyBEAN: process.env.TEST_BEAN_S3_API_KEY,
    secretKeyBEAN: process.env.TEST_BEAN_S3_SECRET_KEY
  },
  auth: {
    encryption: {
      algorithm: process.env.TEST_AUTH_ALGORITHM,
      secret: process.env.TEST_AUTH_SECRET
    },
    OTPTimeToLive: {
      cardShowEncryptedData:
        process.env.TEST_AUTH_OTP_TTL_CARD_SHOW_ENCRYPTED_DATA
          ? Number(process.env.TEST_AUTH_OTP_TTL_CARD_SHOW_ENCRYPTED_DATA) : 5 * 60 * 1000
    }
  },
  nium: {
    apiUrl: process.env.TEST_NIUM_API_URL,
    apiUrlV2: process.env.TEST_NIUM_API_URL_V2,
    apiUrlV4: process.env.TEST_NIUM_API_URL_V4,
    clientHashId: process.env.TEST_NIUM_CLIENT_HASH_ID,
    apiKey: process.env.TEST_NIUM_API_KEY,
    requestId: process.env.TEST_NIUM_REQUEST_ID,
    region: process.env.TEST_NIUM_REGION,
    kycModeApplicant: process.env.TEST_NIUM_KYC_MODE_APPLICANT
  },
  doc: {
    secret: process.env.TEST_DOC_JWT_SECRET,
    ttl: process.env.TEST_DOC_JWT_TTL || '1d'
  },
  util: {
    cacheTTL: process.env.TEST_UTIL_CACHE_TTL
      ? Number(process.env.TEST_UTIL_CACHE_TTL)
      : 60 * 60
  },
  newUserInvitationMail: {
    secret: process.env.TEST_DOC_JWT_SECRET,
    ttl: process.env.TEST_INVITATION_JWT_TTL || '7d'
  }
};

const staging = {
  app: {
    host: process.env.STAGING_APP_HOST,
    port: Number(process.env.STAGING_APP_PORT) || 4003,
    jwtSecret: process.env.STAGING_JWT_SECRET,
    serverBaseUrl: process.env.STAGING_APP_SERVER_BASE_URL || 'http://localhost:4003'
  },
  db: {
    url: process.env.STAGING_DB_URL || ''
  },
  slack: {
    url: process.env.STAGING_SLACK_URL,
    idOne: process.env.STAGING_SLACK_ID_ONE,
    idTwo: process.env.STAGING_SLACK_ID_TWO,
    accessToken: process.env.STAGING_SLACK_ACCESS_TOKEN,
    niumError: {
      channelId: process.env.STAGING_SLACK_NE_CHANNEL_ID,
      accessToken: process.env.STAGING_SLACK_NE_ACCESS_TOKEN
    }
  },

  s3: {
    bucketBEAN: process.env.STAGING_BEAN_S3_BUCKET,
    regionBEAN: process.env.STAGING_BEAN_S3_REGION,
    accessKeyBEAN: process.env.STAGING_BEAN_S3_API_KEY,
    secretKeyBEAN: process.env.STAGING_BEAN_S3_SECRET_KEY
  },
  auth: {
    encryption: {
      algorithm: process.env.STAGING_AUTH_ALGORITHM,
      secret: process.env.STAGING_AUTH_SECRET
    },
    OTPTimeToLive: {
      cardShowEncryptedData:
        process.env.STAGING_AUTH_OTP_TTL_CARD_SHOW_ENCRYPTED_DATA
          ? Number(process.env.STAGING_AUTH_OTP_TTL_CARD_SHOW_ENCRYPTED_DATA) : 5 * 60 * 1000
    }
  },
  nium: {
    apiUrl: process.env.STAGING_NIUM_API_URL,
    apiUrlV2: process.env.STAGING_NIUM_API_URL_V2,
    apiUrlV4: process.env.STAGING_NIUM_API_URL_V4,
    clientHashId: process.env.STAGING_NIUM_CLIENT_HASH_ID,
    apiKey: process.env.STAGING_NIUM_API_KEY,
    requestId: process.env.STAGING_NIUM_REQUEST_ID,
    region: process.env.STAGING_NIUM_REGION,
    kycModeApplicant: process.env.STAGING_NIUM_KYC_MODE_APPLICANT
  },
  doc: {
    secret: process.env.STAGING_DOC_JWT_SECRET,
    ttl: process.env.STAGING_DOC_JWT_TTL || '1d'
  },
  util: {
    cacheTTL: process.env.STAGING_UTIL_CACHE_TTL
      ? Number(process.env.STAGING_UTIL_CACHE_TTL)
      : 60 * 60
  },
  newUserInvitationMail: {
    secret: process.env.STAGING_DOC_JWT_SECRET,
    ttl: process.env.STAGING_INVITATION_JWT_TTL || '7d'
  }
};

const production = {
  app: {
    host: process.env.PRODUCTION_APP_HOST,
    port: Number(process.env.PRODUCTION_APP_PORT) || 4003,
    jwtSecret: process.env.PRODUCTION_JWT_SECRET,
    serverBaseUrl: process.env.PRODUCTION_APP_SERVER_BASE_URL || 'http://localhost:4003'
  },
  db: {
    url: process.env.PRODUCTION_DB_URL || ''
  },
  slack: {
    url: process.env.PRODUCTION_SLACK_URL,
    idOne: process.env.PRODUCTION_SLACK_ID_ONE,
    idTwo: process.env.PRODUCTION_SLACK_ID_TWO,
    accessToken: process.env.PRODUCTION_SLACK_ACCESS_TOKEN,
    niumError: {
      channelId: process.env.PRODUCTION_SLACK_NE_CHANNEL_ID,
      accessToken: process.env.PRODUCTION_SLACK_NE_ACCESS_TOKEN
    }
  },
  s3: {
    bucketBEAN: process.env.PRODUCTION_BEAN_S3_BUCKET,
    regionBEAN: process.env.PRODUCTION_BEAN_S3_REGION,
    accessKeyBEAN: process.env.PRODUCTION_BEAN_S3_API_KEY,
    secretKeyBEAN: process.env.PRODUCTION_BEAN_S3_SECRET_KEY
  },
  auth: {
    encryption: {
      algorithm: process.env.PRODUCTION_AUTH_ALGORITHM,
      secret: process.env.PRODUCTION_AUTH_SECRET
    },
    OTPTimeToLive: {
      cardShowEncryptedData:
        process.env.PRODUCTION_AUTH_OTP_TTL_CARD_SHOW_ENCRYPTED_DATA
          ? Number(process.env.PRODUCTION_AUTH_OTP_TTL_CARD_SHOW_ENCRYPTED_DATA) : 5 * 60 * 1000
    }
  },
  nium: {
    apiUrl: process.env.PRODUCTION_NIUM_API_URL,
    apiUrlV2: process.env.PRODUCTION_NIUM_API_URL_V2,
    apiUrlV4: process.env.PRODUCTION_NIUM_API_URL_V4,
    clientHashId: process.env.PRODUCTION_NIUM_CLIENT_HASH_ID,
    apiKey: process.env.PRODUCTION_NIUM_API_KEY,
    requestId: process.env.PRODUCTION_NIUM_REQUEST_ID,
    region: process.env.PRODUCTION_NIUM_REGION,
    kycModeApplicant: process.env.PRODUCTION_NIUM_KYC_MODE_APPLICANT
  },
  doc: {
    secret: process.env.PRODUCTION_DOC_JWT_SECRET,
    ttl: process.env.PRODUCTION_DOC_JWT_TTL || '1d'
  },
  util: {
    cacheTTL: process.env.PRODUCTION_UTIL_CACHE_TTL
      ? Number(process.env.PRODUCTION_UTIL_CACHE_TTL)
      : 60 * 60
  },
  newUserInvitationMail: {
    secret: process.env.PRODUCTION_DOC_JWT_SECRET,
    ttl: process.env.PRODUCTION_INVITATION_JWT_TTL || '7d'
  }
};

const config = {
  dev,
  test,
  staging,
  production
};

export default config[env];
