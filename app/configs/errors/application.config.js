import { bugsLevel } from '../../variables/common.variable';

export default {
  APPLICATION_ID_NOT_FOUND: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '45',
    message: 'Can\'t continue, applicationId not found on payload'
  },
  COMPANY_NOT_FOUND: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '46',
    message: 'Can\'t continue, company not found'
  },
  MEMBERS_NOT_FOUND: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '47',
    message: 'Can\'t continue, members not found'
  },
  ARTEMIS_NOT_APPROVED: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '48',
    message: 'Couldn’t continue, Artemis status is not approved'
  },
  APPLICATION_NOT_FOUND: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '49',
    message: 'Can\'t continue, application not found'
  },
  AUTH_INVALID_FORMAT_PRIMARY_INDUSTRY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '50',
    message: 'Primary Industry must be in correct format! ex: Accountancy firm'
  },
  AUTH_EMPTY_EMAIL_ADDRESS: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '51',
    message: 'Email address cannot be empty!'
  },
  AUTH_INVALID_FORMAT_EMAIL_ADDRESS: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '52',
    message: 'Email address must be in correct format! ex: johndoe@sproutasia.com'
  },
  COMPANY_NAME_EMPTY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '53',
    message: 'Company Name cannot be empty!'
  },
  AUTH_INVALID_FORMAT_COUNTRY_ISO2CODE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '54',
    message: 'Country must be in correct format! ex: SG, ID, EU'
  },
  EMPTY_UEN: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '55',
    message: 'UEN can\'t empty.'
  },
  EMPTY_DATE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '56',
    message: 'Date can\'t empty.'
  },
  EMPTY_ADDRESSLINE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '57',
    message: 'Addressline can\'t empty.'
  },
  EMPTY_CITY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '58',
    message: 'City can\'t empty.'
  },
  EMPTY_POSTCODE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '60',
    message: 'Postcode can\'t empty.'
  },
  EMPTY_COUNTRY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '61',
    message: 'Country can\'t empty.'
  },
  EMPTY_STATE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '62',
    message: 'State can\'t empty.'
  },
  EMPTY_ANNUAL_TURN_OVER: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '63',
    message: 'Annual Turn Over can\'t empty.'
  },
  EMPTY_TOTAL_EMPLOYEES: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '64',
    message: 'Total Employees can\'t empty.'
  },
  EMPTY_NIUM_PROGRAM: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '65',
    message: 'Nium Program can\'t empty.'
  },
  EMPTY_POSITION_TYPE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '66',
    message: 'Position Type can\'t empty.'
  },
  EMPTY_FIRST_NAME: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '67',
    message: 'First Name can\'t empty.'
  },
  EMPTY_LAST_NAME: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '68',
    message: 'Last Name can\'t empty.'
  },
  EMPTY_ID_DOCUMENT: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '69',
    message: 'ID Document can\'t empty.'
  },
  EMPTY_SHARE_PERCENTAGE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '70',
    message: 'Share Percentage can\'t empty.'
  },
  EMPTY_LEGAL_DETAILS_UEN: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '71',
    message: 'UEN inside Legal Details can\'t empty.'
  },
  EMPTY_ORGANIZATION_ID: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '72',
    message: 'Organization ID can\'t empty.'
  },
  APPLICANT_NOT_FOUND: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '73',
    message: 'Can\'t proceed without applicant, please select one'
  },
  DISCONNECTED_ORGANIZATION: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '74',
    message: 'This application not connected with any organization, anomaly detected'
  },
  EMPTY_RFI_TEMPLATE_ID: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '75',
    message: 'rfiTemplateId must not be empty.'
  },
  MISSING_BUSINESS_INFO: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '76',
    message: 'businessInfo must not be missing.'
  },
  EMPTY_REFERENCE_ID: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '77',
    message: 'referenceId must not be empty.'
  },
  MISSING_RFI_TEMPLATE_ID: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '78',
    message: 'rfiTemplateId must not be missing.'
  },
  MINIMUM_BUSINESS_INFO: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '79',
    message: 'Minimum one item at businessInfo'
  },
  BUSINESS_INFO_BASE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '80',
    message: 'businessInfo must be in form of Object'
  },
  PARTNERSHIP_DETAILS_BASE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '81',
    message: 'partnershipDetails must be in form of Object'
  },
  MINIMUM_PARTNERSHIP_DETAILS: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '82',
    message: 'Minimum one item at partnershipDetails'
  },
  ASSOCIATION_DETAILS_BASE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '83',
    message: 'associationDetails must be in form of Object'
  },
  MINIMUM_ASSOCIATION_DETAILS: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '84',
    message: 'Minimum one item at associationDetails'
  },
  LEGAL_DETAILS_BASE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '85',
    message: 'legalDetails must be in form of Object'
  },
  MINIMUM_LEGAL_DETAILS: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '86',
    message: 'Minimum one item at legalDetails'
  },
  REGULATORY_DETAILS_BASE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '87',
    message: 'regulatoryDetails must be in form of Object'
  },
  MINIMUM_REGULATORY_DETAILS: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '88',
    message: 'Minimum one item at regulatoryDetails'
  },
  TAX_DETAILS_BASE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '89',
    message: 'taxDetails must be in form of Array'
  },
  MINIMUM_TAX_DETAILS: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '90',
    message: 'Minimum one item at taxDetails'
  },
  ADDRESSES_BASE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '91',
    message: 'addresses must be in form of Object'
  },
  MINIMUM_ADDRESSES: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '92',
    message: 'Minimum one item at addresses'
  },
  REGISTERED_ADDRESS_BASE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '93',
    message: 'registeredAddress must be in form of Object'
  },
  MINIMUM_REGISTERED_ADDRESS: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '94',
    message: 'Minimum one item at registeredAddress'
  },
  BUSINESS_ADDRESS_BASE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '95',
    message: 'businessAddress must be in form of Object'
  },
  MINIMUM_BUSINESS_ADDRESS: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '96',
    message: 'Minimum one item at businessAddress'
  },
  TAX_DETAILS_FILLED_BY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '97',
    message: 'taxDetails is only allowed to be filled by Object'
  },
  TAX_DETAILS_MINIMUM_OBJECT: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '98',
    message: 'Objects inside taxDetails must not be empty'
  },
  DOCUMENT_DETAILS_BASE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '99',
    message: 'documentDetails must be in form of Object'
  },
  MINIMUM_DOCUMENT_DETAILS: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '100',
    message: 'Minimum one item at documentDetails'
  },
  EMPTY_ORGANIZATION: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '101',
    message: "Organization can't empty"
  },
  EMPTY_BUSINESS_NAME: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '102',
    message: 'Business name must not be empty.'
  },
  EMPTY_STATUS: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '103',
    message: 'Status can\'t empty.'
  },
  EMPTY_FORMER_NAME: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '104',
    message: 'formerName must not be empty.'
  },
  EMPTY_BUSINESS_TYPE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '105',
    message: 'businessType must not be empty.'
  },
  EMPTY_TRADE_NAME: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '106',
    message: 'tradeName must not be empty.'
  },
  EMPTY_TRUSTEE_NAME: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '107',
    message: 'trusteeName must not be empty.'
  },
  EMPTY_SETTLOR_NAME: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '108',
    message: 'settlorName must not be empty.'
  },
  EMPTY_PARTNER_NAME: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '109',
    message: 'partnerName must not be empty.'
  },
  EMPTY_PARTNER_COUNTRY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '110',
    message: 'partnerCountry must not be empty.'
  },
  EMPTY_PARTNER_STATE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '111',
    message: 'partnerState must not be empty.'
  },
  EMPTY_ASSOCIATION_NAME: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '112',
    message: 'associationName must not be empty.'
  },
  EMPTY_ASSOCIATION_NUMBER: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '113',
    message: 'associationNumber must not be empty.'
  },
  EMPTY_ASSOCIATION_CHAIR_PERSON: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '114',
    message: 'associationChairPerson must not be empty.'
  },
  EMPTY_REGISTERED_COUNTRY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '115',
    message: 'registeredCountry must not be empty.'
  },
  EMPTY_REGISTRATION_TYPE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '116',
    message: 'registrationType must not be empty.'
  },
  EMPTY_REGISTERED_DATE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '117',
    message: 'registeredDate must not be empty.'
  },
  EMPTY_LISTED_EXCHANGE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '118',
    message: 'listedExchange must not be empty.'
  },
  EMPTY_LEGISLATION_NAME: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '119',
    message: 'legislationName must not be empty.'
  },
  EMPTY_LEGISLATION_TYPE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '120',
    message: 'legislationType must not be empty.'
  },
  EMPTY_WEBSITE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '121',
    message: 'website must not be empty.'
  },
  EMPTY_REGULATED_TRUST_TYPE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '122',
    message: 'regulatedTrustType must not be empty.'
  },
  EMPTY_UNREGULATED_TRUST_TYPE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '123',
    message: 'unregulatedTrustType must not be empty.'
  },
  EMPTY_TAX_NUMBER: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '124',
    message: 'taxNumber must not be empty.'
  },
  EMPTY_ADDRESSLINE1: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '125',
    message: 'addressLine1 must not be empty.'
  },
  EMPTY_ADDRESSLINE2: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '126',
    message: 'addressLine2 must not be empty.'
  },
  EMPTY_DOCUMENT_TYPE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '127',
    message: 'documentType must not be empty.'
  },
  EMPTY_DOCUMENT_NUMBER: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '128',
    message: 'documentNumber must not be empty.'
  },
  EMPTY_DOCUMENT_REFERENCE_NUMBER: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '129',
    message: 'documentReferenceNumber must not be empty.'
  },
  EMPTY_DOCUMENT_ISSUANCE_COUNTRY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '130',
    message: 'documentIssuanceCountry must not be empty.'
  },
  EMPTY_DOCUMENT_EXPIRY_DATE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '131',
    message: 'documentExpiryDate must not be empty.'
  },
  EMPTY_DOCUMENT_ISSUED_DATE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '132',
    message: 'documentIssuedDate must not be empty.'
  },
  EMPTY_DOCUMENT_ISSUING_AUTHORITY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '133',
    message: 'documentIssuingAuthority must not be empty.'
  },
  EMPTY_FILE_NAME: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '134',
    message: 'fileName must not be empty.'
  },
  EMPTY_FILE_TYPE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '135',
    message: 'fileType must not be empty.'
  },
  EMPTY_DOCUMENT: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '136',
    message: 'document must not be empty.'
  },
  DOCUMENT_FILLED_BY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '137',
    message: 'document is only allowed to be filled by Object'
  },
  DOCUMENT_MINIMUM_OBJECT: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '138',
    message: 'Objects inside document must not be empty'
  },
  MINIMUM_DOCUMENT: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '139',
    message: 'Minimum one item at document'
  },
  DOCUMENT_BASE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '140',
    message: 'document must be in form of Array'
  },
  EMPTY_BIRTH_COUNTRY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '141',
    message: 'birthCountry must not be empty.'
  },
  EMPTY_MIDDLENAME: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '142',
    message: 'middleName must not be empty.'
  },
  EMPTY_GENDER: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '143',
    message: 'gender must not be empty.'
  },
  AUTH_INVALID_FORMAT_GENDER: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '144',
    message: 'Gender must be in correct format! ex: Male, Female'
  },
  EMPTY_DATE_OF_BIRTH: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '145',
    message: 'dateOfBirth must not be empty.'
  },
  EMPTY_NATIONALITY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '146',
    message: 'nationality must not be empty.'
  },
  AUTH_INVALID_FORMAT_NATIONALITY_ISO2CODE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '147',
    message: 'nationality must be in correct format! ex: SG, ID, US'
  },
  EMPTY_CONTACT_NO: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '148',
    message: 'contactNo must not be empty.'
  },
  CONTACT_DETAILS_MINIMUM_OBJECT: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '149',
    message: 'Objects inside contactDetails must not be empty'
  },
  CONTACT_DETAILS_FILLED_BY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '150',
    message: 'contactDetails is only allowed to be filled by Object'
  },
  ADDRESS_BASE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '151',
    message: 'address must be in form of Object'
  },
  MINIMUM_ADDRESS: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '152',
    message: 'Minimum one item at address'
  },
  EMPTY_POSITION: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '153',
    message: 'position must not be empty.'
  },
  AUTH_INVALID_FORMAT_POSITION: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '154',
    message: 'position must be in correct format! ex: Director, Shareholder'
  },
  PROFESSIONAL_DETAILS_MINIMUM_OBJECT: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '155',
    message: 'Objects inside professionalDetails must not be empty'
  },
  PROFESSIONAL_DETAILS_FILLED_BY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '156',
    message: 'professionalDetails is only allowed to be filled by Object'
  },
  PROFESSIONAL_DETAILS_BASE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '157',
    message: 'professionalDetails must be in form of Array'
  },
  MINIMUM_PROFESSIONAL_DETAILS: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '158',
    message: 'Minimum one item at professionalDetails'
  },
  EMPTY_DOCUMENT_HOLDER_NAME: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '159',
    message: 'documentHolderName must not be empty.'
  },
  AUTH_INVALID_FORMAT_FILE_TYPE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '160',
    message: 'fileType must be in correct format! ex: jpg, jpeg, png, pdf'
  },
  AUTH_INVALID_FORMAT_REGISTERED_COUNTRY_ISO2CODE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '161',
    message: 'registeredCountry must be in correct format! ex: SG, ID, EU'
  },
  BUSINESS_PARTNER_BASE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '162',
    message: 'businessPartner must be in form of Object'
  },
  MINIMUM_BUSINESS_PARTNER: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '163',
    message: 'Minimum one item at businessPartner'
  },
  STAKEHOLDERS_BASE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '164',
    message: 'stakeholders must be in form of Array'
  },
  MINIMUM_STAKEHOLDERS: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '165',
    message: 'Minimum one item at stakeholders'
  },
  STAKEHOLDERS_MINIMUM_OBJECT: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '166',
    message: 'Objects inside stakeholders must not be empty'
  },
  STAKEHOLDERS_FILLED_BY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '167',
    message: 'stakeholders is only allowed to be filled by Object'
  },
  MINIMUM_STAKEHOLDER_DETAILS: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '168',
    message: 'Minimum one item at stakeholderDetails'
  },
  STAKEHOLDER_DETAILS_BASE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '169',
    message: 'stakeholderDetails must be in form of Object'
  },
  EMPTY_COUNTRY_CODE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '170',
    message: 'countryCode must not be empty.'
  },
  AUTH_INVALID_FORMAT_COUNTRY_CODE_ISO2CODE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '171',
    message: 'countryCode must be in correct format! ex: SG, ID, EU'
  },
  CONTACT_DETAILS_BASE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '172',
    message: 'contactDetails must be in form of Object'
  },
  MINIMUM_APPLICANT_DETAILS: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '173',
    message: 'Minimum one item at applicantDetails'
  },
  APPLICANT_DETAILS_BASE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '174',
    message: 'applicantDetails must be in form of Object'
  },
  MINIMUM_ADDITIONAL_INFO: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '175',
    message: 'Minimum one item at additionalInfo'
  },
  ADDITIONAL_INFO_BASE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '176',
    message: 'additionalInfo must be in form of Object'
  },
  AUTH_INVALID_FORMAT_ANNUAL_TURN_OVER: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '177',
    message: 'annualTurnover must be in correct format! ex: Less than SGD 10,000'
  },
  EMPTY_INDUSTRY_SECTOR: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '178',
    message: 'industrySector must not be empty.'
  },
  EMPTY_COUNTRY_OF_OPERATION: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '179',
    message: 'countryOfOperation must not be empty.'
  },
  EMPTY_TRAVEL_RESTRICTED_COUNTRY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '180',
    message: 'travelRestrictedCountry must not be empty.'
  },
  AUTH_INVALID_FORMAT_TRAVEL_RESTRICTED_COUNTRY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '181',
    message: 'travelRestrictedCountry must be in correct format! ex: Yes, No'
  },
  EMPTY_RESTRICTED_COUNTRIES: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '182',
    message: 'restrictedCountries must not be empty.'
  },
  EMPTY_OFAC_LICENSE_PRESENT: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '183',
    message: 'ofacLicensePresent must not be empty.'
  },
  AUTH_INVALID_FORMAT_OFAC_LICENSE_PRESENT: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '184',
    message: 'ofacLicensePresent must be in correct format! ex: Yes, No'
  },
  MINIMUM_RISK_ASSESSMENT_INFO: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '185',
    message: 'Minimum one item at riskAssessmentInfo'
  },
  RISK_ASSESSMENT_INFO_BASE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '186',
    message: 'riskAssessmentInfo must be in form of Object'
  },
  MINIMUM_COUNTRY_OF_OPERATION: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '187',
    message: 'Minimum one item at countryOfOperation'
  },
  MINIMUM_RESTRICTED_COUNTRIES: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '188',
    message: 'Minimum one item at restrictedCountries'
  },
  EMPTY_BUSINESS_REGISTRATION_NUMBER: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '189',
    message: 'businessRegistrationNumber must not be empty.'
  },
  RFI_TEMPLATE_ID_BASE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '101',
    message: 'rfiTemplateId must be string'
  },
  EMPTY_ENTITY_TYPE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '190',
    message: 'Entity Type must not be empty.'
  },
  AUTH_INVALID_FORMAT_ENTITY_TYPE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '191',
    message: 'Entity Type must be in correct format! ex: BIZ, COM'
  },
  EMPTY_COMPANY_TYPE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '192',
    message: 'Company Type must not be empty.'
  },
  EMPTY_STAKEHOLDERS_COMPANY_TYPE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '192A',
    message: "Stakeholder's Company Type must not be empty."
  },
  AUTH_INVALID_FORMAT_COMPANY_TYPE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '193',
    message: 'Company Type must be in correct format! ex: EXEMPT PRIVATE COMPANY LIMITED BY SHARES, PRIVATE COMPANY LIMITED BY SHARES'
  },
  EMPTY_ENTITY_STATUS: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '194',
    message: 'Entity Status must not be empty.'
  },
  AUTH_INVALID_FORMAT_ENTITY_STATUS: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '195',
    message: 'Entity Status must be in correct format! ex: Cancelled (Non-Renewal), Live Company'
  },
  COUNTRY_REGISTERED_BUSINESS_EMPTY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '196',
    message: 'Country of registered business cannot be empty!'
  },
  EMPTY_PRIMARY_INDUSTRY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '197',
    message: 'Primary Industry cannot be empty!'
  },
  EMPTY_ADDRESS_UNIT: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '198',
    message: 'Address Unit cannot be empty!'
  },
  EMPTY_ADDRESS_LEVEL: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '199',
    message: 'Address Level cannot be empty!'
  },
  EMPTY_ADDRESS_BLOCK_HOUSE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '200',
    message: 'Address Block House cannot be empty!'
  },
  EMPTY_ADDRESS_BUILDING_NAME: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '201',
    message: 'Address Building Name cannot be empty!'
  },
  EMPTY_ADDRESS_STREET_NAME: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '202',
    message: 'Address Street Name cannot be empty!'
  },
  EMPTY_LOCATION_OF_BUSINESS: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '203',
    message: 'Location of Business cannot be empty!'
  },
  EXCEEDED_MAXIMUM_LIMIT_FILESIZE_DOCUMENT: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '204',
    message: 'Maximum allowable bulk documents size for Nium submission in the application is 10 MB. Please check the file size in the company and stakeholders\' details.'
  },
  COUNTRY_NOT_FOUND_ON_DB: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '205',
    message: 'Countries on Country Of Operation not found on Database. Please contact the developer.'
  },
  CUSTOMER_HASH_ID_NOT_FOUND: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '206',
    message: 'Can\'t continue, customer hash id not found'
  }
};
