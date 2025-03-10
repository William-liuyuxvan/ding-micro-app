import { Router } from "express";
import { dingJsApiTicket, dingToken } from "../middle/index.js";
import dingController from "../controller/dingController.js";

let router = Router();

router.get("/", (req, res) => {
  res.send({
    code: 200,
    data: "Hello, dingding!",
  });
});

// jssdk鉴权的接口
router.get("/jsSdkAuthorized", dingJsApiTicket, dingController.jsSdAuthorized);

// 获取钉钉用户信息


export default router;
