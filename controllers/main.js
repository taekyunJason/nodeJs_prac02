const Menu = require("../schemas/menu");

const search = async (req, res) => {
  let { keyword } = req.query;
  console.log(keyword);

  //검색어 없는 경우 예외처리
  if (!keyword.length) {
    return res.status(400).json("검색어를 입력해주세요.");
  }

  //검색어 입력시 타이틀에서 해당 검색어로 검색
  const searchChallenge = await Menu.find({
    menuName: { $regex: keyword },
  });

  //검색어와 일치하는 메뉴 없는 경우 예외처리
  if (searchChallenge.length === 0) {
    return res
      .status(401)
      .json({ message: "검색과 일치하는 메뉴가 없습니다." });
  }
  //   console.log("searchChallenge: ", searchChallenge);
  return res.status(201).json(searchChallenge);
};

module.exports = { search };
