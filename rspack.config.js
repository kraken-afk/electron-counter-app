// @ts-check
import { join } from "node:path";
import { cwd } from "node:process";
import { defineConfig } from "@rspack/cli";
import rspack from "@rspack/core";

export default defineConfig({
	mode: "development",
	entry: {
		main: join(cwd(), "src/main.ts"),
		root: join(cwd(), "src/root.tsx"),
	},
	target: ["es2022", "node"],
	output: { path: join(cwd(), "target/"), filename: "[name].cjs", clean: true },
	node: {
		global: true,
	},
	externals: {
		electron: 'require("electron")',
	},
	resolve: {
		extensions: [".tsx", ".ts"],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: [/node_modules/],
				loader: "builtin:swc-loader",
				options: {
					jsc: {
						parser: {
							syntax: "typescript",
							tsx: true,
							importMeta: true,
						},
						transform: {
							react: {
								runtime: "automatic",
							},
						},
					},
				},
				type: "javascript/auto",
			},
			{
				test: /\.css$/,
				use: [
					rspack.CssExtractRspackPlugin.loader,
					{
						loader: "css-loader",
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: {
									tailwindcss: {},
									autoprefixer: {},
								},
							},
						},
					},
				],
				type: "javascript/auto",
			},
		],
	},
	plugins: [
		new rspack.CssExtractRspackPlugin({
			filename: "main.css",
		}),
	],
	experiments: {
		css: true,
	},
});
