const path = require("path");

module.exports = {
	entry: "./shortcode.js", // Entry point
	output: {
		path: path.resolve(__dirname, "build"), // Output directory
		filename: "shortcode.bundle.js", // Output file
	},
	resolve: {
		extensions: [".js", ".jsx"],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
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
