<script setup>
import { onMounted } from "vue"
import * as dingTalk from "dingtalk-jsapi"
import { closeDialog } from "vant";
const corpId = import.meta.env.VITE_APP_CORPID;
console.log(corpId);

/**
 * 关闭当前页面
 */
const handleClosePage = () => {
  try {
    dingTalk.biz.navigation.close({
    onSuccess: function (result) {
      /*result结构
      {}
      */
    },
    onFail: function (err) { }
  })
  } catch (error) {
    alert("error: handleClosePage不支持");
  }
};

/**
 * 分享页面
 * */
const handleShare = () => {
 try {
   dingTalk.biz.util.share({
  url: 'https://www.dingtalk.com',
  type: 0,
  image:
    'https://img.alicdn.com/imgextra/i1/O1CN01SNHEw41ysQFPN5Ql6_!!6000000006634-55-tps-176-31.svg',
  title: '钉钉官网',
  content: '钉钉官网',
  success: () => {},
  fail: () => {},
  complete: () => {},
});
 } catch (error) {
    alert("error: handleShare不支持");
 }
}

const handleChooseChat = () => {
  try {
    dingTalk.biz.chat.chooseConversationByCorpId({
  corpId: corpId,
  isAllowCreateGroup: true,
  filterNotOwnerGroup: true,
  success: (res) => {
    const { title, chatId, openConversationId } = res;
    console.log('title: ' + title);
  },
  fail: () => {},
  complete: () => {},
});
  } catch (error) {
    alert("error: handleChooseChat不支持");
  }
}

onMounted(() => { })
</script>

<template>
  <main>
    <van-button type="primary" @click="handleClosePage">handleClosePage</van-button>
    <van-button type="success" @click="handleShare">share</van-button>
    <van-button type="default" @click="handleChooseChat">chooseChat</van-button>
    <van-button type="danger">危险按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
  </main>
</template>
