const webpackCommon = require('./webpack.common.config');

module.exports = {
  ...webpackCommon,
  mode: "production",
};