
/// <reference types="better-typescript" />

const specsData = await (await globalThis.fetch("./index/specs.json")).json();

const mainList = document.querySelector("#main-list");
const groupFragment = mainList.querySelector(":scope > template").content;

for (const { name, specs } of specsData) {
	const clone = groupFragment.cloneNode(true);
	clone.querySelector(".group-name").textContent = name;

	const specsList = clone.querySelector(".group-specs");
	const specFragment = specsList.querySelector(":scope > template").content;
	for (const { name: specName, url, repoUrl } of specs) {
		const specClone = specFragment.cloneNode(true);
		specClone.querySelector(".spec-name").textContent = specName;
		specClone.querySelector("a.spec-link").href = url;
		specClone.querySelector("a.repo-link").href = repoUrl;
		specsList.append(specClone);
	}
	mainList.append(clone);
}

export { };
