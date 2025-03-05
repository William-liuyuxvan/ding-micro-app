import { request } from "../utils/request";

const prefix1 = "https://api.dingtalk.com";

export const getAccessToken = async (appKey, appSecret) => {
  return request({
    method: "post",
    url: `${prefix1}/v1.0/oauth2/accessToken`,
    data: {
      appKey,
      appSecret,
    },
  });
};
