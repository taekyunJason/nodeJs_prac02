//mongoose에서 프로젝트에 필요한 데이터의 형태와 규격 정의

const mongoose = require("mongoose");
const dataSchema = mongoose.Schema({
  menuName: {
    type: String,
    required: true,
  },
  menuName: {
    type: String,
    required: true,
  },
  menuName: {
    type: String,
    required: true,
  },
  menuName: {
    type: String,
    required: true,
  },
  menuName: {
    type: String,
    required: true,
  },
  menuName: {
    type: String,
    required: true,
  },
});

//모델이름 : nutrients, 스키마 : dataSchema
module.exports = mongoose.model("nutrients", dataSchema);
