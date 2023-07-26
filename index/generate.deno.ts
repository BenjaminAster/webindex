
/// <reference types="better-typescript" />
/// <reference types="deno-types" />

/* 
deno run --allow-net --allow-read --allow-write=. index/generate.deno.ts
*/

import manualData from "./manual-data.ts";

// @ts-ignore
import { DOMParser as _DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";
const DOMParser: typeof globalThis.DOMParser = _DOMParser;

const { groups } = JSON.parse(await Deno.readTextFile(new URL("./groups/groups.json", import.meta.url)));

const fetchOptions: RequestInit = { cache: "default", redirect: "error", headers: { "accept": "text/html;q=0.9", "accept-language": "en-US,en;q=0.9" } };

const fetchJSON = async (url: string) => await (await globalThis.fetch(url, fetchOptions)).json();

const sortArrayByObjectValue = (array: any[], key: string) => {
	return array.toSorted(({ [key]: a }, { [key]: b }) => [a.toLowerCase(), b.toLowerCase()].toSorted().join(",") === [a, b].join(",").toLowerCase() ? -1 : 1);
}

const cachedResources = await (async () => {
	try {
		return JSON.parse(await Deno.readTextFile(new URL("./cache/index.json", import.meta.url)));
	} catch {
		await Deno.writeTextFile(new URL("./cache/index.json", import.meta.url), "[]");
		return [];
	}
})();

const fetchCached = async (url: string) => {
	const encodedUrl = url.replaceAll(/[^a-z0-9]/ig, "_") + ".html";
	if (cachedResources.includes(url)) return { text: await Deno.readTextFile(new URL(`./cache/${encodedUrl}`, import.meta.url)), ok: true };
	else {
		const response = await globalThis.fetch(url, fetchOptions);
		const responseText = await response.text();
		cachedResources.push(url);
		await Deno.writeTextFile(new URL("./cache/index.json", import.meta.url), JSON.stringify(cachedResources.sort(), null, "\t"));
		await Deno.writeTextFile(new URL(`./cache/${encodedUrl}`, import.meta.url), responseText);
		return { text: responseText, ok: response.ok };
	}
};

const domParser = new DOMParser();
const fetchDocument = async (url: string) => domParser.parseFromString((await fetchCached(url)).text, "text/html");

let specs = [];

let cssProperties = [];
let cssTypes = [];
let cssValues = [];
let cssDescriptors = [];
let cssAtRules = [];
let cssFunctions = [];
let cssSelectors = [];
let cssPseudoClasses = [];
let cssPseudoElements = [];
let cssUnits = [];

let jsInterfaces = [];
let jsAttributes = [];
let jsFunctions = [];

$specs: {
	const indexURL = "https://w3c.github.io/webref/ed/index.json";

	let { results, date } = await fetchJSON(indexURL);
	results = results.map(({
		nightly: { url, repository: repo, pages },
		// organization,
		groups: [{ url: groupHomepage }],
		css: cssPath,
		idlparsed: parsedIDLPath,
		...rest
	}) => ({ ...rest, url, repo, groupHomepage, cssPath, parsedIDLPath, pages }));

	$specLoop: for (let { url, categories, repo, groupHomepage, title, cssPath, parsedIDLPath, pages, group, tests } of [...results, ...manualData.additionalSpecs]) {
		if (!url) {
			let { login, repoName, path, isFile } = repo.match(
				/^https:\/\/github.com\/(?<login>[\w-]+)\/(?<repoName>[\w-]+)(\/(tree|(?<isFile>blob))\/(?<branch>[\w-]+)(\/(?<path>.*))?)?$/
			).groups;
			url = `https://${login.toLowerCase()}.github.io/${repoName}/${path ? (isFile ? path.replace(/(\.bs|\.md)$/, ".html") : `${path}/`) : ""}`;
		}

		if (manualData.excludedSpecs.includes(url)) continue $specLoop;
		if (categories && !categories.includes("browser")) continue $specLoop;

		group ||= manualData.groupRewrites[url];

		let groupInfo = group ? groups.find((item) => item.identifier === group) : groups.find((group) => group.homepage === groupHomepage);
		group ||= groupInfo.identifier;

		// console.log(groupInfo, group)

		if (!group) {
			console.error(`Group with homepage ${groupHomepage} not found (spec: ${url})`);
		}

		$: {
			const urlRewrite = manualData.specURLRewrites[group]?.[url];
			if (urlRewrite) url = urlRewrite;
		}

		$: {
			const titleRewrite = manualData.titleRewrites[group]?.[url];
			if (titleRewrite) title = titleRewrite;
		}

		if (!title) {
			const { ok, text } = await fetchCached(url);
			if (!ok) console.error(`[ERROR] ${url} not ok`);
			let doc = domParser.parseFromString(text, "text/html");
			title = doc.title.trim();
		}

		let groupObject = specs.find((item) => item.groupIdentifier === group);
		if (!groupObject) {
			specs.push(groupObject = {
				groupName: groupInfo.name,
				groupHomepage: groupInfo.homepage,
				groupIdentifier: groupInfo.identifier,
				specs: [],
			});
		}

		let testsURL: string;
		if (tests) {
			if (tests.repository === "https://github.com/web-platform-tests/wpt") {
				testsURL = `https://wpt.fyi/results/${tests.testPaths[0]}?label=master&product=chrome&product=safari&product=firefox&product=servo`;
			} else {
				testsURL = `${tests.repository}/tree/main/${tests.testPaths[0]}`;
			}
		}

		if (pages) {
			groupObject.specs.push({
				title: `${title}: Table of Contents`,
				url,
				repo,
				...(testsURL ? { tests: testsURL } : {}),
			});
			$switch: switch (url) {
				case ("https://html.spec.whatwg.org/multipage/"): {
					for (const page of pages) {
						const { text } = await fetchCached(page);
						let doc = domParser.parseFromString(text, "text/html");
						let { heading } = doc.querySelector(":is(h2, h3, h4, h5, h6)[id]").textContent.trim().match(/^(\d+(\.\d+)* )?(?<heading>.+)$/s).groups;
						groupObject.specs.push({
							title: `${title}: ${heading}`,
							url: page,
							repo,
							...(testsURL ? { tests: testsURL } : {}),
						});
					}
					break $switch;
				} case ("https://tc39.es/ecma262/multipage/"): {
					for (const page of pages) {
						const { text } = await fetchCached(page);
						let doc = domParser.parseFromString(text, "text/html");
						let { heading } = doc.querySelector("h1").textContent.trim().match(/^[\w]+ (?<heading>.+)$/s).groups;
						groupObject.specs.push({
							title: `${title}: ${heading}`,
							url: page,
							repo,
							...(testsURL ? { tests: testsURL } : {}),
						});
					}
					break $switch;
				} case ("https://svgwg.org/svg2-draft/"): {
					for (const page of pages) {
						const { text } = await fetchCached(page);
						let doc = domParser.parseFromString(text, "text/html");
						let { heading } = doc.querySelector("h1").textContent.trim().match(/^(Chapter [\d]+|Appendix [\w]+): (?<heading>.+)$/s).groups;
						groupObject.specs.push({
							title: `${title}: ${heading}`,
							url: page,
							repo,
							...(testsURL ? { tests: testsURL } : {}),
						});
					}
					break $switch;
				} default: {
					console.error(`[ERROR] unhandled multipage spec: ${title} (${url})`)
				}
			}
		} else {
			groupObject.specs.push({
				title,
				url,
				repo,
				...(testsURL ? { tests: testsURL } : {}),
			});
		}

		console.log(`${title} - ${url}`);

		// $css: {
		// 	if (!cssPath) break $css;
		// 	const cssURL = new URL(cssPath, indexURL).href;
		// 	const { properties, atrules: atRules, selectors, values } = await fetchJSON(cssURL);

		// 	$properties: {
		// 		$propertiesLoop: for (let { name, value, newValues } of properties) {
		// 			if (url === "https://drafts.csswg.org/css2/" && name !== "z-index") continue $propertiesLoop;
		// 			cssProperties.push({
		// 				name,
		// 				value,
		// 				spec: url,
		// 				id: `propdef-${name}`,
		// 			});
		// 		}
		// 	}

		// 	// $types: {
		// 	// 	for (let { name, value, type } of values) {
		// 	// 		if (type === "type") {
		// 	// 			cssTypes.push({

		// 	// 			})
		// 	// 		}
		// 	// 	}
		// 	// }
		// }

		// $js: {
		// 	if (!parsedIDLPath) break $js;
		// 	const idlURL = new URL(parsedIDLPath, indexURL).href;
		// 	const { idlparsed: { idlNames, idlExtendedNames } } = await fetchJSON(idlURL);

		// 	for (const item of [...Object.values(idlNames ?? {}), ...Object.values(idlExtendedNames ?? {}).flat()] as any) {
		// 		if (["interface", "interface mixin", "callback interface", "namespace"].includes(item.type)) {
		// 			const inheritance = item.inheritance;
		// 			const namespace = item.extAttrs.find(({ name }) => name === "LegacyNamespace")?.rhs?.value;
		// 			jsInterfaces.push({
		// 				name: item.name,
		// 				...(inheritance ? { inheritance } : {}),
		// 				...(namespace ? { namespace } : {}),
		// 				// ...(item.type === "interface mixin" || item.partial === true ? { mixin: true } : {}),
		// 				spec: url,
		// 			});

		// 			for (const member of item.members) {
		// 				if (member.type === "operation") {
		// 					jsFunctions.push({
		// 						name: member.name,
		// 						interface: item.name,
		// 						...(member.special === "static" ? { static: true } : {}),
		// 						spec: url,
		// 					});
		// 				} else if (["attribute", "const"].includes(member.type)) {
		// 					jsAttributes.push({
		// 						name: member.name,
		// 						interface: item.name,
		// 						...(member.type === "const" || member.special === "static" ? { static: true } : {}),
		// 						spec: url,
		// 					});
		// 				}
		// 			}
		// 		}
		// 	}
		// }
	}

	cssProperties = sortArrayByObjectValue(cssProperties, "name");
	cssTypes = sortArrayByObjectValue(cssTypes, "name");
	cssValues = sortArrayByObjectValue(cssValues, "name");
	cssDescriptors = sortArrayByObjectValue(cssDescriptors, "name");
	cssAtRules = sortArrayByObjectValue(cssAtRules, "name");
	cssFunctions = sortArrayByObjectValue(cssFunctions, "name");
	cssSelectors = sortArrayByObjectValue(cssSelectors, "name");
	cssPseudoClasses = sortArrayByObjectValue(cssPseudoClasses, "name");
	cssPseudoElements = sortArrayByObjectValue(cssPseudoElements, "name");
	cssUnits = sortArrayByObjectValue(cssUnits, "name");

	jsInterfaces = sortArrayByObjectValue(jsInterfaces, "name");
	jsAttributes = sortArrayByObjectValue(jsAttributes, "name");
	jsFunctions = sortArrayByObjectValue(jsFunctions, "name");
}

{
	console.time("sorting");
	const groupsNotToSort = ["whatwg", "wg/svg", "tc39", "khronos/webgl", "wg/media"];
	$groupsLoop: for (const groupObj of specs) {
		if (groupsNotToSort.includes(groupObj.groupIdentifier)) continue $groupsLoop;
		groupObj.specs = sortArrayByObjectValue(groupObj.specs, "title");
	}
	specs = sortArrayByObjectValue(specs, "groupName");
	console.timeEnd("sorting");
}

await Deno.writeTextFile(new URL("./specs.json", import.meta.url), JSON.stringify({
	timestamp: {
		utc: new Date().toUTCString(),
		iso: new Date().toISOString(),
		unixMillis: Date.now(),
	},
	specs,
}, null, "\t"));

// await Deno.writeTextFile(new URL("./css.json", import.meta.url), JSON.stringify({
// 	cssProperties,
// }, null, "\t"));

// await Deno.writeTextFile(new URL("./js.json", import.meta.url), JSON.stringify({
// 	jsInterfaces,
// 	jsAttributes,
// 	jsFunctions,
// }, null, "\t"));

// export { };
