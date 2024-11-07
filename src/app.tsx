import { useState } from "react";
import "./app.css";
import { Button } from "./components/button";

export function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="w-full h-dvh flex items-center justify-center flex-col gap-4">
			<h1 className="text-3xl">Hello from ⚛️ </h1>
			<div className="flex items-center gap-4">
				<Button type="button" onClick={() => setCount((prev) => prev + 1)}>
					Add 1
				</Button>
				<span className="text-lg">{count}</span>
			</div>
		</div>
	);
}
