
/// <reference types="better-typescript" />
/// <reference types="deno-types" />

/* 
deno run --allow-net --allow-read --allow-write=. index/new/generate.deno.ts
*/

const fetchOptions: RequestInit = { cache: "default" };

const fetchJSON = async (url: string) => await (await globalThis.fetch(url, fetchOptions)).json();

const sortArrayByObjectValue = (array: any[], key: string) => {
	array = array.sort(({ [key]: a }, { [key]: b }) => [a.toLowerCase(), b.toLowerCase()].toSorted().toString() === [b, a].toString().toLowerCase() ? 1 : -1);
}

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

const jsInterfaces = [];
const jsAttributes = [];
const jsFunctions = [];

$specs: {
	const indexURL = "https://w3c.github.io/webref/ed/index.json";

	const { results, date } = await fetchJSON(indexURL);

	for (let {
		shortname,
		nightly: { url, repository },
		organization,
		groups: [{ name: groupName, url: groupHomepage }],
		title,
		css: cssPath,
		idlparsed: parsedIDLPath,
	} of results) {
		console.log(url);

		if (organization === "WHATWG") {
			groupName = "Web Hypertext Application Technology Working Group";
			groupHomepage = "https://whatwg.org";
		}

		let groupObject = specs.find((group) => group.groupName === groupName);
		if (!groupObject) {
			specs.push(groupObject = {
				groupName,
				groupHomepage,
				specs: [],
			});
		}
		groupObject.specs.push({
			title,
			url,
			repository,
		});

		$css: {
			if (!cssPath) break $css;
			const cssURL = new URL(cssPath, indexURL).href;
			const { properties, atrules: atRules, selectors, values } = await fetchJSON(cssURL);

			$properties: {
				$propertiesLoop: for (let { name, value, newValues } of properties) {
					if (url === "https://drafts.csswg.org/css2/" && name !== "z-index") continue $propertiesLoop;
					cssProperties.push({
						name,
						value,
						spec: url,
						id: `propdef-${name}`,
					});
				}
			}

			// $types: {
			// 	for (let { name, value, type } of values) {
			// 		if (type === "type") {
			// 			cssTypes.push({

			// 			})
			// 		}
			// 	}
			// }
		}

		$js: {
			if (!parsedIDLPath) break $js;
			const idlURL = new URL(parsedIDLPath, indexURL).href;
			const { idlparsed: { idlNames, idlExtendedNames } } = await fetchJSON(idlURL);

			for (const item of [...Object.values(idlNames ?? {}), ...Object.values(idlExtendedNames ?? {}).flat()] as any) {
				if (["interface", "interface mixin", "callback interface", "namespace"].includes(item.type)) {
					const inheritance = item.inheritance;
					const namespace = item.extAttrs.find(({ name }) => name === "LegacyNamespace")?.rhs?.value;
					jsInterfaces.push({
						name: item.name,
						...(inheritance ? { inheritance } : {}),
						...(namespace ? { namespace } : {}),
						// ...(item.type === "interface mixin" || item.partial === true ? { mixin: true } : {}),
						spec: url,
					});

					for (const member of item.members) {
						if (member.type === "operation") {
							jsFunctions.push({
								name: member.name,
								interface: item.name,
								...(member.special === "static" ? { static: true } : {}),
								spec: url,
							});
						} else if (["attribute", "const"].includes(member.type)) {
							jsAttributes.push({
								name: member.name,
								interface: item.name,
								...(member.type === "const" || member.special === "static" ? { static: true } : {}),
								spec: url,
							});
						}
					}
				}
			}
		}
	}

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
}


await Deno.writeTextFile(new URL("./specs.json", import.meta.url), JSON.stringify({
	specs,
}, null, "\t"));

await Deno.writeTextFile(new URL("./css.json", import.meta.url), JSON.stringify({
	cssProperties,
}, null, "\t"));

await Deno.writeTextFile(new URL("./js.json", import.meta.url), JSON.stringify({
	jsInterfaces,
	jsAttributes,
	jsFunctions,
}, null, "\t"));

export { };
