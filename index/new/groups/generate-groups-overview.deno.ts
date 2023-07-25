
/// <reference types="better-typescript" />
/// <reference types="deno-types" />

import manualData from "../manual-data.ts";

/*
deno run --allow-net --allow-read --allow-write=. index/new/groups/generate-groups-overview.deno.ts
*/

const fetchOptions: RequestInit = { cache: "default" };

const fetchJson = async (url: string) => await (await globalThis.fetch(url, fetchOptions)).json();

const getIETFWGs = async () => {
	return []
};

const groupIdentifiers = [...await fetchJson("https://w3c.github.io/groups/identifiers.json"), ...await getIETFWGs(), ...manualData.newGroups];

const groups = [];

for (let { identifier, name, homepage } of groupIdentifiers) {
	if (!name || !homepage) {
		({ name, _links: { homepage: { href: homepage = undefined } = {} } = {} } = (
			await fetchJson(`https://w3c.github.io/groups/${identifier}/group.json`)
		));
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
