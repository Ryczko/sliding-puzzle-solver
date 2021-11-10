const webpackCommon = require('./webpack.common.config');
const path = require('path');

module.exports = {
    ...webpackCommon,
    devtool: 'inline-source-map',
    mode: 'development',
    watch: true,
    devServer: {
        contentBase: path.join(__dirname, 'dist')
    }
};
