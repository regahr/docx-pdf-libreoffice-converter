export const dummyDataSystemVar = {
  FeeName: {
    _id: '63a1e26ed52316ffabf7172e',
    category: 'WAIVE_FEE',
    code: 'FEE_NAME',
    description: 'WAIVE FEE NAME',
    value: {
      feeName: 'REMIT_BANK_FEE'
    }
  },
  AccountType: {
    _id: '63a1dd40d52316ffabf7172d',
    category: 'MASTER_BALANCE',
    code: 'ACCOUNT_TYPE',
    description: 'CLIENT_POOL',
    value: {
      accountType: 'CLIENT_POOL'
    }
  },
  MinimumBalance: {
    _id: '63a1a02ed52316ffabf7172c',
    category: 'MASTER_BALANCE',
    code: 'MINIMUM',
    description: 'MINIMUM MASTER BALANCE',
    value: {
      balance: 1000,
      currency: 'SGD'
    }
  }

};

export function noop() {}
