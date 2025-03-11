import request from "@/utils/request";

const prefix1 = "http://192.168.56.1:3000/dingding";

export const fetchDingUserInfo = async () => { };

export const jsSdkAuthorized = async (url) => {
  console.log("url:", url);
  // console.log(`${prefix}/jsSdkAuthorized`);
  return request({
    headers: {
      "Content-Type": "application/json",
    },
    method: "get",
    url: `${prefix1}/jsSdkAuthorized`,
    params: {
      url
    }
  });
};
