
// @ts-ignore
import { parse as _parseIDL } from "npm:webidl2@24.4.0";
import manualData from "./manual-data.ts";

const parseIDL = (idl: string) => {
	try {
		return _parseIDL(idl);
	} catch {
		return [];
	}
}

export const collectedStuff = {
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
	jsInterfaces: [],
	jsAttributes: [],
	jsFunctions: [],
};

const cssProperties = [];
const cssTypes = [];
const cssValues = [];
const cssDescriptors = [];
const cssAtRules = [];
const cssFunctions = [];
const cssSelectors = [];
const cssPseudoClasses = [];
const cssPseudoElements = [];
const cssUnits = [];
const jsInterfaces = [];
const jsAttributes = [];
const jsFunctions = [];

const sortArrayByObjectValue = (array: any[], key: string) => {
	array = array.sort(({ [key]: a }, { [key]: b }) => [a.toLowerCase(), b.toLowerCase()].toSorted().toString() === [b, a].toString().toLowerCase() ? 1 : -1);
}

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
	sortArrayByObjectValue(jsAttributes, "name");
	sortArrayByObjectValue(jsFunctions, "name");

	const css2Spec = "https://drafts.csswg.org/css2/";

	{
		// CSS properties:

		let current = cssProperties[0];
		let currentList = [];

		let organizedArray = [];

		$flatList: for (let i = 0; i < cssProperties.length; i++) {
			currentList.push(current);
			let next = cssProperties[i + 1];
			if (next?.name !== current.name) {
				const name = current.name;
				// let { css2Definitions, nonCSS2Definitions } = Object.groupBy(currentList, ({ spec }) => spec === css2Spec ? "css2Definitions" : "nonCSS2Definitions");
				currentList.forEach(item => delete item.name);
				let nonCSS2 = currentList.filter(({ spec }) => spec !== css2Spec);
				if (nonCSS2.length) {
					const sortedByBaseSpec = [];
					for (const info of nonCSS2) {
						const { specId = "other", level } = info.spec.match(/\/(?<specId>[^\/]+)-(?<level>\d+)$/)?.groups ?? {};
						Object.assign(sortedByBaseSpec.find(({ specId: _specId }) => _specId === specId) ?? sortedByBaseSpec.push({ specId, hasRealDefinition: false, levels: [] }), {
							...(info.onlyNewValues ? {} : { hasRealDefinition: true }),
						}).levels.push({ level, info });
					}
					for (const info of sortedByBaseSpec) {
						info.levels.sort(({ level: levelA }, { level: levelB }) => +levelA - +levelB);
					}
					const { realDefinitions, newValuesDefinitions } = Object.groupBy(
						Object.values(sortedByBaseSpec),
						({ hasRealDefinition }) => hasRealDefinition ? "realDefinitions" : "newValuesDefinitions",
					);
				} else {
					organizedArray.push({
						name: current.name,
						specs: currentList,
					});
				}
				// let hasNonCss2Definition = currentList.some(({ spec, onlyNewValues }) => spec !== css2Spec && !onlyNewValues);
				// if (hasNonCss2Definition) currentList = currentList.filter(({ spec }) => spec !== css2Spec);

				currentList = [];
			}
			current = next;
		}

		collectedStuff.cssProperties = organizedArray;
	}

	collectedStuff.cssTypes = cssTypes;
	collectedStuff.cssValues = cssValues;
	collectedStuff.cssDescriptors = cssDescriptors;
	collectedStuff.cssAtRules = cssAtRules;
	collectedStuff.cssFunctions = cssFunctions;
	collectedStuff.cssSelectors = cssSelectors;
	collectedStuff.cssPseudoClasses = cssPseudoClasses;
	collectedStuff.cssPseudoElements = cssPseudoElements;
	collectedStuff.cssUnits = cssUnits;
	collectedStuff.jsInterfaces = jsInterfaces;
	collectedStuff.jsAttributes = jsAttributes;
	collectedStuff.jsFunctions = jsFunctions;

	// console.log([...types]);

	Deno.writeTextFile(new URL("./invalid.idl", import.meta.url), b);

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

export const analyzeDocument = (doc: Document, { specUrl }: { specUrl: string }) => {
	{
		// debug

		// if (doc.querySelector("table.def.propdef > tbody > tr:first-of-type > td:first-of-type > .css:not(dfn)")) {
		// 	console.warn("[invalid definition]", specUrl);
		// }
		// if (doc.querySelector("table.def.propdef > tbody > tr:first-of-type > td:first-of-type > dfn:not(.css)")) {
		// 	console.warn("[invalid definition 2]", specUrl);
		// }

		// for (const dfn of doc.querySelectorAll("dfn[data-dfn-type]")) {
		// 	types.add(dfn.getAttribute("data-dfn-type"));
		// 	console.log([dfn.getAttribute("data-dfn-type"), dfn.getAttribute("data-dfn-for")?.split(", ") ?? [], specUrl]);
		// }

		// for (const dfn of doc.querySelectorAll(":not(dfn[data-dfn-type=type], .prod) > a.production[data-link-type=type]")) {
		// 	if (dfn.nextSibling?.textContent.trim().startsWith("=")) {
		// 		console.log(dfn.textContent, specUrl);
		// 	}
		// }
	}

	$css: {
		// CSS

		if (manualData.specsExcludedFromCSS.includes(specUrl)) break $css;

		{
			// CSS properties

			$loop: for (const tbody of doc.querySelectorAll(":is(body, :not(.issue)) > table.def.propdef > tbody")) {
				const propertyEls = tbody.querySelectorAll(":scope > tr:first-of-type > td:first-of-type > :is(dfn, .css)");
				const value = tbody.querySelector(":scope > tr:nth-of-type(2) > td:first-of-type")?.textContent.trim().replaceAll(/\s+/g, " ");
				const onlyNewValues = tbody.querySelector(":scope > tr:nth-of-type(2) > th")?.textContent.trim().match(/^New value(s)?:/);
				// console.log(value);
				for (const propertyEl of propertyEls) {
					if (!value) throw new Error(`[no value] ${propertyEl} ${specUrl}`);
					const propertyName = propertyEl.textContent.trim();
					const linkId = propertyEl.getAttribute("id");

					cssProperties.push({
						name: propertyName,
						value,
						...(onlyNewValues ? { onlyNewValues: true } : {}),
						id: linkId,
						spec: specUrl,
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
						console.log("[not really a type]", name, specUrl);
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
					cssTypes.push({
						name,
						id,
						definition,
						spec: specUrl,
					});
				} else if (type === "descriptor") {
					const descriptorFor = dfn.getAttribute("data-dfn-for") || null;
					const id = dfn.getAttribute("id");
					cssDescriptors.push({
						name,
						descriptorFor,
						id,
						spec: specUrl,
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
							spec: specUrl,
						});
					} else {
						const valueFor = valueForString?.split(",").map(s => s.trim()) ?? [];
						cssValues.push({
							name,
							valueFor,
							id,
							spec: specUrl,
						});
					}
				} else if (type === "at-rule") {
					const id = dfn.getAttribute("id");
					cssAtRules.push({
						name,
						id,
						spec: specUrl,
					});
				} else if (type === "function") {
					const id = dfn.getAttribute("id");
					const functionName = name.match(/^\<?(?<functionName>[^\(]+)(\(.*\))?\>?$/).groups.functionName;
					name = functionName + "()";
					cssFunctions.push({
						name,
						id,
						spec: specUrl,
					});
				} else if (type === "selector") {
					const id = dfn.getAttribute("id");
					name = name.replace(/\((?<inParentheses>[^\(]+)\)/, "()");
					if (name.startsWith("::") || [":first-line", ":first-letter", ":before", ":after"].includes("name")) {
						cssPseudoElements.push({
							name,
							id,
							spec: specUrl,
						});
					} else if (name.startsWith(":")) {
						cssPseudoClasses.push({
							name,
							id,
							spec: specUrl,
						});
					} else {
						cssSelectors.push({
							name,
							id,
							spec: specUrl,
						});
					}
				}
			}
		}
	}

	{
		// JavaScript

		$idlLoop: for (const container of doc.querySelectorAll("pre > code.idl, :not(#idl-index) + pre.idl:not(.example)")) {
			container.querySelector(":scope > .idlHeader")?.remove();
			let isPrerendered = container.childElementCount > 0;
			if (!isPrerendered) {
				if (!a.has(specUrl)) {
					console.log("[IDL is not prerendered]", specUrl)
					a.add(specUrl);
				}
			}

			const idl = container.textContent.trim();
			// console.log(specUrl);
			const tree = parseIDL(idl);

			if (tree.length === 0) {
				console.log("[invalid WebIDL]", specUrl);
				b += `// ${specUrl}:\n\n${idl}\n\n`;
			}

			for (const item of tree) {
				if (["interface", "interface mixin", "namespace"].includes(item.type)) {
					const inheritance = item.inheritance;
					const namespace = item.extAttrs.find(({ name }) => name === "LegacyNamespace")?.rhs?.value;
					jsInterfaces.push({
						name: item.name,
						...(inheritance ? { inheritance } : {}),
						...(namespace ? { namespace } : {}),
						...(item.type === "interface mixin" || item.partial === true ? { mixin: true } : {}),
						spec: specUrl,
					});

					for (const member of item.members) {
						if (member.type === "operation") {
							jsFunctions.push({
								name: member.name,
								interface: item.name,
								...(member.special === "static" ? { static: true } : {}),
								spec: specUrl,
							});
						} else if (["attribute", "const"].includes(member.type)) {
							jsAttributes.push({
								name: member.name,
								interface: item.name,
								...(member.type === "const" || member.special === "static" ? { static: true } : {}),
								spec: specUrl,
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
			// 				spec: specUrl,
			// 			});
			// 		} else if (type === "attribute") {
			// 			const attributeType = dfn.getAttribute("data-type");
			// 			jsAttributes.push({
			// 				name,
			// 				type: attributeType,
			// 				id,
			// 				spec: specUrl,
			// 			});
			// 		} else if (type === "method") {
			// 			jsMethods.push({
			// 				name,
			// 				id,
			// 				spec: specUrl,
			// 			});
			// 		}
			// 	}
			// }


		}
	}
};
