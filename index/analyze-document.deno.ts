
// @ ts-ignore
import { parse as _parseIDL } from "npm:webidl2@24.4.1";
import manualData from "./manual-data.ts";
import { sortArrayByObjectValue } from "./utils.deno.ts";

export const parseIDL = (idl: string) => {
	try {
		return _parseIDL(idl);
	} catch {
		console.error("[ERROR] failed to parse WebIDL");
		return [];
	}
}

export const collectedCSSStuff = {
	cssProperties: [],
	cssTypes: [],
	cssValues: [],
	cssDescriptors: [],
	cssAtRules: [],
	cssFunctions: [],
	cssSelectors: [],
	cssPseudoClasses: [],
	cssPseudoElements: [],
	cssUnits: [],
};

export const collectedJavaScriptStuff = {
	jsInterfaces: [],
	jsDictionaries: [],
	jsDictionaryFields: [],
	jsAttributes: [],
	jsFunctions: [],
};

const cssProperties = manualData.additionalCSSProperties;
const cssTypes = manualData.additionalCSSTypes;
const cssValues = [];
const cssDescriptors = [];
const cssAtRules = [];
const cssFunctions = [];
const cssSelectors = manualData.additionalCSSSelectors;
const cssPseudoClasses = [];
const cssPseudoElements = manualData.additionalCSSPseudoElements;
const cssUnits = manualData.additionalCSSUnits;
const jsInterfaces = [];
const jsDictionaries = [];
const jsDictionaryFields = [];
const jsAttributes = [];
const jsFunctions = [];

export const tidyUpCollectedStuff = () => {
	sortArrayByObjectValue(cssProperties, "name");
	sortArrayByObjectValue(cssTypes, "name");
	sortArrayByObjectValue(cssValues, "name");
	sortArrayByObjectValue(cssDescriptors, "name");
	sortArrayByObjectValue(cssAtRules, "name");
	sortArrayByObjectValue(cssFunctions, "name");
	sortArrayByObjectValue(cssSelectors, "name");
	sortArrayByObjectValue(cssPseudoClasses, "name");
	sortArrayByObjectValue(cssPseudoElements, "name");
	sortArrayByObjectValue(cssUnits, "name");
	sortArrayByObjectValue(jsInterfaces, "name");
	sortArrayByObjectValue(jsDictionaries, "name");
	sortArrayByObjectValue(jsDictionaryFields, "name");
	sortArrayByObjectValue(jsAttributes, "name");
	sortArrayByObjectValue(jsFunctions, "name");

	const group = (list: any[], { propertiesToConsider = ["name"] } = {}) => {
		let current = list[0];
		let currentList = [];

		// console.log(list)

		let organizedArray = [];

		$flatList: for (let i = 0; i < list.length; i++) {
			currentList.push(current);
			let next = list[i + 1];
			if (!propertiesToConsider.every((property) => current[property] === next?.[property])) {
				// const name = current.name;
				// let { css2Definitions, nonCSS2Definitions } = Object.groupBy(currentList, ({ spec }) => spec === css2Spec ? "css2Definitions" : "nonCSS2Definitions");
				// currentList.forEach(item => delete item.name);
				// let currentSpecURLWithoutLevelNumber = currentList
				// console.log(list)
				// console.log("######")
				// console.log(currentList);
				// console.log("---")
				const sortedByBaseSpec = [];
				for (const item of currentList) {
					const { urlWithoutLevel = item.spec, level = 0 } = item.spec.match(/^(?<urlWithoutLevel>.+\D)(?<level>\d+)\/?$/)?.groups ?? {};
					// console.log(urlWithoutLevel, level, sortedByBaseSpec);
					(
						sortedByBaseSpec.find((item) => item.urlWithoutLevel === urlWithoutLevel)
						??
						(sortedByBaseSpec.push({ urlWithoutLevel, definitions: [] }), sortedByBaseSpec.at(-1))
					).definitions.push({
						level: +level,
						item: self.structuredClone(item),
					});
					// Object.assign(
					// 	sortedByBaseSpec.find(({ specId: _specId }) => _specId === specId) ?? sortedByBaseSpec.push({ specId, hasRealDefinition: false, levels: [] }),
					// 	{ ...(info.onlyNewValues ? {} : { hasRealDefinition: true }) },
					// ).levels.push({ level, info });
				}
				// console.log(sortedByBaseSpec);
				for (const object of sortedByBaseSpec) {
					object.definitions.sort((a, b) => b.level - a.level);
				}
				const definitions = sortedByBaseSpec.flatMap(({ definitions }) => definitions.map(({ item }) => item));
				// console.log(definitions)
				for (const definition of definitions) {
					propertiesToConsider.forEach((property) => delete definition[property]);
				}
				const firstActualDefIndex = definitions.findIndex(({ id, onlyNewValues }) => !id.startsWith("ref-for-") && !onlyNewValues);
				if (firstActualDefIndex >= 1) definitions.unshift(definitions.splice(firstActualDefIndex, 1)[0]);
				// console.log(Object.fromEntries(propertiesToConsider.map((property) => [property, current[property]])),current)
				organizedArray.push({
					...Object.fromEntries(propertiesToConsider.map((property) => [property, current[property]])),
					definitions,
				});
				// const { realDefinitions, newValuesDefinitions } = Object.groupBy(
				// 	Object.values(sortedByBaseSpec),
				// 	({ hasRealDefinition }) => hasRealDefinition ? "realDefinitions" : "newValuesDefinitions",
				// );
				// let hasNonCss2Definition = currentList.some(({ spec, onlyNewValues }) => spec !== css2Spec && !onlyNewValues);
				// if (hasNonCss2Definition) currentList = currentList.filter(({ spec }) => spec !== css2Spec);

				currentList = [];

				// throw 1;
			}
			current = next;
		}

		return organizedArray;
	}

	// collectedStuff.cssProperties = organizedArray;

	Deno.writeTextFile("tmp.json", JSON.stringify(cssProperties, null, "\t"));

	collectedCSSStuff.cssProperties = group(cssProperties);
	collectedCSSStuff.cssTypes = group(cssTypes, { propertiesToConsider: ["name"] });
	collectedCSSStuff.cssValues = group(cssValues, { propertiesToConsider: ["name", "valueFor"] });
	collectedCSSStuff.cssDescriptors = group(cssDescriptors, { propertiesToConsider: ["name", "descriptorFor"] });
	collectedCSSStuff.cssAtRules = group(cssAtRules);
	collectedCSSStuff.cssFunctions = group(cssFunctions);
	collectedCSSStuff.cssSelectors = group(cssSelectors);
	collectedCSSStuff.cssPseudoClasses = group(cssPseudoClasses);
	collectedCSSStuff.cssPseudoElements = group(cssPseudoElements);
	collectedCSSStuff.cssUnits = group(cssUnits, { propertiesToConsider: ["name", "forType"] });

	collectedJavaScriptStuff.jsInterfaces = group(jsInterfaces, { propertiesToConsider: ["name", "mixin", "namespace"] });
	collectedJavaScriptStuff.jsDictionaries = group(jsDictionaries, { propertiesToConsider: ["name"] });
	collectedJavaScriptStuff.jsDictionaryFields = group(jsDictionaryFields, { propertiesToConsider: ["name", "dictionary"] });
	collectedJavaScriptStuff.jsAttributes = group(jsAttributes, { propertiesToConsider: ["name", "interface", "static"] });
	collectedJavaScriptStuff.jsFunctions = group(jsFunctions, { propertiesToConsider: ["name", "interface", "static"] });

	// collectedStuff.cssTypes = cssTypes;
	// collectedStuff.cssValues = cssValues;
	// collectedStuff.cssDescriptors = cssDescriptors;
	// collectedStuff.cssAtRules = cssAtRules;
	// collectedStuff.cssFunctions = cssFunctions;
	// collectedStuff.cssSelectors = cssSelectors;
	// collectedStuff.cssPseudoClasses = cssPseudoClasses;
	// collectedStuff.cssPseudoElements = cssPseudoElements;
	// collectedStuff.cssUnits = cssUnits;
	// collectedStuff.jsInterfaces = jsInterfaces;
	// collectedStuff.jsAttributes = jsAttributes;
	// collectedStuff.jsFunctions = jsFunctions;

	// console.log([...types]);

	// Deno.writeTextFile(new URL("./invalid.idl", import.meta.url), b);

	// console.log([...a]);
}

// let types = new Set();

const dfnTypes = [
	"abstract-op",
	"argument",
	"at-rule",
	"attr-value",
	"attribute",
	"callback",
	"const",
	"constructor",
	"descriptor",
	"dfn",
	"dict-member",
	"dictionary",
	"element",
	"element-attr",
	"element-state",
	"enum",
	"enum-value",
	"event",
	"exception",
	"extended-attribute",
	"function",
	"grammar",
	"http-header",
	"interface",
	"method",
	"namespace",
	"permission",
	"property",
	"selector",
	"type",
	"typedef",
	"value",
];

let a = new Set();

let b = "";

export const analyzeDocument = (doc: Document, { url }: { url: string }) => {
	{
		// debug

		// if (doc.querySelector("table.def.propdef > tbody > tr:first-of-type > td:first-of-type > .css:not(dfn)")) {
		// 	console.warn("[invalid definition]", url);
		// }
		// if (doc.querySelector("table.def.propdef > tbody > tr:first-of-type > td:first-of-type > dfn:not(.css)")) {
		// 	console.warn("[invalid definition 2]", url);
		// }

		// for (const dfn of doc.querySelectorAll("dfn[data-dfn-type]")) {
		// 	types.add(dfn.getAttribute("data-dfn-type"));
		// 	console.log([dfn.getAttribute("data-dfn-type"), dfn.getAttribute("data-dfn-for")?.split(", ") ?? [], url]);
		// }

		// for (const dfn of doc.querySelectorAll(":not(dfn[data-dfn-type=type], .prod) > a.production[data-link-type=type]")) {
		// 	if (dfn.nextSibling?.textContent.trim().startsWith("=")) {
		// 		console.log(dfn.textContent, url);
		// 	}
		// }
	}

	$css: {
		// CSS

		if (manualData.specsExcludedFromCSS.includes(url)) break $css;

		{
			// CSS properties

			$loop: for (const tbody of doc.querySelectorAll(":is(body, :not(.issue)) > table.def.propdef > tbody")) {
				const propertyEls = tbody.querySelectorAll(":scope > tr:first-of-type > td:first-of-type > :is(dfn, .css)");
				const value = tbody.querySelector(":scope > tr:nth-of-type(2) > td:first-of-type")?.textContent.trim().replaceAll(/\s+/g, " ");
				const onlyNewValues = tbody.querySelector(":scope > tr:nth-of-type(2) > th")?.textContent.trim().match(/^New value(s)?:/);
				// console.log(value);
				$propertyElLoop: for (const propertyEl of propertyEls) {
					if (!value) throw new Error(`[no value] ${propertyEl} ${url}`);
					const propertyName = propertyEl.textContent.trim();
					const linkId = propertyEl.getAttribute("id");
					if (!linkId) {
						if (propertyName !== "display" || url !== "https://w3c.github.io/mathml-core/") {
							console.error(`[ERROR] CSS property ${propertyName} (${url}) has no id attribute`);
						}
						continue $propertyElLoop;
					}

					cssProperties.push({
						name: propertyName,
						value,
						...(onlyNewValues ? { onlyNewValues: true } : {}),
						id: linkId,
						spec: url,
					});
				}
			}
		}

		{
			// CSS types, values, at-rules, functions, etc.

			$loop: for (const dfn of doc.querySelectorAll("dfn[data-dfn-type], .prod > a.production[data-link-type]")) {
				let name = dfn.textContent.trim().replaceAll(/\s+/g, " ");
				if (dfn.tagName === "A") {
					if (!dfn.nextSibling?.textContent.trim().startsWith("=")) continue $loop;
				}
				const type = dfn.getAttribute("data-dfn-type") || dfn.getAttribute("data-link-type");
				if (type === "type") {
					if (!name.startsWith("<")) {
						console.log("[not really a type]", name, url);
						continue $loop;
					}
					let definition = "";
					if (dfn.parentElement.matches(":is(.prod, pre, dt, .definition)")) {
						let sibling: Element = dfn;
						$siblings: while (sibling = sibling.nextSibling as Element) {
							if (sibling.getAttribute?.("style")?.includes("height: 0px") || sibling.textContent.trim() === "=") continue $siblings;
							if (
								sibling.matches?.("dfn:is([data-dfn-type=type], [data-dfn-type=at-rule], [data-dfn-type=function]), p")
								||
								(sibling.matches?.("a.production") && sibling.nextSibling?.textContent.trim().startsWith("="))
								||
								sibling.textContent.trim() === "<"
							) break $siblings;
							definition += sibling.textContent;
						}
						definition = definition.trim().replaceAll(/\s+/g, " ");
						if (definition.startsWith("=")) definition = definition.replace("=", "").trim();
					} else {
						definition = null;
						if (!dfn.matches(":is(.css, .dfn-paneled)")) {
							continue $loop;
						}
					}
					definition ||= null;
					const id = dfn.getAttribute("id");
					if (!id) {
						if (!manualData.additionalCSSTypes.some((item) => item.name === name)) {
							console.error(`[ERROR] CSS type ${name} (${url}) has no id attribute`);
						}
						continue $loop;
					}
					cssTypes.push({
						name,
						id,
						definition,
						spec: url,
					});
				} else if (type === "descriptor") {
					const descriptorFor = dfn.getAttribute("data-dfn-for") || null;
					const id = dfn.getAttribute("id");
					cssDescriptors.push({
						name,
						descriptorFor,
						id,
						spec: url,
					});
				} else if (type === "value") {
					const valueForString = dfn.getAttribute("data-dfn-for");
					const id = dfn.getAttribute("id");
					if (["<length>", "<angle>", "<time>", "<frequency>", "<resolution>"].includes(valueForString)) {
						name = name.replace(/ unit$/, "");
						cssUnits.push({
							name,
							forType: valueForString,
							id,
							spec: url,
						});
					} else {
						const valueFor = valueForString?.split(",").map(s => s.trim()) ?? [];
						cssValues.push({
							name,
							valueFor,
							id,
							spec: url,
						});
					}
				} else if (type === "at-rule") {
					const id = dfn.getAttribute("id");
					cssAtRules.push({
						name,
						id,
						spec: url,
					});
				} else if (type === "function") {
					const id = dfn.getAttribute("id");
					const functionName = name.match(/^\<?(?<functionName>[^\(]+)(\(.*\))?\>?$/).groups.functionName;
					name = functionName + "()";
					cssFunctions.push({
						name,
						id,
						spec: url,
					});
				} else if (type === "selector") {
					const id = dfn.getAttribute("id");
					name = name.replace(/\((?<inParentheses>[^\(]+)\)/, "()");
					if (name.startsWith("::")) {
						cssPseudoElements.push({
							name,
							id,
							spec: url,
						});
					} else if (name.startsWith(":")) {
						cssPseudoClasses.push({
							name,
							id,
							spec: url,
						});
					} else {
						cssSelectors.push({
							name,
							id,
							spec: url,
						});
					}
				}
			}
		}
	}
};

export const extractIDL = (doc: Document, { url }: { url: string }) => {
	let idl = "";

	$idlLoop: for (const container of doc.querySelectorAll("pre > code.idl, pre.idl:not(.example)")) {
		if (container.previousElementSibling?.id === "idl-index") continue $idlLoop;
		container.querySelector(":scope > .idlHeader")?.remove();
		let isPrerendered = container.childElementCount > 0;
		// if (!isPrerendered) {
		// 	if (!a.has(url)) {
		// 		console.log("[IDL is not prerendered]", url)
		// 		a.add(url);
		// 	}
		// }

		const idlSegment = container.textContent.trim();
		if (!idlSegment) continue $idlLoop;

		idl += `\n${idlSegment}\n`;
	}

	return idl;
};

export const analyzeIDL = (idl: string, { url, generator }: { url: string, generator: string }) => {
	const tree = parseIDL(idl);

	if (tree.length === 0) {
		console.log("[invalid WebIDL]", url);
		b += `// ${url}:\n\n${idl}\n\n`;
	}

	for (const item of tree) {
		if (["interface", "interface mixin", "namespace", "dictionary"].includes(item.type)) {
			// TODO: reverse-engineer actual link ids better
			const lowercaseName = item.name.toLowerCase();
			const id = (() => {
				if (generator === "respec") {
					if (item.partial) {
						return `idl-def-${lowercaseName}-partial-1`;
					} else {
						return `dom-${lowercaseName}`;
						// return `idl-def-${lowercaseName}`;
					}
				} else {
					const prefix = (() => {
						switch (item.type) {
							case ("dictionary"): return "dictdef-";
							case ("namespace"): return "namespacedef-";
							default: return "";
						}
					})();
					return prefix + (item.partial ? "ref-for-" : "") + lowercaseName;
				}
			})();
			if (item.type === "dictionary") {
				jsDictionaries.push({
					name: item.name,
					...(item.partial ? { partial: true } : {}),
					spec: url,
					id,
				});
			} else {
				const inheritance = item.inheritance;
				const namespace = item.extAttrs.find(({ name }) => name === "LegacyNamespace")?.rhs?.value;
				jsInterfaces.push({
					name: item.name,
					...(inheritance ? { inheritance } : {}),
					...(namespace ? { namespace: namespace } : {}),
					...(item.partial ? { partial: true } : {}),
					...(item.type === "interface mixin" ? { mixin: true } : {}),
					spec: url,
					id,
				});
			}

			for (const member of item.members) {
				if (member.type === "operation") {
					jsFunctions.push({
						name: member.name,
						interface: item.name,
						...(item.type === "namespace" || member.special === "static" ? { static: true } : {}),
						spec: url,
						id,
					});
				} else if (["attribute", "const"].includes(member.type)) {
					jsAttributes.push({
						name: member.name,
						interface: item.name,
						...(item.type === "namespace" || member.type === "const" || member.special === "static" ? { static: true } : {}),
						spec: url,
						id,
					});
				} else if (member.type === "field") {
					jsDictionaryFields.push({
						name: member.name,
						dictionary: item.name,
						spec: url,
						id,
					});
				}
			}
		}
	}

	// if (isPrerendered) {
	// 	for (const dfn of container.querySelectorAll("dfn[data-dfn-type], a.idl-code[data-link-type]")) {
	// 		const type = dfn.getAttribute("data-dfn-type") || dfn.getAttribute("data-link-type");
	// 		const name = dfn.textContent.trim().replaceAll(/\s+/g, " ");
	// 		const id = dfn.getAttribute("id");

	// 		if (type === "interface") {
	// 			jsInterfaces.push({
	// 				name,
	// 				id,
	// 				spec: url,
	// 			});
	// 		} else if (type === "attribute") {
	// 			const attributeType = dfn.getAttribute("data-type");
	// 			jsAttributes.push({
	// 				name,
	// 				type: attributeType,
	// 				id,
	// 				spec: url,
	// 			});
	// 		} else if (type === "method") {
	// 			jsMethods.push({
	// 				name,
	// 				id,
	// 				spec: url,
	// 			});
	// 		}
	// 	}
	// }
};

/* 

specs with special interface link id behavior

not lowercased:
- Khronos
- webaudio

idl-def-interfacename:
- webcrypto

 */