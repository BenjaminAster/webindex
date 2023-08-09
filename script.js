
/// <reference types="better-typescript" />

export const storage = new class {
	#pathname = new URL(document.baseURI).pathname;
	get(/** @type {string} */ key) {
		try {
			return JSON.parse(localStorage.getItem(`${this.#pathname}:${key}`));
		} catch (error) {
			console.error(error);
			return null;
		}
	};
	set(/** @type {string} */ key, /** @type {any} */ value) {
		localStorage.setItem(`${this.#pathname}:${key}`, JSON.stringify(value));
	};
	remove(/** @type {string} */ key) {
		localStorage.removeItem(`${this.#pathname}:${key}`);
	};
};

{
	// color theme
	const button = document.querySelector("#theme-button");
	const mediaMatch = window.matchMedia("(prefers-color-scheme: light)");
	const themeInStorage = storage.get("color-theme") ?? "os-default";
	let currentTheme = ((themeInStorage === "os-default" && mediaMatch.matches) || themeInStorage === "light") ? "light" : "dark";

	const updateTheme = () => {
		document.documentElement.dataset.theme = currentTheme;
		// const themeColor = window.getComputedStyle(document.querySelector("c-header")).backgroundColor.trim();
		// document.querySelector("meta[name=theme-color]").content = themeColor;
	};
	updateTheme();

	button.addEventListener("click", async () => {
		currentTheme = currentTheme === "dark" ? "light" : "dark";
		storage.set("color-theme", ((currentTheme === "light") === mediaMatch.matches) ? "os-default" : currentTheme);
		updateTheme();
	});

	mediaMatch.addEventListener("change", ({ matches }) => {
		currentTheme = matches ? "light" : "dark";
		storage.set("color-theme", "os-default");
		updateTheme();
	});
}

let tab = document.documentElement.dataset.currentTab;

{
	// search
	const searchbox = document.querySelector("input#searchbox");

	searchbox.addEventListener("keydown", ({ key }) => {
		if (key === "Enter") {
			const search = searchbox.value.trim().toLowerCase();
			if (!search) return;
			if (tab === "specifications") document.querySelector("#toc").hidden = true;

			const mainList = document.querySelector("ul#main-list");
			$outerLoop: for (const categoryBlock of mainList.children) {
				if (categoryBlock.localName !== "li") continue $outerLoop;
				const list = categoryBlock.querySelector("ul");
				let categoryHasMatches = false;
				$innerLoop: for (const child of list.children) {
					if (child.localName !== "li") continue $innerLoop;
					const matches = child.dataset.searchableName?.includes(search);
					child.hidden = !matches;
					if (matches) {
						categoryHasMatches = true;
					}
				}
				categoryBlock.hidden = !categoryHasMatches;
			}
		}
	});

	searchbox.addEventListener("input", () => {
		if (searchbox.value.trim() === "") {
			for (const element of document.querySelectorAll(":is(#toc, ul#main-list > li, [data-searchable-name])[hidden]")) {
				element.hidden = false;
			}
		}
	});
}
