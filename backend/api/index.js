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
      appSecret,
    },
  });
};

export const getJsApiTicket = async (accessToken) => {
  return request({
    method: "post",
    url: `${prefix1}/v1.0/oauth2/jsapiTickets`,
    headers: {
      "x-acs-dingtalk-access-token": accessToken,
      "Content-Type": "application/json",
    },
    data: {},
  });
};
