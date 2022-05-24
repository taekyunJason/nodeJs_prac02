const Menu = require("../schemas/menu");

const menuDetail = async (req, res) => {
  let { menuId } = req.query;
  console.log(menuId);

  //검색어 입력시 타이틀에서 해당 검색어로 검색
  //Menu컬렉션 안에 menuId 값을 찾아와 clickedMenu 배열 안에 넣어준다
  const clickedMenu = await Menu.find({ menuId: menuId }).exec();

  console.log(clickedMenu);

  return res.status(201).json(clickedMenu);
};

module.exports = { menuDetail };
