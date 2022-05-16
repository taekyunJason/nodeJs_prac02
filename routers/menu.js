const express = require("express");
const res = require("express/lib/response");
// const Item = require("../schemas/item");
const router = express.Router();

//전체 상품조회  (랜덤정렬필요)
// router.get("/main", async (req, res) => {
//   const item = await Item.find({});
//   return res.status(201).json(item);
// });

module.exports = router;
