import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { fetchDingUserInfo } from "@/api";
import {
  setDingUserInfo,
  getDingUserInfo as getUserInfo,
  setToken,
} from "@/utils/auth";

export const useUserStore = defineStore("user", () => {
  const dingUserInfo = ref(null);
  const initDingUserInfo = async (code) => {
    // console.log("const initDingUserInfo = async(code)");
    let res = await fetchDingUserInfo(code);
    console.log(res);
    console.log("获取到了用户信息");
    if (res.code == 200) {
      let info = res.data;
      console.log(info);
      dingUserInfo.value = info.dingUserInfo;
      console.log("info.auth_token: ", info.auth_token);
      setToken(info.auth_token);
      setDingUserInfo(info.dingUserInfo);
      return true;
    }
    return false;
  };
  const getDingUserInfo = () => {
    if (dingUserInfo.value) console.log(dingUserInfo.value);
    return dingUserInfo.value ? dingUserInfo.value : getUserInfo();
  };

  return {
    dingUserInfo,
    initDingUserInfo,
    getDingUserInfo,
  };
});
