const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

require('dotenv').config();
const PORT = Number(process.env.PORT) || 5000;

module.exports = {
	mode: 'development',
	context: path.resolve(__dirname, '..'),

	devtool: 'cheap-module-source-map',
	devServer: {
		static: {
			directory: path.join('build')
		},
		port: PORT,
		hot: true,
		open: true
	},

	plugins: [new ReactRefreshWebpackPlugin()]
};
