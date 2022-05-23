const Menu = require("../schemas/menu");

const menuDetail = async (req, res) => {
  let { keyword } = req.query;
  console.log(keyword);

  //검색어 입력시 타이틀에서 해당 검색어로 검색
  const menuDetail = await Menu.find({
    //특정 단어가 포함된 데이터 검색
    menuId: { $regex: keyword },
  });

  res.status(201).send({
    result: "true",
    msg: "클릭한 메뉴 정보를 가져왔습니다.",
  });
};

module.exports = { menuDetail };
