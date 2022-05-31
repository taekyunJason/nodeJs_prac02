const Menu = require("../schemas/menu");

//키워드 검색하기
const search = async (req, res) => {
  let { keyword } = req.query;
  console.log(keyword);

  //검색어 없는 경우 예외처리
  if (!keyword.length) {
    return res.status(400).json("검색어를 입력해주세요.");
  }

  //검색어 입력시 타이틀에서 해당 검색어로 검색
  const searchMenu = await Menu.find({
    //특정 단어가 포함된 데이터 검색
    menuName: { $regex: keyword },
  });

  console.log(searchMenu);

  //검색어와 일치하는 메뉴 없는 경우 예외처리.
  if (searchMenu.length === 0) {
    return res.status(401).json({
      errorMessage: "검색어가 포함된 메뉴가 없습니다 🥲\n 다시 검색해주세요 🤓",
    });
  }
  //   console.log("searchChallenge: ", searchChallenge);
  return res.status(201).json(searchMenu);
};

module.exports = { search };
