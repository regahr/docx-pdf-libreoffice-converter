/**
 * For generating list of possible phone number
 * @param {string} phoneNumber
 * @returns {string[]}
 */
export const parsePhone = (phoneNumber) => {
  const sanitizedPhoneNumber = phoneNumber.split(' ').join('');
  if (sanitizedPhoneNumber.length <= 5) return sanitizedPhoneNumber;

  const result = [];

  for (let i = 0; i <= 4; i += 1) {
    const slicedPhoneNumber = sanitizedPhoneNumber.slice(i);
    if (slicedPhoneNumber.length >= 5) {
      result.push(slicedPhoneNumber);
    }
  }

  return result;
};

export default {
  parsePhone
};
