export function vaPayloadFormatter(currencyCode, bankName, value) {
  return {
    currencyCode,
    bankName,
    tags: [
      {
        key: 'AccountType',
        value
      }
    ]
  };
}

export default { vaPayloadFormatter };
