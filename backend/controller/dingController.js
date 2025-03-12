import dingService from "../service/dingService.js";
import ConstCode from "../utils/ConstCode.js";
import { signToken } from "../utils/auth.js"

const dingController = {
  /**
   * 钉钉jssdk鉴权接口
   * @param {import('express').Request} req 请求头对象
   * @param {import('express').Response} res 响应头对象
   */
  async jsSdAuthorized(req, res) {
    // console.log("dingController.jsSdAuthorized(req, res)");
    let ticket = req[ConstCode.DING_ACCESS_TICKET];
    let url = req.query.url;
    let signatureObj = dingService.sign(ticket, url);
    // console.log("signatureObj: ", signatureObj);
    res.send({
      code: 200,
      signatureObj
    });
  },

  /**
   * 获取用户信息
   * @param {import('express').Request} req 请求头对象
   * @param {import('express').Response} res 响应头对象
   */
  async getUserInfo(req, res) {
    let { code } = req.body;
    // console.log("/backend/controller/dingController.js/getUserInfo");
    let token = req[ConstCode.DING_ACCESS_TOKEN];
    try {
      let dingUserInfo = await dingService.getDingUserInfo(token, code);
      console.log("dingUserInfo: ", dingUserInfo);
      res.send({
        code: 200,
        data: {
          dingUserInfo,
          // 自己的token签名
          auth_token: signToken()
        }
      })
    } catch (error) {
      res.send({
        code: 500,
        message: error.message
      })
    }
  }
};

export default dingController;
