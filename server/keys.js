const path = require('path');
const fs = require('fs');

const privateKey = fs.readFileSync(path.resolve(__dirname, '../test_key.key'), { encoding: 'utf-8' });
const publicKey = fs.readFileSync(path.resolve(__dirname, '../test_key.key.pub'), { encoding: 'utf-8' });

module.exports = {
  privateKey,
  publicKey,
};
