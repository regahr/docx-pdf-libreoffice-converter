import CoaTemplate from '../../models/coa/CoaTemplate.model';
import errorsConfig from '../../configs/errors/coa-template.config';

export const CoaTemplateFunc = {

  async findCurrentLive() {
    const result = await CoaTemplate.findOne({ isLive: true });
    if (!result) throw new Error(errorsConfig.NO_LIVE_TEMPLATE.message);
    return result;
  }

};

export function noop() {}
