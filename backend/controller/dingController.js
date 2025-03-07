import dingService from "../service/dingService.js";
import constCode from "../utils/ConstCode.js";

const dingController = {
  /**
   *
   * @param {import('express').Request} req 请求头对象
   * @param {import('express').Response} res 响应头对象
   */
  async jsSdAuthorized(req, res) {
    let ticket = req[constCode.DING_JSAPI_TICKET];
    let url = req.query.url;
    let signatureObj = dingService.sign(ticket, url);
    return {
      code: 200,
      signatureObj,
    };
  },
};

export default dingController;
