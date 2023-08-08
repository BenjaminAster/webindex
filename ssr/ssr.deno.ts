
/// <reference types="better-typescript" />
/// <reference types="deno-types" />

// @ts-ignore
import { DOMParser as _DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";
const DOMParser: typeof globalThis.DOMParser = _DOMParser;

const templateString = await Deno.readTextFile(new URL("../template.html", import.meta.url));
const templateDocument = new DOMParser().parseFromString(templateString, "text/html");

let shortnameMap = new Map();

const nameToId = (/** @type {string} */ name) => name.toLowerCase().replaceAll(/\W+/g, "-");

for (const { fileName, tab } of [
	{ tab: "specifications", fileName: "index.html" },
	{ tab: "css", fileName: "css.html" },
	{ tab: "javascript", fileName: "javascript.html" },
]) {
	const doc = templateDocument.cloneNode(true);
	doc.documentElement.setAttribute("data-tab", tab);
	const tocList = doc.querySelector("#toc-list");
	const tocFragment = tocList.querySelector(":scope > template").content;
	const mainList = doc.querySelector("#main-list");
	const groupFragment = mainList.querySelector(":scope > template#specifications-template").content;
	const cssFragment = mainList.querySelector(":scope > template#css-template").content;
	const javaScriptFragment = mainList.querySelector(":scope > template#javascript-template").content;
	// let currentTab = "specifications";

	// const openLinksInNewTab = window.matchMedia?.("(any-hover: none)").matches;
	const openLinksInNewTab = false;

	// document.querySelector("fieldset#tabs").addEventListener("change", ({ target }) => {
	// 	currentTab = target.value;
	// 	for (const child of [...mainList.children, ...tocList.children]) {
	// 		if (child.localName !== "template") child.remove();
	// 	}

	// 	console.log("change")
	// 	$switch: switch (currentTab) {
	// 		case ("specifications"): {
	// 			renderSpecs();
	// 			break $switch;
	// 		} case ("css"): {
	// 			renderCSS();
	// 			break $switch;
	// 		} case ("javascript"): {
	// 			renderJavaScript();
	// 			break $switch;
	// 		}
	// 	}
	// });


	$switch: switch (tab) {
		case ("specifications"): {
			const renderSpecs = async () => {
				const { specs: specsData } = await (await globalThis.fetch("./index/specs.json")).json();

				for (const { groupName, groupHomepage, groupIdentifier, specs } of specsData) {
					const groupLinkId = nameToId(groupName);

					{
						const clone = tocFragment.cloneNode(true);
						clone.querySelector(".link-to-list").textContent = groupName;
						clone.querySelector("a.link-to-list").href = "#" + groupLinkId;
						tocList.append(clone);
					}

					const clone = groupFragment.cloneNode(true);
					clone.querySelector(".group-name").textContent = groupName;
					clone.querySelector(".header h3").id = groupLinkId;
					clone.querySelector("a.group-link").href = groupHomepage;
					clone.querySelector(".group-idenfifier").textContent = groupIdentifier;

					const specsList = clone.querySelector(".group-specs");
					const specFragment = specsList.querySelector(":scope > template").content;
					for (const { title, url, repo, tests, shortname } of specs) {
						shortnameMap.set(url, shortname);
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

			break $switch;
		}
		case ("css"): {
			const renderCSS = async () => {
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
				} = JSON.parse(await Deno.readTextFile(new URL("../index/css.json", import.meta.url)));

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
						clone.querySelector("a.link-to-list").href = "#" + categoryId;
						tocList.append(clone);
					}

					const clone = cssFragment.cloneNode(true);
					clone.querySelector(".category").textContent = categoryName;
					clone.querySelector(".category").id = categoryId;

					const list = clone.querySelector(".list");
					const itemFragment = list.querySelector(":scope > template").content;
					let /** @type {HTMLElement} */ specList;
					let /** @type {string} */ prevName;
					for (const { name, definitions } of data) {
						const itemClone = itemFragment.cloneNode(true);
						itemClone.querySelector(".name").textContent = name;
						specList = itemClone.querySelector(".spec-list");
						const specFragment = specList.querySelector(":scope > template").content;
						for (const [i, { spec, id }] of definitions.entries()) {
							const url = `${spec}#${id}`;
							if (i === 0) itemClone.querySelector("a.name").href = url;
							const specClone = specFragment.cloneNode(true);
							const shortname = shortnameMap.get(spec);
							specClone.querySelector("a.spec").href = url;
							specClone.querySelector(".spec-identifier").textContent = shortname;
							specClone.querySelector(".spec-link-hash").textContent = "#" + id;
							if (openLinksInNewTab) specClone.querySelector("a.spec").target = "_blank";
							specList.append(specClone);
						}
						list.append(itemClone);
					}
					mainList.append(clone);
				}
			}

			await renderCSS();
			break $switch;
		}
		case ("javascript"): {

			const renderJavaScript = async () => {
				const {
					jsInterfaces,
					jsAttributes,
					jsFunctions,
					jsDictionaries,
					jsDictionaryFields,
				} = JSON.parse(await Deno.readTextFile(new URL("../index/javascript.json", import.meta.url)));

				const allData = [
					["Interfaces", jsInterfaces],
					["Attributes", jsAttributes],
					["Functions", jsFunctions],
					["Dictionaries", jsDictionaries],
					["Dictionary fields", jsDictionaryFields],
				];
				for (const [categoryName, data] of allData) {
					const categoryId = nameToId(categoryName);

					{
						const clone = tocFragment.cloneNode(true);
						clone.querySelector(".link-to-list").textContent = categoryName;
						clone.querySelector("a.link-to-list").href = "#" + categoryId;
						tocList.append(clone);
					}

					const clone = javaScriptFragment.cloneNode(true);
					clone.querySelector(".category").textContent = categoryName;
					clone.querySelector(".category").id = categoryId;

					const list = clone.querySelector(".list");
					const itemFragment = list.querySelector(":scope > template").content;
					let /** @type {HTMLElement} */ specList;
					let /** @type {string} */ prevDisplayName;
					$dataLoop: for (const { name, definitions, static: isStatic, interface: interfaceName, dictionary } of data) {
						if (!name) continue $dataLoop;
						let displayName = name;
						if (categoryId === "attributes") {
							if (interfaceName === "Window") displayName = `${name} (window)`;
							else if (isStatic) displayName = `${name} (${interfaceName})`;
							else displayName = `${name} (${interfaceName}.prototype)`;
						} else if (categoryId === "functions") {
							if (interfaceName === "Window") displayName = `${name}() (window)`;
							else if (isStatic) displayName = `${name}() (${interfaceName})`;
							else displayName = `${name}() (${interfaceName}.prototype)`;
						} else if (categoryId === "dictionary-fields") {
							displayName = `${name} (${dictionary})`;
						}
						const itemClone = itemFragment.cloneNode(true);
						itemClone.querySelector(".name").textContent = displayName;
						specList = itemClone.querySelector(".spec-list");
						const specFragment = specList.querySelector(":scope > template").content;
						for (const [i, { spec, id }] of definitions.entries()) {
							const url = `${spec}#${id}`;
							if (i === 0) itemClone.querySelector("a.name").href = url;
							const specClone = specFragment.cloneNode(true);
							const shortname = shortnameMap.get(spec);
							specClone.querySelector("a.spec").href = url;
							specClone.querySelector(".spec-identifier").textContent = shortname;
							specClone.querySelector(".spec-link-hash").textContent = "#" + id;
							if (openLinksInNewTab) specClone.querySelector("a.spec").target = "_blank";
							specList.append(specClone);
						}
						list.append(itemClone);
					}
					mainList.append(clone);
				}
			}

			await renderJavaScript();
			break $switch;
		}
	}

	await Deno.writeTextFile(new URL(new URL(fileName, "../"), import.meta.url), "<!DOCTYPE html>\n" + doc.documentElement.outerHTML);
}
