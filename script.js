
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

const tocList = document.querySelector("#toc-list");
const tocFragment = tocList.querySelector(":scope > template").content;
const mainList = document.querySelector("#main-list");
const groupFragment = mainList.querySelector(":scope > template#specifications-template").content;
const cssFragment = mainList.querySelector(":scope > template#css-template").content;
const javaScriptFragment = mainList.querySelector(":scope > template#javascript-template").content;
let currentTab = "specifications";

const openLinksInNewTab = window.matchMedia("(any-hover: none)").matches;

document.querySelector("#tabs").addEventListener("change", ({ target }) => {
	currentTab = target.value;
	for (const child of [...mainList.children, ...tocList.children]) {
		if (child.localName !== "template") child.remove();
	}

	console.log("change")
	$switch: switch (currentTab) {
		case ("specifications"): {
			renderSpecs();
			break $switch;
		} case ("css"): {
			renderCSS();
			break $switch;
		} case ("javascript"): {
			renderJavaScript();
			break $switch;
		}
	}
});

const nameToId = (/** @type {string} */ name) => name.toLowerCase().replaceAll(/\W+/g, "-");

const { specs: specsData } = await (await globalThis.fetch("./index/specs.json")).json();

const renderSpecs = () => {
	for (const { groupName, groupHomepage, groupIdentifier, specs } of specsData) {
		const groupLinkId = nameToId(groupName);

		{
			const clone = tocFragment.cloneNode(true);
			clone.querySelector(".link-to-list").textContent = groupName;
			clone.querySelector(".link-to-list").href = "#" + groupLinkId;
			tocList.append(clone);
		}

		const clone = groupFragment.cloneNode(true);
		clone.querySelector(".group-name").textContent = groupName;
		clone.querySelector(".header h3").id = groupLinkId;
		clone.querySelector("a.group-link").href = groupHomepage;
		clone.querySelector(".group-idenfifier").textContent = groupIdentifier;

		const specsList = clone.querySelector(".group-specs");
		const specFragment = specsList.querySelector(":scope > template").content;
		for (const { title, url, repo, tests } of specs) {
			const specClone = specFragment.cloneNode(true);
			specClone.querySelector(".spec-name").textContent = title;
			const urlObject = new URL(url);
			specClone.querySelector(".spec-url").textContent = urlObject.host + urlObject.pathname.replace(/\/$/, "");
			specClone.querySelector("a.spec-link").href = url;
			if (openLinksInNewTab) specClone.querySelector("a.spec-link").target = "_blank";
			if (repo) {
				specClone.querySelector("a.repo-link").href = repo;
			} else {
				// specClone.querySelector("a.repo-link").style.visibility = "hidden";
				specClone.querySelector("a.repo-link").classList.add("disabled");
				specClone.querySelector("a.repo-link").inert = true;
			}
			if (tests) {
				specClone.querySelector("a.tests-link").href = tests;
			} else {
				// specClone.querySelector("a.tests-link").style.visibility = "hidden";
				specClone.querySelector("a.tests-link").classList.add("disabled");
				specClone.querySelector("a.tests-link").inert = true;
			}
			specsList.append(specClone);
		}
		mainList.append(clone);
	}
};

renderSpecs();

const {
	cssProperties,
	cssTypes,
	cssAtRules,
	cssFunctions,
	cssSelectors,
	cssPseudoClasses,
	cssPseudoElements,
	cssDescriptors,
	cssUnits,
} = await (await window.fetch("./index/old/css.json")).json();

const renderCSS = () => {
	const allData = [
		["Properties", cssProperties],
		["Types", cssTypes],
		["At-rules", cssAtRules],
		["Functions", cssFunctions],
		["Basic selectors", cssSelectors],
		["Pseudo classes", cssPseudoClasses],
		["Pseudo elements", cssPseudoElements],
		["Descriptors", cssDescriptors],
		["Units", cssUnits],
	];
	for (const [categoryName, data] of allData) {
		const categoryId = nameToId(categoryName);

		{
			const clone = tocFragment.cloneNode(true);
			clone.querySelector(".link-to-list").textContent = categoryName;
			clone.querySelector(".link-to-list").href = "#" + categoryId;
			tocList.append(clone);
		}

		const clone = cssFragment.cloneNode(true);
		clone.querySelector(".category").textContent = categoryName;
		clone.querySelector(".category").id = categoryId;

		const list = clone.querySelector(".list");
		const itemFragment = list.querySelector(":scope > template").content;
		let /** @type {HTMLElement} */ specList;
		let /** @type {string} */ prevName;
		for (const { name, id, spec } of data) {
			const url = `${spec}#${id}`;
			if (name !== prevName) {
				const itemClone = itemFragment.cloneNode(true);
				itemClone.querySelector(".name").textContent = name;
				itemClone.querySelector("a.name").href = url;
				specList = itemClone.querySelector(".spec-list");
				list.append(itemClone);
			}
			const specFragment = specList.querySelector(":scope > template").content;
			{
				const specClone = specFragment.cloneNode(true);
				const { specId } = spec.match(/(\/|\:)(?<specId>[^\/\:]+)\/?$/).groups;
				specClone.querySelector("a.spec").href = url;
				specClone.querySelector(".spec-identifier").textContent = specId;
				specClone.querySelector(".spec-link-hash").textContent = "#" + id;
				if (openLinksInNewTab) specClone.querySelector("a.spec").target = "_blank";
				specList.append(specClone);
			}
			prevName = name;
		}
		mainList.append(clone);
	}
}


const {
	jsInterfaces,
	jsAttributes,
	jsFunctions,
} = await (await window.fetch("./index/old/javascript.json")).json();

const renderJavaScript = () => {
	const allData = [
		["Interfaces", jsInterfaces],
		["Attributes", jsAttributes],
		["Functions", jsFunctions],
	];
	for (const [categoryName, data] of allData) {
		const categoryId = nameToId(categoryName);

		{
			const clone = tocFragment.cloneNode(true);
			clone.querySelector(".link-to-list").textContent = categoryName;
			clone.querySelector(".link-to-list").href = "#" + categoryId;
			tocList.append(clone);
		}

		const clone = javaScriptFragment.cloneNode(true);
		clone.querySelector(".category").textContent = categoryName;
		clone.querySelector(".category").id = categoryId;

		const list = clone.querySelector(".list");
		const itemFragment = list.querySelector(":scope > template").content;
		let /** @type {HTMLElement} */ specList;
		let /** @type {string} */ prevDisplayName;
		for (const { name, id, spec, static: isStatic, interface: interfaceName } of data) {
			// const url = `${spec}#${id}`;
			const url = spec;
			let displayName = name;
			if (categoryId === "attributes") {
				if (interfaceName === "Window") displayName = `${name} (window)`;
				else if (isStatic) displayName = `${name} (${interfaceName})`;
				else displayName = `${name} (${interfaceName}.prototype)`;
			} else if (categoryId === "functions") {
				if (interfaceName === "Window") displayName = `${name}() (window)`;
				else if (isStatic) displayName = `${name}() (${interfaceName})`;
				else displayName = `${name}() (${interfaceName}.prototype)`;
			}
			if (displayName !== prevDisplayName) {
				const itemClone = itemFragment.cloneNode(true);
				itemClone.querySelector(".name").textContent = displayName;
				itemClone.querySelector("a.name").href = url;
				specList = itemClone.querySelector(".spec-list");
				list.append(itemClone);
			}
			const specFragment = specList.querySelector(":scope > template").content;
			{
				const specClone = specFragment.cloneNode(true);
				const { specId } = spec.match(/(\/|\:)(?<specId>[^\/\:]+)\/?$/).groups;
				specClone.querySelector("a.spec").href = url;
				specClone.querySelector(".spec-identifier").textContent = specId;
				specClone.querySelector(".spec-link-hash").textContent = "#todo";
				if (openLinksInNewTab) specClone.querySelector("a.spec").target = "_blank";
				specList.append(specClone);
			}
			prevDisplayName = displayName;
		}
		mainList.append(clone);
	}
}
