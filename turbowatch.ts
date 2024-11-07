import { defineConfig } from "turbowatch/src";
import { cwd } from "node:process";

export default defineConfig({
	project: cwd(),
	triggers: [
		{
			expression: ["match", "*.tsx?", "basename"],
			name: "build",
			onChange: async ({ spawn }) => {
				console.clear();
				console.log("Changes detected", new Date().toTimeString());

				console.time("build");
				await spawn`bun run build`;
				console.timeEnd("build");

				// await spawn`bun run start`;
			},
		},
	],
});
