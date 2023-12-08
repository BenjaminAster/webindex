
/// <reference types="better-typescript" />
/// <reference types="deno-types" />

import manualData from "../manual-data.ts";

// @ts-ignore
import { DOMParser as _DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";
const DOMParser: typeof globalThis.DOMParser = _DOMParser;

/*
deno run --allow-net --allow-read --allow-write=. index/groups/generate-groups-overview.deno.ts
*/

const fetchOptions: RequestInit = { cache: "default" };

const fetchJson = async (url: string) => await (await globalThis.fetch(url, fetchOptions)).json();

const getIETFWGs = async () => {
	let groups = [];
	{
		const html = await (await globalThis.fetch("https://datatracker.ietf.org/wg/")).text();
		const doc = new DOMParser().parseFromString(html, "text/html");
		for (const element of doc.querySelectorAll("#content > table.table.table-sm.table-striped.tablesorter > tbody > tr")) {
			const id = element.children[0].textContent.trim();
			let name = element.children[2].textContent.trim();
			if (!name.endsWith(" Working Group")) name += " Working Group";
			groups.push({
				name,
				identifier: `ietf/${id}`,
				homepage: `https://datatracker.ietf.org/wg/${id}/`,
			});
		}
	}
	{
		const html = await (await globalThis.fetch("https://datatracker.ietf.org/group/concluded/")).text();
		const doc = new DOMParser().parseFromString(html, "text/html");
		for (const element of doc.querySelectorAll("#content > table.table.table-sm.table-striped.tablesorter > tbody > tr")) {
			const id = element.children[0].textContent.trim();
			let name = element.children[1].textContent.trim();
			if (!name.endsWith(" Working Group")) name += " Working Group";
			groups.push({
				name,
				identifier: `ietf/${id}`,
				homepage: `https://datatracker.ietf.org/wg/${id}/`,
			});
		}
	}
	return groups;
};

const initialGroupsData = [
	...await fetchJson("https://w3c.github.io/groups/identifiers.json"),
	// ...manualData.closedW3CGroupIdentifiers.map((identifier) => ({ identifier })),
	...await getIETFWGs(),
	...manualData.additionalGroups,
];

const groups = [];

for (let { identifier, name, homepage } of initialGroupsData) {
	if (!name || !homepage) {
		({ name, _links: { homepage: { href: homepage = undefined } = {} } = {} } = (
			await fetchJson(`https://w3c.github.io/groups/${identifier}/group.json`)
		));
		homepage ||= `https://www.w3.org/groups/${identifier}/`;
	}

	groups.push({
		name,
		identifier,
		homepage,
	});

	console.log(`added ${name} (${identifier})`);
}

await Deno.writeTextFile(new URL("./groups.json", import.meta.url), JSON.stringify({ groups }, null, "\t"));

export { };
