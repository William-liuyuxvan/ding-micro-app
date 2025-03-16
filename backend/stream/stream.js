import { DWClient, EventAck } from "dingtalk-stream-sdk-nodejs"
import config from "../datas/ding.config.json" with {type: "json"}
import https from "https"
import { getToken } from "../utils/getToken.js";
import axios from 'axios'

export const initStream = () => {
    console.log('stream 接入成功');
    const client = new DWClient({
        clientId: config.AppKey,
        clientSecret: config.AppSecret,
    });

    /**
     * @type {import("dingtalk-stream-sdk-nodejs").DWClientDownStream}
     */
    const onEventReceived = async (event) => {
        /*
        {
          specVersion: '1.0',
          type: 'EVENT',
          headers: {
            appId: 'b0a83318-acfd-4d14-b2fc-c6ad2f23637e',
            connectionId: '01fdea8c-017e-11f0-80d8-fe6ee1009283',
            contentType: 'application/json',
            eventBornTime: '1742030129211',
            eventCorpId: 'dinga259e545c8aeabaaacaaa37764f94726',
            eventId: '9a0657fc5c084531bf699ab0044e2bb5',
            eventType: 'chat_update_title',
            eventUnifiedAppId: 'b0a83318-acfd-4d14-b2fc-c6ad2f23637e',
            messageId: 'bbb2151_14e3_1958aa63d9b_7800ca',
            time: '1742030129351',
            topic: '*'
          },
          data: {
            "timeStamp":1742030129210,
            "eventId":"9a0657fc5c084531bf699ab0044e2bb5",
            "chatId":"chat8ad51493ce70a44b2c00138dfcf73d26",
            "operatorUnionId":"BMJ94vlo5Cwm42T0znRLkwiEiE",
            "title":"天秉义test",
            "openConversationId":"cidDtn+wtv1GGxBrhT6WVZF9A==",
            "operator":"01124618123120959450"
          }
        }
        */
        console.log(event);

        const now = new Date();
        console.log(`received event, delay=${now.getTime() - parseInt(event.headers?.eventBornTime || '0')}ms`)
        if (event.headers?.eventType == 'chat_update_title') {
            // ignore events not equals `chat_update_title`; 忽略`chat_update_title`之外的其他事件；
            // 该示例仅演示 chat_update_title 类型的事件订阅；
            // let token = await getToken();
            console.log();
            let { openConversationId } = JSON.parse(event.data);
            let robotCode = "dingcynbkx8fj5omurg4";
            let token = await getToken();

            let res = await axios({
                headers: {
                    'Content-Type': 'application/json',
                    "x-acs-dingtalk-access-token": token
                },
                method: 'post',
                url: `https://api.dingtalk.com/v1.0/robot/groupMessages/send`,
                data: {
                    "msgParam": JSON.stringify({ content: "你好呀" }),
                    "msgKey": "sampleText",
                    "openConversationId": openConversationId,
                    "robotCode": robotCode,
                }
            });
            console.log("axios.res: ", res);

            client.send(event.headers.messageId, { status: EventAck.SUCCESS });
            return { status: EventAck.SUCCESS };
        }

        return { status: EventAck.SUCCESS, message: "ok" }; // message 属性可以是任意字符串
    }

    client.registerCallbackListener('/v1.0/im/bot/messages/get', async (res) => {
        // 注册机器人回调事件
        /* 当你@机器人发送“你好”，服务端 res 接收消息格式如下：
        {
            specVersion: '1.0',
            type: 'CALLBACK',
            headers: {
                appId: 'b0a83318-acfd-4d14-b2fc-c6ad2f23637e',
                connectionId: '601fca83-0213-11f0-a3bc-2283bad79338',
                contentType: 'application/json',
                messageId: '21660eee_11c0_1956e7a6274_174c910',
                time: '1742094274945',
                topic: '/v1.0/im/bot/messages/get'
            },
            data: {
                "senderPlatform":"Win",
                "conversationId":"cidDtn+wtv1GGxBrhT6WVZF9A==",
                "atUsers":[{"dingtalkId":"$:LWCP_v1:$S0VnqLeXKqQEJ9T4jvKYXFzwF4L6g1FN"}],
                "chatbotCorpId":"{chatbotCorpId}",
                "chatbotUserId":"{chatbotUserId}",
                "msgId":"msg1U0rEvGa0pElynCn2mNxUQ==",
                "senderNick":"{发送人员}",
                "isAdmin":true,
                "senderStaffId":"{senderStaffId}",
                "sessionWebhookExpiredTime":1742099674872,
                "createAt":1742094274554,
                "senderCorpId":"{senderCorpId}",
                "conversationType":"2",
                "senderId":"{senderId}",
                "conversationTitle":"天秉义test",
                "isInAtList":true,
                "sessionWebhook":"{sessionWebhook}",
                "text":{
                    "content":" asdf "
                },
                "robotCode":"{robotCode}",
                "msgtype":"text"
        }
         */
        console.log("收到消息", res);
        const { messageId } = res.headers;
        const { text, senderStaffId, sessionWebhook } = JSON.parse(res.data);

        const data = JSON.stringify({
            'msgtype': 'text',
            'text': {
                'content': '我是一段回复文字' + `${senderStaffId}`,
            },
            'at': {
                'atUserIds': [senderStaffId]
            }
        })
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const req = https.request(sessionWebhook, options, (res) => {
            console.log(`状态码：${res.statusCode}`);
            res.on('data', (d) => {
                console.log('data: ' + d);
            })
        });
        req.on('error', (error) => {
            console.error("error: ", error);
        });
        req.write(data);
        req.end();

        client.send(res.headers.messageId, res.data);
        return { status: EventAck.SUCCESS, message: "ok" }; // message 属性可以是任意字符串
    })
        .connect();

    client.registerAllEventListener(onEventReceived)
}
