import request from "../utils/request.js";

const prefix1 = "https://api.dingtalk.com";
const prefix2 = "https://oapi.dingtalk.com";

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
  console.log("token:", token);
  return request({
    headers: {
      "Content-Type": "application/json",
      "x-acs-dingtalk-access-token": token
    },
    method: "post",
    url: `${prefix1}/v1.0/oauth2/jsapiTickets`,
    data: {}
  });
}

/**
 * 获取用户信息
 * @param {*} token
 * @param {*} code
 * @returns
 */
export const getDingUserInfo = async (access_token, code) => {
  return request({
    method: "post",
    url: `${prefix2}/topapi/v2/user/getuserinfo`,
    params: {
      access_token
    },
    data: {
      code
    }
  })
}

