import CoaOrganization from '../../models/coa/CoaOrganization.model';
import OrganizationModel from '../../models/auth/Organization.model';
import errorsConfig from '../../configs/errors/coa-organization.config';
import { CoaTemplateFunc } from './coa-template.function';

export const CoaOrganizationFunc = {

  async create(organizationId) {
    const organizationExist = await OrganizationModel.findById(organizationId);
    if (!organizationExist) throw new Error(errorsConfig.ORGANIZATION_NOT_FOUND.message);
    const coaOrganizationExist = await CoaOrganization.findOne({ organizationId });
    if (coaOrganizationExist) throw new Error(errorsConfig.COA_ORGANIZATION_ALREADY_EXIST.message);
    const currentLiveVersion = await CoaTemplateFunc.findCurrentLive();

    const preSave = {
      organizationId,
      coa: currentLiveVersion.coa,
      templateVersion: currentLiveVersion.version
    };

    const result = await CoaOrganization.create(preSave);
    return result;
  }

};

export function noop() {}
