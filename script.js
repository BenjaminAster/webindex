
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


let NEW_SOURCE = false;
// NEW_SOURCE = false; // toggle comment on/off

if (NEW_SOURCE) {
	const { specs: specsData } = await (await globalThis.fetch("./index/new/specs.json")).json();

	const mainList = document.querySelector("#main-list");
	const groupFragment = mainList.querySelector(":scope > template").content;

	const openLinksInNewTab = window.matchMedia("(any-hover: none)").matches;

	for (const { groupName, groupHomepage, identifier = "identifier", specs } of specsData) {
		const clone = groupFragment.cloneNode(true);
		clone.querySelector(".group-name").textContent = groupName;
		clone.querySelector("a.group-link").href = groupHomepage;
		clone.querySelector(".group-idenfifier").textContent = identifier;

		const specsList = clone.querySelector(".group-specs");
		const specFragment = specsList.querySelector(":scope > template").content;
		for (const { title: specName, url, repository } of specs) {
			const specClone = specFragment.cloneNode(true);
			specClone.querySelector(".spec-name").textContent = specName;
			const urlObject = new URL(url);
			specClone.querySelector(".spec-url").textContent = urlObject.host + urlObject.pathname.replace(/\/$/, "");
			specClone.querySelector("a.spec-link").href = url;
			if (openLinksInNewTab) specClone.querySelector("a.spec-link").target = "_blank";
			specClone.querySelector("a.repo-link").href = repository;
			specsList.append(specClone);
		}
		mainList.append(clone);
	}
} else {
	const { list: specsData } = await (await globalThis.fetch("./index/specs.json")).json();

	const mainList = document.querySelector("#main-list");
	const groupFragment = mainList.querySelector(":scope > template").content;

	const openLinksInNewTab = window.matchMedia("(any-hover: none)").matches;

	for (const { name, homepage, identifier, specs } of specsData) {
		const clone = groupFragment.cloneNode(true);
		clone.querySelector(".group-name").textContent = name;
		clone.querySelector("a.group-link").href = homepage;
		clone.querySelector(".group-idenfifier").textContent = identifier;

		const specsList = clone.querySelector(".group-specs");
		const specFragment = specsList.querySelector(":scope > template").content;
		for (const { name: specName, url, repoUrl } of specs) {
			const specClone = specFragment.cloneNode(true);
			specClone.querySelector(".spec-name").textContent = specName;
			const urlObject = new URL(url);
			specClone.querySelector(".spec-url").textContent = urlObject.host + urlObject.pathname.replace(/\/$/, "");
			specClone.querySelector("a.spec-link").href = url;
			if (openLinksInNewTab) specClone.querySelector("a.spec-link").target = "_blank";
			specClone.querySelector("a.repo-link").href = repoUrl;
			specsList.append(specClone);
		}
		mainList.append(clone);
	}
}

// $: {
// 	const searchBox = document.querySelector("input[type=search]#searchbox");

// 	if (!CSS.highlights) {
// 		throw new Error(String.raw`no CSS highlights, no search ¯\_(ツ)_/¯`);
// 	};

// 	searchBox.focus();

// 	window.addEventListener("keypress", () => {
// 		searchBox.focus();
// 	});

// 	const textNodes = (() => {
// 		const nodeArray = [];
// 		const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
// 		let /** @type {Node} */ node;
// 		while (node = treeWalker.nextNode()) if (node.textContent.trim()) nodeArray.push(node);
// 		return nodeArray;
// 	})();

// 	const highlight = new Highlight();
// 	CSS.highlights.set("search", highlight);

// 	searchBox.addEventListener("input", function () {
// 		highlight.clear();
// 		let /** @type {number} */ index;
// 		let firstMatch = true;
// 		const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
// 		let /** @type {Node} */ node;
// 		$nodeLoop: while (node = treeWalker.nextNode()) {
// 			if (!node.textContent.trim()) continue $nodeLoop;
// 			if ((index = node.textContent.toLowerCase().replaceAll(/[^\w]/g, " ").indexOf(this.value.toLowerCase().replaceAll(/[^\w]/g, " "))) >= 0) {
// 				const range = new Range();
// 				range.setStart(node, index);
// 				range.setEnd(node, index + this.value.length);
// 				highlight.add(range);
// 				if (firstMatch) HTMLElement.prototype.scrollIntoViewIfNeeded
// 					? node.parentElement.scrollIntoViewIfNeeded(true)
// 					: node.parentElement.scrollIntoView({ block: "center" });
// 				firstMatch = false;
// 			}
// 		}
// 	});
// }

export { };
