import dingService from "../service/dingService.js";
import ConstCode from "../utils/ConstCode.js";

const dingController = {
  /**
   *
   * @param {import('express').Request} req 请求头对象
   * @param {import('express').Response} res 响应头对象
   */
  async jsSdAuthorized(req, res) {
    console.log("dingController.jsSdAuthorized(req, res)");
    let ticket = req[ConstCode.DING_ACCESS_TICKET];
    let url = req.query.url;
    let signatureObj = dingService.sign(ticket, url);
    console.log("signatureObj: ", signatureObj);
    console.log("这里已经返回了，但是前端还是没有收到数据");
    res.send({
      code: 200,
      signatureObj
    });
  }
};

export default dingController;
