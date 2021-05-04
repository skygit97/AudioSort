const path = require("path");

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "dist", "assets"),
		filename: "main.js",
	},
	devtool: "source-map",
	resolve: {
		extensions: [".js", ".jsx", "*"],
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/env", "@babel/react"],
					},
				},
			},
		],
	},
};
