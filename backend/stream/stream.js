import { DWClient } from "dingtalk-stream-sdk-nodejs"
import config from "../datas/ding.config.json" with {type: "json"}

export const initStream = () => {
    console.log('stream 接入成功');
    const client = new DWClient({
        clientId: config.AppKey,
        clientSecret: config.AppSecret,
    });

    /**
     * @type {import("dingtalk-stream-sdk-nodejs").DWClientDownStream}
     */
    const onEventReceived = (event) => {
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
          data: '{"timeStamp":1742030129210,"eventId":"9a0657fc5c084531bf699ab0044e2bb5","chatId":"chat8ad51493ce70a44b2c00138dfcf73d26","operatorUnionId":"BMJ94vlo5Cwm42T0znRLkwiEiE","title":"天秉义test","openConversationId":"cidDtn+wtv1GGxBrhT6WVZF9A==","operator":"01124618123120959450"}'
        }
        */
        console.log(event);

        const now = new Date();
        console.log(`received event, delay=${now.getTime() - parseInt(event.headers?.eventBornTime || '0')}ms`)
        if (event.headers?.eventType == 'chat_update_title') {
            // ignore events not equals `chat_update_title`; 忽略`chat_update_title`之外的其他事件；
            // 该示例仅演示 chat_update_title 类型的事件订阅；
            return { status: EventAck.SUCCESS };
        }
        client.send(event.headers.messageId, event.data);
        return { status: EventAck.SUCCESS, message: "ok" }; // message 属性可以是任意字符串
    }

    client.registerCallbackListener('/v1.0/im/bot/messages/get', async (res) => {
        // 注册机器人回调事件
        console.log("收到消息", res);
        const { messageId } = res.headers;
        const { text, senderStaffId, sessionWebhook } = JSON.parse(res.data);
    })
        .connect();

    client.registerAllEventListener(onEventReceived)
}
