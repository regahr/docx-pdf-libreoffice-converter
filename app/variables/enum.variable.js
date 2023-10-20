import { vaPayloadFormatter } from '../utils/format/virtualAccountPayload.format';

export const YesNoType = ['YES', 'NO', 'yes', 'no', 'Yes', 'No'];

export const GrofDocumentType = {
  NRIC: 'NRIC',
  FIN: 'FIN',
  PASSPORT: 'Passport',
  DRIVER_LICENSE: 'Driver License',
  POWER_OF_ATTORNEY: 'Power of Attorney',
  PROOF_OF_ADDRESS: 'Proof of Address',
  LETTER_OF_EMPLOYMENT: 'Letter of Employment',
  OTHERS: 'Others'
};
export const ACRA_TO_NIUM_POSITION_MAPPING = {
  Director: 'Director',
  'Managing Director': 'Director',
  'Chief Executive Officer': 'Director',
  'Director under Section 17(3)(d) of the Accountants Act': 'Director',
  'Alternate director': 'Director',
  Member: 'Shareholder',
  Representative: 'REPRESENTATIVE'
};

export const AcceptedExtensionAdditionalDocumentKYB = ['jpg', 'png', 'jpeg', 'pdf'];
export const DefaultOrganizationIdForKYBDoc = '1234567890abcdef12345678';
export const AdditionalDocFileTypeForKYB = 'Additional Files';

export const PublicDocFileType = 'Public';
export const BillDocFileType = 'Bill File';

export const PublicVariableCategory = 'PUBLIC_VARIABLE';

export const BillStatus = {
  PROCESSING: 'PROCESSING',
  ACTION_REQ: 'ACTION_REQUIRED',
  PAID: 'PAID',
  PARTIALLY_PAID: 'PARTIALLY_PAID',
  APPROVED: 'APPROVED',
  OVERDUE: 'OVERDUE'
};

export const AcceptedExtensionBillFile = ['png', 'jpg', 'jpeg', 'pdf'];

export const FeeReimbursementActiveHourMailing = '08:00-17:00';
export const FeeReimbursementPeriod = 4; // in hours
export const FeeReimbursementEventName = 'WAIVE_FEE_REMINDER_EMAIL';
export const ApplicationStakeHolderChangedEventName = 'APPLICATION_STAKEHOLDER_CHANGED';
export const ApplicationCompanyDetailChangedEventName = 'APPLICATION_COMPANY_DETAIL_CHANGED';
export const ApplicationFailedSubmitNiumEventName = 'FAILED_SUBMIT_TO_NIUM';
export const ApplicationSuccessSubmitNiumEventName = 'SUCCESS_SUBMIT_TO_NIUM';
export const ApplicationACRARefreshOverwriteEventName = 'ACRA_REFRESH_OVERWRITE';
export const ApplicationACRARefreshUpdateEventName = 'ACRA_REFRESH_UPDATE';
export const FailedSendEmailEventName = 'EMAIL_FAILED_SENT';
export const SendgridClientError = 'ERROR_SENDGRID_CLIENT';
export const FailedAddContactToSendgridList = 'FAILED_ADD_CONTACT_TO_SENDGRID_LIST';
export const FailedRemoveContactToSendgridList = 'FAILED_REMOVE_CONTACT_TO_SENDGRID_LIST';

export const ACRAUpdateMode = {
  OVERWRITE: 'acra-overwrite',
  UPDATE: 'acra-update'
};

export const BillPaymentMethod = {
  BILL_PAY: 'BILL_PAY',
  RECORD_PAYMENT: 'RECORD_PAYMENT'
};

export const BillPaymentType = {
  BANK_TRANSFER: 'BANK_TRANSFER',
  PAID_ON_BEHALF: 'PAID_ON_BEHALF'
};

export const VariableNameVsCategoryMap = {
  CompanyType: 'COMPANY_TYPE',
  GenderType: 'GENDER_TYPE',
  EntityStatus: 'ENTITY_STATUS',
  DocumentIDType: 'DOCUMENT_ID_TYPE',
  EntityType: 'ENTITY_TYPE',
  AppointmentStatus: 'APPOINTMENT_STATUS',
  'Source of Income': 'SOURCE_OF_FUNDS',
  Position: 'POSITION',
  Occupation: 'OCCUPATION',
  PrimaryIndustry: 'SSIC_DATA',
  Countries: 'COUNTRY',
  NiumProductType: 'NIUM_PRODUCT_TYPE',
  NiumProgramType: 'NIUM_PROGRAM_TYPE',
  ShareType: 'SHARE_TYPE',
  PaymentMode: 'PAYMENT_MODE',
  OnboardingMode: 'ONBOARDING_MODE',
  ArtemisStatus: 'ARTEMIS_STATUS',
  RiskScore: 'RISK_RATING',
  RiskRating: 'RISK_RATING',
  ApplicationStatus: 'APPLICATION_STATUS',
  OwnershipLayer: 'OWNERSHIP_LAYER',
  ProductComplexity: 'PRODUCT_COMPLEXITY',
  NiumDocumentType: 'NIUM_DOCUMENT_TYPE',
  NiumKYBDocumentType: 'NIUM_KYB_DOCUMENT_TYPE',
  NiumPositionRFI: 'ADDITIONAL_INFO_POSITION',
  NiumDocumentTypesForBusiness: 'NIUM_DOCUMENT_TYPES_FOR_BUSINESS',
  BusinessEntityType: 'BUSINESS_ENTITY_TYPE',
  IntendedUseOfAccount: 'INTENDED_USE_OF_ACCOUNT', // Nium Sourced
  TotalEmployees: 'TOTAL_EMPLOYEES', // Nium Sourced
  AnnualTurnOver: 'ANNUAL_TURNOVER', // Nium Sourced
  IndustrySector: 'INDUSTRY_SECTOR', // Nium Sourced
  IntendUseOfCardType: 'INTEND_USE_OF_CARD_TYPE',
  CardProgramType: 'CARD_PROGRAM_TYPE',
  UnregulatedTrustType: 'UNREGULATED_TRUST_TYPE',
  RegulatedTrustType: 'REGULATED_TRUST_TYPE',
  LegislationType: 'LEGISLATION_TYPE',
  ListedExchange: 'LISTED_EXCHANGE',
  BusinessType: 'BUSINESS_TYPE',
  RoutingCodeType: 'ROUTING_CODE_TYPE',
  PaymentMethod: 'PAYMENT_METHOD',
  AdditionalInfoPosition: 'ADDITIONAL_INFO_POSITION',
  NiumFileFormat: 'NIUM_FILE_FORMAT',
  SourceOfFunds: 'SOURCE_OF_FUNDS',
  BillPaymentType: 'BILL_PAYMENT_TYPE',
  RelationshipWithCompany: 'RELATIONSHIP_WITH_COMPANY',
  CardThemeColor: 'CARD_THEME_COLOR',
  CardStatus: 'CARD_STATUS'
};

export const NiumSourcedVariableNames = ['IntendedUseOfAccount', 'TotalEmployees', 'AnnualTurnOver', 'IndustrySector', 'ListedExchange'];
export const VariableNameVsNiumConstantMap = {
  IntendedUseOfAccount: 'intendedUseOfAccount',
  TotalEmployees: 'totalEmployees',
  AnnualTurnOver: 'annualTurnover',
  IndustrySector: 'industrySector',
  ListedExchange: 'listedExchange'
};

export const AllVariablesName = [
  'CompanyType',
  'GenderType',
  'EntityStatus',
  'DocumentIDType',
  'EntityType',
  'AppointmentStatus',
  'Source of Income',
  'Position',
  'Occupation',
  'PrimaryIndustry',
  'NiumProductType',
  'NiumProgramType',
  'ShareType',
  'PaymentMode',
  'OnboardingMode',
  'ArtemisStatus',
  'RiskScore',
  'RiskRating',
  'ApplicationStatus',
  'OwnershipLayer',
  'ProductComplexity',
  'NiumKYBDocumentType',
  'NiumDocumentType',
  'NiumPositionRFI',
  'NiumDocumentTypesForBusiness',
  'Currency',
  'CurrencyCodes',
  'Countries',
  'Nationality',
  'Country of Birth/Country/Country of Residence',
  'IntendedUseOfAccount',
  'TotalEmployees',
  'AnnualTurnOver',
  'IndustrySector',
  'ListedExchange',
  'RelationshipWithCompany'
];

export const UserKycStatus = {
  SENT: 'SENT',
  PENDING: 'PENDING',
  PENDING_NIUM: 'PENDING_NIUM',
  EXPIRED: 'EXPIRED',
  DONE: 'DONE'
};

export const RolePermission = {
  BILL_UPLOADS: 'BILL_UPLOADS',
  BILL_READ: 'BILL_READ',
  BILL_DELETE_BEFORE_APPROVAL: 'BILL_DELETE_BEFORE_APPROVAL',
  BILL_DELETE_AFTER_APPROVAL: 'BILL_DELETE_AFTER_APPROVAL',
  BILL_APPROVE: 'BILL_APPROVE',
  BILL_EDIT_BEFORE_APPROVAL: 'BILL_EDIT_BEFORE_APPROVAL',
  BILL_EDIT_AFTER_APPROVAL: 'BILL_EDIT_AFTER_APPROVAL',
  BILL_PAY: 'BILL_PAY',
  BILL_RECORD_PAYMENT_CREATE: 'BILL_RECORD_PAYMENT_CREATE',
  BILL_RECORD_PAYMENT_READ: 'BILL_RECORD_PAYMENT_READ',
  BILL_PAYMENT_HISTORY_LIST: 'BILL_PAYMENT_HISTORY_LIST',
  BA_SEE_BA_DETAIL: 'BA_SEE_BA_DETAIL',
  BA_TRANSACTION_LISTING: 'BA_TRANSACTION_LISTING',
  TRANSFER_RFI: 'TRANSFER_RFI',
  TRANSFER_CREATE: 'TRANSFER_CREATE',
  TRANSFER_APPROVE: 'TRANSFER_APPROVE',
  ADDRESS_BOOK_CONTACT_WO_BANK_ACCOUNT_READ: 'ADDRESS_BOOK_CONTACT_WO_BANK_ACCOUNT_READ',
  ADDRESS_BOOK_CONTACT_WO_BANK_ACCOUNT_CREATE: 'ADDRESS_BOOK_CONTACT_WO_BANK_ACCOUNT_CREATE',
  ADDRESS_BOOK_CONTACT_WO_BANK_ACCOUNT_EDIT: 'ADDRESS_BOOK_CONTACT_WO_BANK_ACCOUNT_EDIT',
  ADDRESS_BOOK_CONTACT_WO_BANK_ACCOUNT_DELETE: 'ADDRESS_BOOK_CONTACT_WO_BANK_ACCOUNT_DELETE',
  ADDRESS_BOOK_CONTACT_W_BANK_ACCOUNT_READ: 'ADDRESS_BOOK_CONTACT_W_BANK_ACCOUNT_READ',
  ADDRESS_BOOK_CONTACT_W_BANK_ACCOUNT_CREATE: 'ADDRESS_BOOK_CONTACT_W_BANK_ACCOUNT_CREATE',
  ADDRESS_BOOK_CONTACT_W_BANK_ACCOUNT_EDIT: 'ADDRESS_BOOK_CONTACT_W_BANK_ACCOUNT_EDIT',
  ADDRESS_BOOK_CONTACT_W_BANK_ACCOUNT_DELETE: 'ADDRESS_BOOK_CONTACT_W_BANK_ACCOUNT_DELETE',
  IN_APP_NOTIFICATION_READ: 'IN_APP_NOTIFICATION_READ',
  IN_APP_NOTIFICATION_IS_READ: 'IN_APP_NOTIFICATION_IS_READ',
  SWITCH_ORGANIZATION: 'SWITCH_ORGANIZATION',
  USER_MANAGEMENT_INVITE: 'USER_MANAGEMENT_INVITE',
  USER_MANAGEMENT_MANAGE_ROLE: 'USER_MANAGEMENT_MANAGE_ROLE',
  USER_MANAGEMENT_MANAGE_STATUS: 'USER_MANAGEMENT_MANAGE_STATUS',
  USER_MANAGEMENT_VIEW_LISTING: 'USER_MANAGEMENT_VIEW_LISTING',
  DASHBOARD_RECENT_TRANSACTION: 'DASHBOARD_RECENT_TRANSACTION',
  DASHBOARD_RECENT_BILL: 'DASHBOARD_RECENT_BILL',
  CARD_MANAGEMENT_READ: 'CARD_MANAGEMENT_READ',
  CARD_MANAGEMENT_ISSUING: 'CARD_MANAGEMENT_ISSUING',
  CARD_MANAGEMENT_MANAGE_STATUS_FREEZE: 'CARD_MANAGEMENT_MANAGE_STATUS_FREEZE',
  CARD_MANAGEMENT_MANAGE_STATUS_UNFREEZE: 'CARD_MANAGEMENT_MANAGE_STATUS_UNFREEZE',
  CARD_MANAGEMENT_MANAGE_STATUS_BLOCK: 'CARD_MANAGEMENT_MANAGE_STATUS_BLOCK',
  CARD_MANAGEMENT_EDIT_TITLE: 'CARD_MANAGEMENT_EDIT_TITLE',
  CARD_MANAGEMENT_EDIT_CARD_LIMIT: 'CARD_MANAGEMENT_EDIT_CARD_LIMIT',
  CARD_MANAGEMENT_READ_CARD_DETAIL: 'CARD_MANAGEMENT_READ_CARD_DETAIL',
  CARD_MANAGEMENT_EDIT_THEME: 'CARD_MANAGEMENT_EDIT_THEME',
  CARD_MANAGEMENT_TRANSACTION_LISTING: 'CARD_MANAGEMENT_TRANSACTION_LISTING',
  CARD_MANAGEMENT_EDIT_SPEND_OF_CARD_OF_TRANSACTION: 'CARD_MANAGEMENT_EDIT_SPEND_OF_CARD_OF_TRANSACTION',
  BA_WALLET_TO_WALLET_TRANSFER: 'BA_WALLET_TO_WALLET_TRANSFER',
  EARN_READ: 'EARN_READ'
};

export const RolePermissionValue = {
  ALL: 'All',
  OWN: 'Own',
  NO_ACCESS: 'No Access'
};

export const SupportedPaymentMethods = ['LOCAL', 'SWIFT'];

export const EuroSysVarCode = 'CURRENCY_EURO';

export const WalletCurrencies = ['EUR', 'USD', 'SGD'];

const payloadVaLocalSgd = vaPayloadFormatter('SGD', 'DBS_SG', 'SGD account');
const payloadVaOverseasSgd = vaPayloadFormatter('SGD', 'CITI_SG', 'Overseas SGD account');
const payloadVaLocalUsd = vaPayloadFormatter('USD', 'CFSB_USINTL', 'USD account');
const payloadVaOverseasUsd = vaPayloadFormatter('USD', 'JPM_SG', 'Overseas USD account');
const payloadVaLocalEur = vaPayloadFormatter('EUR', 'BOL_LT', 'EUR account');
const payloadVaOverseasEur = vaPayloadFormatter('EUR', 'JPM_SG', 'Overseas EUR account');

export const VirtualAccountPayloads = [
  {
    currency: 'SGD',
    type: 'local',
    payload: payloadVaLocalSgd
  },
  {
    currency: 'SGD',
    type: 'overseas',
    payload: payloadVaOverseasSgd
  },
  {
    currency: 'USD',
    type: 'local',
    payload: payloadVaLocalUsd
  },
  {
    currency: 'USD',
    type: 'overseas',
    payload: payloadVaOverseasUsd
  },
  {
    currency: 'EUR',
    type: 'local',
    payload: payloadVaLocalEur
  },
  {
    currency: 'EUR',
    type: 'overseas',
    payload: payloadVaOverseasEur
  }
];

export const EUR_2ISO_CODE = 'EU';

export const NIUM_CARD_LIMIT_TYPE = {
  MONTHLY_AMOUNT_LIMIT: 'MONTHLY_AMOUNT_LIMIT'
};

export const CARD_STATUS = {
  ACTIVE: 'ACTIVE',
  FROZEN: 'FROZEN'
};

export const OTP_TYPE = {
  SHOW_CARD_ENCRYPTED_DATA: 'SHOW_CARD_ENCRYPTED_DATA'
};

export const NIUM_TRANSACTION_TYPE = {
  FEE_DEBIT: 'Fee_Debit',
  DEBIT: 'Debit',
  SETTLEMENT_DIRECT_DEBIT: 'Settlement_Direct_Debit',
  FEE_REVERSAL: 'Fee_Reversal',
  REVERSAL: 'Reversal'
};

export const CARD_TRANSACTION_TYPE = {
  DEBIT: 'Debit',
  REVERSAL: 'Reversal',
  SETTLEMENT_DIRECT_DEBIT: 'Settlement_Direct_Debit'
};

export const NIUM_SETTLEMENT_STATUS = {
  SETTLED: 'Settled',
  UNSETTLED: 'Unsettled',
  RELEASED: 'Released'
};
