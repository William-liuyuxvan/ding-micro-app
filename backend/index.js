import express from "express";
import cors from "cors";
import { getLocalIP } from "./utils/redrun.js";
import famous_words from "./datas/famous_words.json" with { type: "json" };
import dingdingRouter from "./router/dingding.js";
import { initStream } from "./stream/stream.js";


const port = 3000;

const app = express();

initStream(); // 初始化stream

app.use(cors()); //跨域
app.use(express.json()); //解析json
app.use(express.urlencoded({ extended: true })); //解析urlencoded
app.use(express.static('public')); //静态文件
app.use("/dingding", dingdingRouter); //路由

app.listen(port, () => {
  const words = famous_words[Math.floor(Math.random() * famous_words.length)];
  console.log(`running：http://${getLocalIP()}:${port}`);
  console.log(`${words}`);
});
