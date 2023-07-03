
// @ts-ignore
import { parse as _parseIDL } from "npm:webidl2@24.4.0";

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

const sortArrayByObjectValue = (array: any[], key: string) => {
	array = array.sort(({ [key]: a }, { [key]: b }) => [a.toLowerCase(), b.toLowerCase()].toSorted().toString() === [b, a].toString().toLowerCase() ? 1 : -1);
}

export const tidyUpCollectedStuff = () => {
	sortArrayByObjectValue(collectedStuff.cssProperties, "name");
	sortArrayByObjectValue(collectedStuff.cssTypes, "name");
	sortArrayByObjectValue(collectedStuff.cssValues, "name");
	sortArrayByObjectValue(collectedStuff.cssDescriptors, "name");
	sortArrayByObjectValue(collectedStuff.cssAtRules, "name");
	sortArrayByObjectValue(collectedStuff.cssFunctions, "name");
	sortArrayByObjectValue(collectedStuff.cssSelectors, "name");
	sortArrayByObjectValue(collectedStuff.cssPseudoClasses, "name");
	sortArrayByObjectValue(collectedStuff.cssPseudoElements, "name");
	sortArrayByObjectValue(collectedStuff.cssUnits, "name");
	sortArrayByObjectValue(collectedStuff.jsInterfaces, "name");
	sortArrayByObjectValue(collectedStuff.jsAttributes, "name");
	sortArrayByObjectValue(collectedStuff.jsFunctions, "name");
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

	{
		// CSS

		{
			// CSS properties

			$loop: for (const tbody of doc.querySelectorAll(":is(body, :not(.issue)) > table.def.propdef > tbody")) {
				const propertyEls = tbody.querySelectorAll(":scope > tr:first-of-type > td:first-of-type > :is(dfn, .css)");
				const value = tbody.querySelector(":scope > tr:nth-of-type(2) > td:first-of-type")?.textContent.trim().replaceAll(/\s+/g, " ");
				const isNewValues = tbody.querySelector(":scope > tr:nth-of-type(2) > th")?.textContent.trim().match(/^New value(s)?:/);
				// console.log(value);
				for (const propertyEl of propertyEls) {
					if (!value) throw new Error(`[no value] ${propertyEl} ${specUrl}`);
					const propertyName = propertyEl.textContent.trim();
					const linkId = propertyEl.getAttribute("id");

					collectedStuff.cssProperties.push({
						name: propertyName,
						value,
						...(isNewValues ? { isNewValues: true } : {}),
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
					collectedStuff.cssTypes.push({
						name,
						id,
						definition,
						spec: specUrl,
					});
				} else if (type === "descriptor") {
					const descriptorFor = dfn.getAttribute("data-dfn-for") || null;
					const id = dfn.getAttribute("id");
					collectedStuff.cssDescriptors.push({
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
						collectedStuff.cssUnits.push({
							name,
							forType: valueForString,
							id,
							spec: specUrl,
						});
					} else {
						const valueFor = valueForString?.split(",").map(s => s.trim()) ?? [];
						collectedStuff.cssValues.push({
							name,
							valueFor,
							id,
							spec: specUrl,
						});
					}
				} else if (type === "at-rule") {
					const id = dfn.getAttribute("id");
					collectedStuff.cssAtRules.push({
						name,
						id,
						spec: specUrl,
					});
				} else if (type === "function") {
					const id = dfn.getAttribute("id");
					const functionName = name.match(/^\<?(?<functionName>[^\(]+)(\(.*\))?\>?$/).groups.functionName;
					name = functionName + "()";
					collectedStuff.cssFunctions.push({
						name,
						id,
						spec: specUrl,
					});
				} else if (type === "selector") {
					const id = dfn.getAttribute("id");
					name = name.replace(/\((?<inParentheses>[^\(]+)\)/, "()");
					if (name.startsWith("::")) {
						collectedStuff.cssPseudoElements.push({
							name,
							id,
							spec: specUrl,
						});
					} else if (name.startsWith(":")) {
						collectedStuff.cssPseudoClasses.push({
							name,
							id,
							spec: specUrl,
						});
					} else {
						collectedStuff.cssSelectors.push({
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

		$idlLoop: for (const container of doc.querySelectorAll("pre > code.idl, :not(#idl-index) + pre.idl")) {
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
					collectedStuff.jsInterfaces.push({
						name: item.name,
						...(inheritance ? { inheritance } : {}),
						...(namespace ? { namespace } : {}),
						...(item.type === "interface mixin" || item.partial === true ? { mixin: true } : {}),
						spec: specUrl,
					});

					for (const member of item.members) {
						if (member.type === "operation") {
							collectedStuff.jsFunctions.push({
								name: member.name,
								interface: item.name,
								...(member.special === "static" ? { static: true } : {}),
								spec: specUrl,
							});
						} else if (["attribute", "const"].includes(member.type)) {
							collectedStuff.jsAttributes.push({
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
			// 			collectedStuff.jsInterfaces.push({
			// 				name,
			// 				id,
			// 				spec: specUrl,
			// 			});
			// 		} else if (type === "attribute") {
			// 			const attributeType = dfn.getAttribute("data-type");
			// 			collectedStuff.jsAttributes.push({
			// 				name,
			// 				type: attributeType,
			// 				id,
			// 				spec: specUrl,
			// 			});
			// 		} else if (type === "method") {
			// 			collectedStuff.jsMethods.push({
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
