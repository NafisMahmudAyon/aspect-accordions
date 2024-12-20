const path = require("path");

module.exports = {
	entry: "./assets/js/render-accordion.js", // Entry point
	output: {
		path: path.resolve(__dirname, "assets/js"), // Output directory
		filename: "render-accordion.bundle.js", // Output file
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
					},
				},
			},
		],
	},
	mode: "production",
};
