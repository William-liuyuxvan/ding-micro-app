import request from "@/utils/request";

const prefix = "http://192.168.56.1:5173/dingding";

export const fetchDingUserInfo = async () => { };

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
