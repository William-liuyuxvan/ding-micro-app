import { Router } from "express";
import { dingJsApiTicket } from "../middle/index.js";
import dingController from "../controller/dingController.js";

const router = Router();

router.get("/", (req, res) => {
  res.send({
    code: 200,
    data: "Hello, dingding!",
  });
});

// 获取钉钉用户信息

// jssdk鉴权的接口
router.get("/jsSdkAuthorized", dingJsApiTicket, dingController.jsSdAuthorized);

export default router;
