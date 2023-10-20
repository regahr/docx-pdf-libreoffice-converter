export const DummyNiumConstant = {
  AnnualTurnOver: [
    {
      code: 'SG008',
      description: 'Less than SGD 100,000'
    },
    {
      code: 'SG009',
      description: 'SGD 100,000 to SGD 500,000'
    },
    {
      code: 'SG010',
      description: 'SGD 500,000 to SGD 1,500,000'
    },
    {
      code: 'SG011',
      description: 'SGD 1,500,000 +'
    }
  ],
  TotalEmployees: [
    {
      code: 'EM006',
      description: 'Less than or equal 1'
    },
    {
      code: 'EM007',
      description: 'Between 2 to 5'
    },
    {
      code: 'EM008',
      description: 'Between 6 to 24'
    },
    {
      code: 'EM009',
      description: 'More than 24'
    }
  ],
  IndustrySector: [
    {
      code: 'IS134',
      description: 'Retail, Wholesale, E-commerce - Designer and/or Brand Clothing / footware / garments / purses / wallets etc.'
    },
    {
      code: 'IS135',
      description: 'Retail, Wholesale, E-commerce - Clothing / footware / garments / purses / wallets etc.'
    },
    {
      code: 'IS136',
      description: 'Retail, Wholesale, E-commerce - Jewellery / watches (with precious stones/metals)'
    },
    {
      code: 'IS137',
      description: 'Retail, Wholesale, E-commerce - Jewellery / watches (without precious stones/metals)'
    },
    {
      code: 'IS138',
      description: 'Retail, Wholesale, E-commerce - Electronic items (cell phones, laptops, cameras etc.)'
    },
    {
      code: 'IS139',
      description: 'Retail, Wholesale, E-commerce - Vehicles / Auto parts'
    },
    {
      code: 'IS140',
      description: 'Retail, Wholesale, E-commerce - Machinery and large equipment '
    },
    {
      code: 'IS141',
      description: 'Retail, Wholesale, E-commerce - Household items'
    },
    {
      code: 'IS142',
      description: 'Retail, Wholesale, E-commerce - Beauty products (make-up, perfume, hair products, accessories etc)'
    },
    {
      code: 'IS143',
      description: 'Retail, Wholesale, E-commerce - Sports equipment'
    },
    {
      code: 'IS144',
      description: 'Retail, Wholesale, E-commerce - Child care (toys, strollers, diapers, pacifiers, etc.)'
    },
    {
      code: 'IS145',
      description: 'Retail, Wholesale, E-commerce - Tobacco and Tobacco Product'
    },
    {
      code: 'IS146',
      description: 'Retail, Wholesale, E-commerce - Books / Magazines / Newspapers'
    },
    {
      code: 'IS147',
      description: 'Retail, Wholesale, E-commerce - Sales of Pets'
    },
    {
      code: 'IS148',
      description: 'Retail, Wholesale, E-commerce - Pet Supplies Stores (food, accessories etc.)'
    },
    {
      code: 'IS149',
      description: 'Retail, Wholesale, E-commerce - Music (instruments, vinyls, discs ect.)'
    },
    {
      code: 'IS150',
      description: 'Retail, Wholesale, E-commerce - Drugs / Pharmaceuticles '
    },
    {
      code: 'IS151',
      description: 'Retail, Wholesale, E-commerce - Chemicals (other than drugs/pharmaceuticles)'
    }
  ],
  IntendedUseOfAccount: [
    {
      code: 'IU001',
      description: 'Receive payments for goods or services sold'
    },
    {
      code: 'IU002',
      description: 'Pay suppliers and vendors'
    },
    {
      code: 'IU003',
      description: 'Pay contractors/employees (payroll)'
    },
    {
      code: 'IU004',
      description: 'Pay rent, utilities or taxes'
    },
    {
      code: 'IU005',
      description: 'Intra-company payments or transfers'
    },
    {
      code: 'IU007',
      description: 'Pay mortgage, bank loan, insurance or credit card payments'
    }
  ],
  ListedExchange: [
    {
      code: 'EX001',
      description: '4Africa Exchange',
      createdAt: {
        $date: {
          $numberLong: '1686191441154'
        }
      }
    },
    {
      code: 'EX002',
      description: 'Abu Dhabi Securities Exchange',
      createdAt: {
        $date: {
          $numberLong: '1686191441155'
        }
      }
    },
    {
      code: 'EX011',
      description: 'Beirut Stock Exchange',
      createdAt: {
        $date: {
          $numberLong: '1686191441155'
        }
      }
    },
    {
      code: 'EX012',
      description: 'Bermuda Stock Exchange',
      createdAt: {
        $date: {
          $numberLong: '1686191441155'
        }
      }
    },
    {
      code: 'EX013',
      description: 'BME Spanish Exchanges',
      createdAt: {
        $date: {
          $numberLong: '1686191441155'
        }
      }
    },
    {
      code: 'EX014',
      description: 'Bolsa de Comercio de Buenos Aires',
      createdAt: {
        $date: {
          $numberLong: '1686191441155'
        }
      }
    },
    {
      code: 'EX015',
      description: 'Bolsa de Santiago',
      createdAt: {
        $date: {
          $numberLong: '1686191441155'
        }
      }
    },
    {
      code: 'EX016',
      description: 'Bolsa de Valores de Colombia',
      createdAt: {
        $date: {
          $numberLong: '1686191441155'
        }
      }
    },
    {
      code: 'EX017',
      description: 'Bolsa de Valores de Lima',
      createdAt: {
        $date: {
          $numberLong: '1686191441155'
        }
      }
    }
  ]
};

export const DummyNiumUnifiedAddCustomer = {
  customerHashId: 'fa85309b-d850-494e-aac6-5053929baae5',
  walletHashId: '3bb25b31-8788-4acd-834e-6f7477ce6937',
  paymentIds: [
    {
      currencyCode: 'USD',
      uniquePaymentId: '85144097592',
      uniquePayerId: null,
      bankName: 'CFSB_USINTL'
    }
  ]
};

export const DummyNiumCustomerDetails = {
  customerHashId: 'e92f54b2-9c47-4852-bcbb-56ad9a929f59',
  template: 'CARD_CUSTOMER_REGISTRATION_WEBHOOK',
  clientName: 'Sprout Asia',
  walletHashId: 'cf85fa88-8f1f-41e4-96b9-9e82f1343328',
  clientHashId: '8acf805d-3d93-45cc-8307-3c036c4b8787'
};
export function noop() {}
