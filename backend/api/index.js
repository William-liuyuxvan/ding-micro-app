import request from "../utils/request.js";

const prefix1 = "https://api.dingtalk.com";

/**
 *
 * @param {string} appKey
 * @param {string} appSecret
 * @returns
 */
export const getAccessToken = async (appKey, appSecret) => {
  console.log("appKey:", appKey);
  return request({
    method: "post",
    url: `${prefix1}/v1.0/oauth2/accessToken`,
    data: {
      appKey,
      appSecret
    }
  });
};

/**
 * 获取jsapiTicket
 * @param {*} accessToken 
 * @returns 
 */
export const jsapiTicket = async (token) => {
  return request({
    headers: {
      "Content-Type": "application/json",
      "x-acs-dingtalk-access-token": token
    },
    method: "post",
    url: `${prefix1}/v1.0/oauth2/jsapiTickets`,
    data: {}
  });
};
