const Menu = require("../schemas/menu");
const cryptoJS = require("crypto-js");

//메뉴 등록
const uploadMenu = async (req, res) => {
  const {
    menuName,
    menuIngredient,
    menuOnePerson,
    eatingNum,
    institution,
    distributeWay,
  } = req.body;

  const today = new Date();
  const date = today.toLocaleString();
  var hash = cryptoJS.SHA256(date);
  const menuId = hash["words"][0];

  const menu = new Menu({
    menuId,
    menuName,
    menuIngredient,
    menuOnePerson,
    eatingNum,
    institution,
    distributeWay,
  });
  await menu.save();

  res.status(201).send({
    result: "true",
    msg: "메뉴가 등록되었습니다.",
  });
};

module.exports = { uploadMenu };
