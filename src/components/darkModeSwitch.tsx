import React, { useState } from "react";
import { Form } from "react-bootstrap";

const DarkModeSwitch = () => {
	const storedTheme = localStorage.getItem("theme");

	const getPreferredTheme = () => {
		if (storedTheme) {
			return storedTheme === "dark";
		}
		return window.matchMedia("(prefers-color-scheme: dark)").matches ? true : false;
	};

	const [isDarkMode, setIsDarkMode] = useState<boolean>(getPreferredTheme());
	if (isDarkMode) {
		localStorage.setItem("theme", "dark");
		document.documentElement.setAttribute("data-bs-theme", "dark");
	} else {
		localStorage.setItem("theme", "light");
		document.documentElement.setAttribute("data-bs-theme", "light");
	}

	/* The code below is from the Bootstrap docs (https://getbootstrap.com/) */

	window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
		setIsDarkMode(getPreferredTheme());
	});

	/* The code above is from the Bootstrap docs (https://getbootstrap.com/) */

	return (
		<Form.Check
			type="switch"
			id="custom-switch"
			label="Dark Mode"
			checked={isDarkMode}
			onChange={({ target }) => setIsDarkMode(target.checked)}
			className="d-flex align-items-center ps-5"
			style={{ columnGap: 7 }}
		></Form.Check>
	);
};

export default DarkModeSwitch;
