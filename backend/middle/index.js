import { getToken } from "../utils/getToken.js";
import { getTicket } from "../utils/getTicket.js";
import constCode from "../utils/ConstCode.js";

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
    req[constCode.DING_ACCESS_TOKEN] = token;
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
    if (!token) {
      return res.status(400).send("请先获取accessToken");
    } else {
      let ticket = await getTicket(token);
      req[constCode.DING_JSAPI_TICKET] = ticket;
      next();
    }
  } catch (error) {
    console.error("Error getting DingTalk jsapi ticket: ", error);
    return res.status(500).send("Fail to get DingTalk jsapi ticket");
  }
};
