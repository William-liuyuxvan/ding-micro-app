import request from "@/utils/request";

const prefix = "http://192.168.56.1:3000/dingding";

/**
 * 获取钉钉用户信息
 * @param {String} code 授权code 
 * @returns 
 */
export const fetchDingUserInfo = async (code) => {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    url: `${prefix}/getUserInfo`,
    data: { code }
  });
}

/**
 * 获取钉钉jsSdkAuthorized授权信息
 * @param {String} url 调用dd.config的url
 * @returns 
 */
export const jsSdkAuthorized = async (url) => {
  // console.log("url:", url);
  // console.log(`${prefix}/jsSdkAuthorized`);
  return request({
    headers: {
      "Content-Type": "application/json",
    },
    method: "get",
    url: `${prefix}/jsSdkAuthorized`,
    params: {
      url
    }
  });
};
