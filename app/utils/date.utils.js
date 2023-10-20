import moment from 'moment';

export const convertDateToMoment = (str) => {
  if (str.match(/^(0[1-9]|[12][0-9]|3[01])[-](0[1-9]|1[012])[-]\d{4}$/)) return moment(str, 'DD-MM-YYYY');
  if (str.match(/^\d{4}[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/)) return moment(str, 'YYYY-MM-DD');
  if (str.match(/^(0[1-9]|[12][0-9]|3[01])[-](0[1-9]|1[012])[-]\d{4} [0-5][0-9]:[0-5][0-9]:[0-5][0-9]$/)) return moment(str, 'DD-MM-YYYY HH:mm:ss');
  if (str.match(/^\d{4}[/-](0[1-9]|1[012])[/-](0[1-9]|[12][0-9]|3[01]) [0-5][0-9]:[0-5][0-9]:[0-5][0-9]$/)) return moment(str, 'YYYY-MM-DD HH:mm:ss');

  return moment(str);
};

export default function noop() {}
