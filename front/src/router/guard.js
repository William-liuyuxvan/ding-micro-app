import * as dingtalk from 'dingtalk-jsapi';
import router from './index';
import { useUserStore } from '@/stores/user';
import { jsSdkAuthorized } from '@/api/index'

let whiteList = ["/warning", "/404", "/405"];
const initEventListener = () => {
  // 网络连接成功的事件监听
  document.addEventListener('online', function (e) {
    e.preventDefault();
    console.log('事件：online')
  }, false);

  // 网络连接断开的事件监听
  document.addEventListener('offline', function (e) {
    e.preventDefault();
    console.log('事件：offline')
  }, false);
}

router.beforeEach(async (to, from) => {
  const userStore = useUserStore();
  showLoadingToast({
    message: '加载中...',
    duration: 0, // 设置 duration 为 0 以保持显示，直到手动关闭
    forbidClick: true // 禁止点击
  });
  document.title = to.meta.title || import.meta.VITE_APP_TITLE;

  if (whiteList.includes(to.path)) {
    // 确保在这里关闭 loading
    closeToast()
    return
  }
  if (dingtalk.env.platform == "notInDingTalk") {
    closeToast()
    return { name: "warning" }
  } else {
    console.log(location.href.split('#')[0]);
    let res = await jsSdkAuthorized(location.href.split('#')[0]);
    console.log(res);
    if (res.code == 200) {
      let { agentId, corpId, timeStamp, nonceStr, signature } = res.signatureObj;
      dingtalk.config({
        agentId, // 必填，微应用ID
        corpId, //必填，企业ID
        timeStamp, // 必填，生成签名的时间戳
        nonceStr, // 必填，自定义固定字符串。
        signature, // 必填，签名
        type: 0, //选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
        jsApiList: ['chooseChat', 'biz.chat.chooseConversationByCorpId', 'share', 'chooseChat', 'chooseImage', 'biz.util.chooseImage', 'share'] // 必填，需要使用的jsapi列表，注意：不要带dd。
      });

      dingtalk.error(async (err) => {
        console.log(err, 'err')
        closeToast()
        await showDialog({
          title: '标题',
          message: 'dd error: ' + JSON.stringify(err),
          zIndex: 2000,
        });
      }); //该方法必须带上，用来捕获鉴权出现的异常信息，否则不方便排查出现的问题

      dingtalk.ready(async () => {
        console.log('授权成功！');
      })
    }
  }
})
router.afterEach(() => {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
})