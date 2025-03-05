import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

import config from "../datas/ding.config.json" with {type: "json"};
import exp from "constants";

const appKey = config.appKey;
const appSecret = config.appSecret;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// console.log(__filename, "\n", __dirname);

/**
 * 获取钉钉的 access_token
 */
export const getToken = async () => {
    let currentTime = Date.now();
    let accessTokenJSON = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../datas/token.json")));
    if (accessTokenJSON)
}