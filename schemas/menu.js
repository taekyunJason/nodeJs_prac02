//mongoose에서 프로젝트에 필요한 데이터의 형태와 규격 정의

const mongoose = require("mongoose");
const MenuSchema = mongoose.Schema({
  menuName: {
    type: String,
  },
  menuId: {
    type: String,
    unique: true,
  },
  institution: {
    type: String,
  },
  menuIngredient: {
    type: Array,
    default: [],
  },
  menuOnePerson: {
    type: Array,
    default: [],
  },
  eatingNum: {
    type: String,
  },
});

//모델이름 : nutrients, 스키마 : MenuSchema
module.exports = mongoose.model("Nutrients", MenuSchema);
