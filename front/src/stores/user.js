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
    let res = await fetchDingUserInfo(code);
    console.log(res);
    if (code == 200) {
      let info = res.data;
      dingUserInfo.value = info.dingUserInfo;
      setToken(info.wuth_token);
      setDingUserInfo(info.dingUserInfo);
      return true;
    }
    return false;
  };
  const getDingUserInfo = () => {
    return dingUserInfo.value ? dingUserInfo.value : getUserInfo();
  };

  return {
    dingUserInfo,
    initDingUserInfo,
    getDingUserInfo,
  };
});
