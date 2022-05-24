const Menu = require("../schemas/menu");

const menuDetail = async (req, res) => {
  let { menuId } = req.query;
  console.log(menuId);

  //검색어 입력시 타이틀에서 해당 검색어로 검색
  const clickedMenu = await Menu.find({
    menuId: /menuId/,
  });

  console.log(clickedMenu);

  return res.status(201).json(clickedMenu);
};

module.exports = { menuDetail };
