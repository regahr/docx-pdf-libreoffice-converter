import envConfig from '../configs/env.config';

const UserUtil = {
  generateEmail: (user, organization) => {
    if (!user || !organization) return '';
    const {
      callFirstName,
      callLastName,
      _id: userId
    } = user;

    const {
      companyName,
      _id: organizationId
    } = organization;

    const {
      emailBillSubDomain
    } = envConfig.sendgrid;

    const first6CharName = (`${callFirstName}${callLastName}`).replace(/['\s_?&@(),.#$%]/g, '').substring(0, 6).toLowerCase();
    const first6CharOrganizationName = (`${companyName}`).replace(/['\s_?&@(),.#$%]/g, '').substring(0, 6).toLowerCase();
    const first3CharUserId = userId.toString().substring(0, 3).toLowerCase();
    const first3CharOrganizationId = organizationId.toString().substring(0, 3).toLowerCase();

    const email = `${first6CharName}${first3CharUserId}.${first6CharOrganizationName}${first3CharOrganizationId}@${emailBillSubDomain}.grof.co`;

    return email;
  }
};

export default UserUtil;
