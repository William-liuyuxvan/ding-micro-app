import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

import config from "../datas/ding.config.json" with {type: "json"};
import { getAccessToken } from "../api/index.js";

const appKey = config.AppKey;
const appSecret = config.AppSecret;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// console.log(__filename, "\n", __dirname);

/**
 * 获取钉钉的 access_token
 */
export const getToken = async () => {
    let currentTime = Date.now();
    let accessTokenJSON = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../datas/token.json")));
    // console.log('前面；', accessTokenJSON);
    if (accessTokenJSON.accessToken == "" || accessTokenJSON.expireIn < currentTime) {
        // 过期了，需要获取新的accessToken
        console.log("过期了，需要获取新的accessToken");
        let data = await getAccessToken(appKey, appSecret);
        accessTokenJSON.accessToken = data.accessToken; 
        accessTokenJSON.expireIn = currentTime + (data.expireIn - 300) * 1000; // 1:55,提前五分钟重新获取accessToken
        fs.writeFileSync(path.resolve(__dirname, "../datas/token.json"), JSON.stringify(accessTokenJSON));
        return accessTokenJSON.accessToken;
    } else {
        // 没有过期
        console.log("没有过期");
        return accessTokenJSON.accessToken;
    }
}
