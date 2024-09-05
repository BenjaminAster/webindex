
// @ts-check

/// <reference types="better-typescript" />

export const storage = new class {
	#pathname = new URL("./", document.baseURI).pathname;
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
		const themeColor = window.getComputedStyle(document.documentElement).backgroundColor.trim();
		document.querySelector("meta[name=theme-color]").content = themeColor;
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

	const search = async (/** @type {string} */ query) => {
		if (tab === "specifications") document.querySelector("#toc").hidden = true;

		let visitNextDirectMatch = false;
		if (query.endsWith("!")) {
			query = query.slice(0, -1);
			visitNextDirectMatch = true;
		}

		const mainList = document.querySelector("ul#main-list");
		$outerLoop: for (const categoryBlock of mainList.children) {
			if (categoryBlock.localName !== "li") continue $outerLoop;
			const list = categoryBlock.querySelector("ul");
			let categoryHasMatches = false;
			$innerLoop: for (const child of list.children) {
				if (child.localName !== "li") continue $innerLoop;
				const matches = child.dataset.searchableName?.includes(query);
				child.hidden = !matches;
				if (matches) {
					categoryHasMatches = true;
					if (visitNextDirectMatch) {
						const anchor = child.querySelector("a[data-unique-name]");
						if (anchor?.dataset.uniqueName === query) {
							location.replace(anchor.href);
							visitNextDirectMatch = false;
						}
					}
				}
			}
			categoryBlock.hidden = !categoryHasMatches;
			await new Promise(resolve => setTimeout(resolve));
		}
	}

	searchbox.addEventListener("keydown", ({ key }) => {
		if (key === "Enter") {
			const query = searchbox.value.trim().toLowerCase();
			if (!query) return;
			search(query)
		}
	});

	{
		const clearSeachbox = () => {
			for (const element of document.querySelectorAll(":is(#toc, ul#main-list > li, [data-searchable-name])[hidden]")) {
				element.hidden = false;
			}
		};

		searchbox.addEventListener("input", () => {
			if (searchbox.value.trim() === "") {
				clearSeachbox();
			}
		});

		document.querySelector("#clear-searchbox").addEventListener("click", () => {
			searchbox.value = "";
			clearSeachbox();
			searchbox.focus();
		});

		if (tab === "css") {
			document.querySelector("main").addEventListener("click", ({ target }) => {
				if (/** @type {HTMLElement} */ (target).localName === "a") {
					clearSeachbox();
				}
			});
		}
	}

	{
		const params = new URLSearchParams(location.search);
		{
			const query = params.get("q")?.trim().toLowerCase();
			if (query) {
				searchbox.value = query;
				search(query);
			}
		}
	}
}
