export const dummyDataCountry = {
  CountryData: [
    {
      code: 'COUNTRY_SGP',
      description: 'Singapore',
      value: {
        dialCode: '+65',
        countryIso3Code: 'SGP',
        countryIso2Code: 'SG',
        currencyCode: 'SGD',
        countryName: 'Singapore'
      }
    },
    {
      code: 'COUNTRY_IDN',
      description: 'Indonesia',
      value: {
        dialCode: '+62',
        countryIsoCode: 'IDN',
        countryIso2Code: 'ID',
        currencyCode: 'IDR',
        countryName: 'Indonesia'
      }
    },
    {
      code: 'COUNTRY_USA',
      description: 'United State America',
      value: {
        dialCode: '+1',
        countryIsoCode: 'USA',
        countryIso2Code: 'US',
        currencyCode: 'USD',
        countryName: 'United State America'
      }
    }
  ],
  SingleCountryData:
    {
      code: 'COUNTRY_SGP',
      description: 'Singapore',
      value: {
        dialCode: '+65',
        countryIsoCode: 'SGP',
        currencyCode: 'SGD',
        countryName: 'Singapore'
      }
    },
  DeletedCount: {
    deletedCount: 1
  },
  ZeroDeletedCount: {
    deletedCount: 0
  },
  FindCountryFlag: {
    _id: '627b974a729ef3e2000dc040',
    value: {
      countryFlagUrl: 'https://img.icons8.com/color/344/singapore-circular.png'
    }
  }
};

export function noop() {}
