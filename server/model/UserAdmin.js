const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    select: false, // 不返回 空保存不覆盖
    set(val) {
      return bcrypt.hashSync(val, 10);
    },
  },
});

module.exports = mongoose.model('UserAdmin', schema);
