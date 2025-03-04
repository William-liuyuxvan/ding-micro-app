import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send({
    code: 200,
    data: "Hello, dingding!",
  });
});

export default router;
