
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

export { };
