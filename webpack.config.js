const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");
const webpack = require("webpack");

/**
 * Create an absolute URL to the given URI inside the current directory
 * @param {string} [uri = ""] - The URI to the desired file
 * @returns {string}
 */
const here = (uri = "") => path.resolve(__dirname, uri);

const ignoredImports = new Set(["@prisma/client"]);

module.exports = {
	mode: "production",
	target: "node",
	resolve: {
		extensions: ["ts", "js"].map(ext => `.${ext}`),
	},
	externals: [
		webpackNodeExternals(),
	],
	entry: {
		"cs-isr": here("src/server/index.js"),
		"cs-isr-client": here("src/client/index.js"),
	},
	output: {
		filename: "[name].js",
		path: here("dist"),
	},
	node: {
		__dirname: false,
	},
	plugins: [
		new webpack.IgnorePlugin({
			checkResource(resource) {
				if (!ignoredImports.has(resource)) {
					return false;
				}

				try {
					require.resolve(resource);
				} catch(err) {
					return true;
				}

				return false;
			},
		}),
	],
	module: {
		rules: [
			{
				test: /(?!\.d)?\.ts$/i,
				use: "ts-loader",
				include: here("src"),
				exclude: [
					here("node_modules"),
				],
			}
		],
	},
};
