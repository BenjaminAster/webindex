
/// <reference types="better-typescript" />

const specsData = await (await globalThis.fetch("./index/specs.json")).json();

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

export { };
