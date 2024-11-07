import { app, BrowserWindow } from "electron";
import { join } from "node:path";

app.whenReady().then(main);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

function createWindow() {
	const window = new BrowserWindow({
		width: 800,
		height: 600,
	});

	window.loadFile(join(process.cwd(), "index.html"));
}

function main() {
	createWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
}
