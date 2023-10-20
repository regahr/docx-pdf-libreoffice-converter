import { okResponse } from '../../variables/common.variable';
import { errorsGenerator } from '../../utils/error.util';
import GeneralFunc from '../../functions/general/general.function';

const GeneralController = {

  async getDropdownData(req, res, next) {
    const { variable } = req.query;
    const name = `Get ${variable} Data`;
    try {
      const data = await GeneralFunc.getData(variable);
      if (!data) throw new Error('Critical failure, can\'t get data');
      res.status(200).json(okResponse('OK', '00', data, name));
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, []);
      next({ req: { ...req }, name, metaResponse });
    }
  }

};

export default GeneralController;
