const Menu = require("../schemas/menu");

//메뉴 상세 페이지
const menuDetail = async (req, res) => {
  let { menuId } = req.query;
  console.log(menuId);

  //검색어 입력시 타이틀에서 해당 검색어로 검색
  //Menu컬렉션 안에 menuId 값을 찾아와 clickedMenu 배열 안에 넣어준다
  const clickedMenu = await Menu.find({ menuId: menuId }).exec();

  console.log(clickedMenu);

  return res.status(201).json(clickedMenu);
};

//메뉴 상세페이지 수정
const updateMenu = async (req, res) => {
  let { menuId } = req.query;
  let { menuName, ingredient, onePerson, eatingNum, institution } = req.body;
  console.log(menuId);

  if (!menuName) {
    const result = await Menu.findOne({ menuId });
    menuName = result.menuName;
  }
  if (!ingredient) {
    const result = await Menu.findOne({ menuId });
    ingredient = result.ingredient;
  }
  if (!onePerson) {
    const result = await Menu.findOne({ menuId });
    onePerson = result.onePerson;
  }
  if (!eatingNum) {
    const result = await Menu.findOne({ menuId });
    eatingNum = result.eatingNum;
  }
  if (!institution) {
    const result = await Menu.findOne({ menuId });
    institution = result.institution;
  }

  //검색어 입력시 타이틀에서 해당 검색어로 검색
  //Menu컬렉션 안에 menuId 값을 찾아와 clickedMenu 배열 안에 넣어준다
  const clickedMenu = await Menu.updateOne(
    { menuId: menuId },
    { menuName, ingredient, onePerson, eatingNum, institution }
  ).exec();

  console.log(clickedMenu);

  return res.status(201).json(clickedMenu);
};

module.exports = { menuDetail, updateMenu };
