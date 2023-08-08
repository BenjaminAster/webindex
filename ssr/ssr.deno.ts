
/// <reference types="better-typescript" />
/// <reference types="deno-types" />

/* 
deno run --allow-read --allow-write=. ssr/ssr.deno.ts
*/

// @ts-ignore
import { DOMParser as _DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";
const DOMParser: typeof globalThis.DOMParser = _DOMParser;

const templateString = await Deno.readTextFile(new URL("./template.html", import.meta.url));
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
	const tocTemplate = tocList.querySelector(":scope > template");
	const mainList = doc.querySelector("#main-list");
	const groupTemplate = mainList.querySelector(":scope > template#specifications-template");
	const cssTemplate = mainList.querySelector(":scope > template#css-template");
	const javaScriptTemplate = mainList.querySelector(":scope > template#javascript-template");
	// let currentTab = "specifications";

	// console.log(tocTemplate)

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
				const { specs: specsData } = JSON.parse(await Deno.readTextFile(new URL("../index/specs.json", import.meta.url)));
				// console.log(specsData)

				for (const { groupName, groupHomepage, groupIdentifier, specs } of specsData) {
					const groupLinkId = nameToId(groupName);

					{
						const clone = tocTemplate.cloneNode(true).content;
						clone.querySelector(".link-to-list").textContent = groupName;
						clone.querySelector("a.link-to-list").setAttribute("href", "#" + groupLinkId);
						tocList.append(clone);
					}

					const clone = groupTemplate.cloneNode(true).content;
					clone.querySelector(".group-name").textContent = groupName;
					clone.querySelector(".header h3").id = groupLinkId;
					clone.querySelector("a.group-link").setAttribute("href", groupHomepage);
					clone.querySelector(".group-idenfifier").textContent = groupIdentifier;

					const specsList = clone.querySelector(".group-specs");
					const specTemplate = specsList.querySelector(":scope > template");
					for (const { title, url, repo, tests, shortname } of specs) {
						shortnameMap.set(url, shortname);
						const specClone = specTemplate.cloneNode(true).content;
						specClone.querySelector(".spec-name").textContent = title;
						const urlObject = new URL(url);
						specClone.querySelector(".spec-url").textContent = urlObject.host + urlObject.pathname.replace(/\/$/, "");
						specClone.querySelector("a.spec-link").setAttribute("href", url);
						if (openLinksInNewTab) specClone.querySelector("a.spec-link").target = "_blank";
						if (repo) {
							specClone.querySelector("a.repo-link").setAttribute("href", repo);
						} else {
							// specClone.querySelector("a.repo-link").style.visibility = "hidden";
							specClone.querySelector("a.repo-link").classList.add("disabled");
							specClone.querySelector("a.repo-link").inert = true;
						}
						if (tests) {
							specClone.querySelector("a.tests-link").setAttribute("href", tests);
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

			await renderSpecs();

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
						const clone = tocTemplate.cloneNode(true).content;
						clone.querySelector(".link-to-list").textContent = categoryName;
						clone.querySelector("a.link-to-list").setAttribute("href", "#" + categoryId);
						tocList.append(clone);
					}

					const clone = cssTemplate.cloneNode(true).content;
					clone.querySelector(".category").textContent = categoryName;
					clone.querySelector(".category").id = categoryId;

					const list = clone.querySelector(".list");
					const itemTemplate = list.querySelector(":scope > template");
					let /** @type {HTMLElement} */ specList;
					let /** @type {string} */ prevName;
					for (const { name, definitions } of data) {
						const itemClone = itemTemplate.cloneNode(true).content;
						itemClone.querySelector(".name").textContent = name;
						specList = itemClone.querySelector(".spec-list");
						const specTemplate = specList.querySelector(":scope > template");
						for (const [i, { spec, id }] of definitions.entries()) {
							const url = `${spec}#${id}`;
							if (i === 0) itemClone.querySelector("a.name").setAttribute("href", url);
							const specClone = specTemplate.cloneNode(true).content;
							const shortname = shortnameMap.get(spec);
							specClone.querySelector("a.spec").setAttribute("href", url);
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
						const clone = tocTemplate.cloneNode(true).content;
						clone.querySelector(".link-to-list").textContent = categoryName;
						clone.querySelector("a.link-to-list").setAttribute("href", "#" + categoryId);
						tocList.append(clone);
					}

					const clone = javaScriptTemplate.cloneNode(true).content;
					clone.querySelector(".category").textContent = categoryName;
					clone.querySelector(".category").id = categoryId;

					const list = clone.querySelector(".list");
					const itemTemplate = list.querySelector(":scope > template");
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
						const itemClone = itemTemplate.cloneNode(true).content;
						itemClone.querySelector(".name").textContent = displayName;
						specList = itemClone.querySelector(".spec-list");
						const specTemplate = specList.querySelector(":scope > template");
						for (const [i, { spec, id }] of definitions.entries()) {
							const url = `${spec}#${id}`;
							if (i === 0) itemClone.querySelector("a.name").setAttribute("href", url);
							const specClone = specTemplate.cloneNode(true).content;
							const shortname = shortnameMap.get(spec);
							specClone.querySelector("a.spec").setAttribute("href", url);
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

	for (const el of [...doc.getElementsByTagName("template")]) el.remove();

	await Deno.writeTextFile(new URL(fileName, new URL("../", import.meta.url)), [
		`<!DOCTYPE html>`,
		`<!-- DO NOT EDIT THIS FILE DIRECTLY!`,
		`See ssr/template.html instead. -->\n`,
	].join("\n") + doc.documentElement.outerHTML);
}
