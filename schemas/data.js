//mongoose에서 프로젝트에 필요한 데이터의 형태와 규격 정의

const mongoose = require("mongoose");
const dataSchema = mongoose.Schema({
  menuName: {
    type: String,
    required: true,
  },
  menuId: {
    type: String,
    unique: true,
  },
  institution: {
    type: String,
  },
  ingredient: {
    type: String,
    required: true,
  },
  onePerson: {
    type: String,
    required: true,
  },
  eatingNum: {
    type: String,
    required: true,
  },
});

//모델이름 : nutrients, 스키마 : dataSchema
module.exports = mongoose.model("Nutrients", dataSchema);
