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
  BA_WALLET_LIST_EMPTY: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '300',
    message: 'Wallet not found!'
  },
  BA_WALLET_NOT_FOUND_ON_NIUM: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '301',
    message: 'Wallet not found on Nium!'
  },
  INVALID_ORGANIZATION_ID: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '302',
    message: 'Invalid organizationId in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters'
  },
  BA_CONTACT_NOT_FOUND_ON_NIUM: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '303',
    message: 'Contact not found on Nium!'
  },
  BA_CONTACT_NOT_FOUND: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '303',
    message: 'Contact not found!'
  },
  BA_CONTACT_LIST_EMPTY: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '304',
    message: 'Contact list empty!'
  },
  BA_EMPTY_NAME: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '305',
    message: 'contactName cannot be empty!'
  },
  BA_EMPTY_ACCOUNT_TYPE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '306',
    message: 'recipientAccountType cannot be empty!'
  },
  BA_INVALID_VALUE_ACCOUNT_TYPE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '307',
    message: 'recipientAccountType must be in correct value! ex: Individual or Corporate'
  },
  BA_EMPTY_COUNTRY_CODE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '308',
    message: 'recipientCountryCode cannot be empty!'
  },
  BA_INVALID_VALUE_COUNTRY_CODE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '309',
    message: 'recipientCountryCode must be in correct value! ex: SG'
  },
  BA_EMPTY_DESTINATION_CURRENCY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '310',
    message: 'destinationCurrency cannot be empty!'
  },
  BA_INVALID_VALUE_DESTINATION_CURRENCY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '311',
    message: 'destinationCurrency must be in correct value! check this references! https://nium-documents.s3-eu-west-1.amazonaws.com/spend-documents/Country+Code.pdf'
  },
  BA_EMPTY_PAYOUT_METHOD: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '312',
    message: 'payoutMethod cannot be empty!'
  },
  BA_INVALID_VALUE_PAYOUT_METHOD: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '313',
    message: 'payoutMethod must be in correct value! ex: LOCAL'
  },
  BA_EMPTY_EMAIL_ADDRESS: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '314',
    message: 'Email address cannot be empty!'
  },
  BA_INVALID_FORMAT_EMAIL_ADDRESS: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '315',
    message: 'recipientEmail must be in correct format! ex: johndoe@gro.tech'
  },
  BA_INVALID_VALUE_DESTINATION_COUNTRY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '316',
    message: 'destinationCountry must be in correct value! check this references! https://www.iso.org/iso-4217-currency-codes.html'
  },
  BA_EMPTY_CLIENT_LEGAL_ENTITY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '317',
    message: 'Client legal entity cannot be empty!'
  },
  BA_INVALID_VALUE_CLIENT_LEGAL_ENTITY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '318',
    message: 'Client legal entity must be in correct value! check this references! https://www.iso.org/iso-4217-currency-codes.html'
  },
  BA_EMPTY_BANK_ACCOUNT_TYPE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '319',
    message: 'recipientBankAccountType cannot be empty!'
  },
  BA_INVALID_VALUE_BANK_ACCOUNT_TYPE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '320',
    message: 'recipientBankAccountType must be in correct value! ex: Savings'
  },
  BA_NOT_INTEGRATED: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '321',
    message: 'Not integrated with Nium yet!'
  },
  BA_MISSING_PAYOUT_METADATA: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '322',
    message: 'Payout metadata must be exists to be filled by payout method!'
  },
  BA_EMPTY_NIUM_WALLET_ID: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '323',
    message: 'Nium wallet id cannot be empty!'
  },
  BA_EMPTY_NIUM_BENEFICIARY_ID: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '324',
    message: 'Nium beneficiary id cannot be empty!'
  },
  BA_EMPTY_PAYOUT_ID: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '325',
    message: 'Payout id cannot be empty!'
  },
  BA_EMPTY_AMOUNT: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '326',
    message: 'Amount cannot be empty!'
  },
  BA_EMPTY_SWIFT_FEE_TYPE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '327',
    message: 'Swift fee type cannot be empty!'
  },
  BA_EMPTY_AUDIT_ID: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '328',
    message: 'Audit ID cannot be empty!'
  },
  BA_CURRENCY_PAYOUT_UNSUPPORTED: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '329',
    message: 'Unsupported combination of currency and payout method!'
  },
  BA_CONTACT_CANNOT_DELETE: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '330',
    message: 'Delete Contact not allowed as Transaction in progress.'
  },
  BA_TRANSACTION_LIST_EMPTY: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '300',
    message: 'Transaction not found!'
  },
  BA_TRANSFER_SUBMITTED: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '03',
    message: 'Can\'t continue, transfer has been submitted'
  },
  CONTACTS_PAYLOAD_VALIDATION: (message) => ({
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '08',
    message: `Can't continue, ${message}`
  }),
  BA_TRANSACTION_ID_EMPTY: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '500',
    message: 'Transaction ID not found'
  },
  BA_SYSTEM_REF_NUMBER_EMPTY: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '501',
    message: 'System Reference Number not found'
  },
  BA_AUTHCODE_EMPTY: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '502',
    message: 'Auth Code not found'
  },
  BA_RFI_HASH_ID_EMPTY: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '503',
    message: 'RFI Hash ID not found'
  },
  BA_RFI_IDENTIFICATION_TYPE_EMPTY: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '504',
    message: 'RFI Identification Type not found'
  },
  BA_RFI_IDENTIFICATION_DOCUMENT_EMPTY: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '505',
    message: 'RFI Identification Document not found'
  },
  BA_RFI_RESPONSE_REQUEST_EMPTY: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '506',
    message: 'RFI Response Request not found'
  },
  BA_RFI_IDENTIFICATION_DOCUMENT_FILENAME_EMPTY: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '507',
    message: 'RFI Identification Document - Filename not found'
  },
  BA_RFI_IDENTIFICATION_DOCUMENT_FILETYPE_EMPTY: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '508',
    message: 'RFI Identification Document - Filetype not found'
  },
  BA_RFI_IDENTIFICATION_DOCUMENT_DOCUMENT_EMPTY: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '509',
    message: 'RFI Identification Document - Document not found'
  },
  BA_CONTACT_ALREADY_EXISTS: {
    httpStatus: 409,
    level: bugsLevel.MINOR,
    code: '510',
    message: 'Sorry, you\'re not allowed to add the same bank account number twice'
  },
  BA_EMPTY_DESTINATION_COUNTRY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '511',
    message: 'destinationCountry cannot be empty!'
  },
  BA_TRANSACTION_STATUS_NOT_DRAFT: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '512',
    message: 'This transaction status is not Draft'
  },
  BA_TRANSACTION_STATUS_NOT_RFI: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '512',
    message: 'This transaction status is not RFI Requested'
  },
  BA_CONTACT_NAME_EMPTY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '513',
    message: 'Contact Name cannot be empty!'
  },
  BA_CONTACT_IS_BANK_ACCOUNT_HIDDEN_EMPTY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '514',
    message: 'Is Bank Account Hidden cannot be empty!'
  },
  BA_EMPTY_RECIPIENT_ACCOUNT_NUMBER: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '515',
    message: 'Recipient Account Number cannot be empty!'
  },
  BA_EMPTY_RECIPIENT_BANK_NAME: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '516',
    message: 'Recipient Bank Name cannot be empty!'
  },
  CONTACT_EMPTY_ACCOUNT_TYPE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '517',
    message: 'Account Type cannot be empty!'
  },
  EXCHANGE_RATE_EXPIRED: {
    httpStatus: 406,
    level: bugsLevel.MINOR,
    code: '518',
    message: 'Exchange rate has expired. Please create new transaction and approve it immediately.'
  },
  ORGANIZATION_NOT_FOUND: {
    httpStatus: 406,
    level: bugsLevel.MINOR,
    code: '519',
    message: 'Can\'t continue, organization not found'
  },
  BA_EMPTY_CURRENCY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '520',
    message: 'currency cannot be empty!'
  },
  BA_INVALID_VALUE_CURRENCY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '521',
    message: 'currency must be in correct value! check this references! https://nium-documents.s3-eu-west-1.amazonaws.com/spend-documents/Country+Code.pdf'
  },
  CARD_USER_NOT_FOUND: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: 'CARD-001',
    message: 'Card user not found'
  },
  CARD_USER_KYC_NOT_COMPLETED: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: 'CARD-002',
    message: 'Cards cannot be assigned to Users without completed KYC'
  },
  CARD_USER_NOT_ACTIVE: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: 'CARD-003',
    message: 'Card user not active'
  },
  CARD_NOT_FOUND: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: 'CARD-004',
    message: 'Card not found'
  },
  CARD_NOT_ACTIVE: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: 'CARD-005',
    message: 'Card not active'
  },
  CARD_TRANSACTION_NOT_FOUND: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: 'CARD-006',
    message: 'Card transaction not found'
  },
  BA_SOURCE_CURRENCY_DESTINATION_CURRENCY_MUST_DIFFERENT: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '522',
    message: 'Source currency and destination currency must be different'
  },
  NIUM_TRANSACTION_NOT_FOUND: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: 'CARD-007',
    message: 'Nium transaction not found'
  },
  BA_SOURCE_AMOUNT_OR_DESTINATION_AMOUNT_MUST_BE_FILLED: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '523',
    message: 'Amount or destination amount must be filled'
  },
  BA_SOURCE_WALLET_DOES_NOT_EXIST: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '524',
    message: 'Source wallet does not exist'
  },
  BA_DESTINATION_WALLET_DOES_NOT_EXIST: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '525',
    message: 'Destination wallet does not exist'
  }
};
