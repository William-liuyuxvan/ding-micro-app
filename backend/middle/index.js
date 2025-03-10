import { getToken } from "../utils/getToken.js";
import { getTicket } from "../utils/getTicket.js";
import ConstCode from "../utils/ConstCode.js";

/**
 *
 * @param {import('express').Request} req 请求头对象
 * @param {import('express').Response} res 响应头对象
 * @param {import('express').NextFunction} next 放行函数
 * @returns
 */
export const dingToken = async (req, res, next) => {
  try {
    let token = await getToken();
    req[ConstCode.DING_ACCESS_TOKEN] = token;
    console.log(req[ConstCode.DING_ACCESS_TOKEN]);
    next();
  } catch (error) {
    console.error("Error getting DingTalk access token: ", error);
    return res.status(500).send("Fail to get DingTalk access token");
  }
};

/**
 *
 * @param {import('express').Request} req 请求头对象
 * @param {import('express').Response} res 响应头对象
 * @param {import('express').NextFunction} next 放行函数
 */
export const dingJsApiTicket = async (req, res, next) => {
  try {
    let token = await getToken();
    console.log(token);
    if (!token) {
      return res.status(400).send("请先获取accessToken");
    } else {
      let ticket = await getTicket(token);
      req[ConstCode.DING_ACCESS_TICKET] = ticket;
      console.log(req[ConstCode.DING_ACCESS_TICKET]);
      next();
    }
  } catch (error) {
    console.error("Error getting DingTalk jsapi ticket: ", error);
    return res.status(500).send("Fail to get DingTalk jsapi ticket");
  }
};
