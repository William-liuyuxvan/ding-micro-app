import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
// 只读，不修改
import { getJsApiTicket } from "../api/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// console.log(__filename, "\n", __dirname);

/**
 * 获取钉钉的 jsapi_ticket
 * @param {string} token
 * @returns
 */
export const getTicket = async (token) => {
  let currentTime = Date.now();
  let accessTicketJSON = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../datas/ticket.json"))
  );
  if (
    accessTicketJSON.jsapiTicket == "" ||
    accessTicketJSON.expireIn < currentTime
  ) {
    // 过期了，需要获取新的jsapi_ticket
    console.log("过期了，需要获取新的jsapi_ticket");
    let data = await getJsApiTicket(token);
    accessTicketJSON.jsapiTicket = data.jsapiTicket;
    accessTicketJSON.expireIn = currentTime + (data.expireIn - 300) * 1000; // 1:55,提前五分钟重新获取 ticket
    fs.writeFileSync(
      path.resolve(__dirname, "../datas/ticket.json"),
      JSON.stringify(accessTicketJSON)
    );
    return accessTicketJSON.jsapiTicket;
  } else {
    // 没有过期
    console.log("没有过期");
    return accessTicketJSON.jsapiTicket;
  }
};
