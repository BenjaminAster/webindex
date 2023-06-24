
/// <reference types="better-typescript" />
/// <reference types="deno-types" />

/* 

deno run --unstable --allow-net --allow-read --allow-write=. index/generate.deno.ts

*/

// @ts-ignore
import { DOMParser as _DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";
const DOMParser: typeof globalThis.DOMParser = _DOMParser;

declare global {
	interface ArrayConstructor {
		fromAsync<T>(asyncIterable: AsyncIterable<T>): Promise<T[]>;
	}
}

{
	// Polyfills:

	Array.fromAsync ??= async function <T>(sourceIterable: AsyncIterable<T>) {
		let returnArray: T[] = [];
		for await (const item of sourceIterable) {
			returnArray.push(item);
		}
		return returnArray;
	}
}

let list: { name: string, specs: { name: string, url: string }[] }[] = [];

await Promise.all([
	(async () => {
		// WHATWG:

		const html = await (await window.fetch("https://spec.whatwg.org/", { cache: "reload" })).text();
		const doc = new DOMParser().parseFromString(html, "text/html");

		const specs = await Array.fromAsync((async function* () {
			for (const anchor of doc.querySelectorAll("body > dl > dt > a:first-of-type")) {
				const { id } = anchor.getAttribute("href").match(/^https:\/\/(?<id>[\w-]+)\.spec\.whatwg\.org\//).groups;
				yield {
					name: anchor.innerText,
					url: `https://${id}.spec.whatwg.org/`,
				};
			}
		})());

		list.push({
			name: "Web Hypertext Application Technology Working Group (WHATWG)",
			specs,
		});
	})(),
	// (async () => {
	// 	// W3C Working Groups

	// 	const html = await (await window.fetch("https://www.w3.org/groups/wg/", { cache: "reload" })).text();
	// 	const doc = new DOMParser().parseFromString(html, "text/html");

	// 	for (const anchor of doc.querySelectorAll(".group-list > card a.card__link")) {
	// 		const groupName = anchor.innerText;
	// 		const { id } = anchor.getAttribute("href").match(/\/groups\/wg\/(?<id>[\w-]+)\/$/).groups;
	// 		const groupHTML = await (await globalThis.fetch(`https://www.w3.org/groups/wg/${id}/publications/`, { cache: "reload" })).text();
	// 		const groupDoc = new DOMParser().parseFromString(groupHTML, "text/html");
	// 		for (const specAnchor of groupDoc.querySelectorAll(".tr-list > .maturity-grouping > .tr-list__item > .tr-list__item__header > h3 > a"))
	// 		return {
	// 			name: anchor.innerText,
	// 			url: `https://${id}.spec.whatwg.org/`,
	// 		}
	// 	}
	// })(),
	(async () => {
		// W3C

		const groupIdentifiers = await (await window.fetch("https://w3c.github.io/groups/identifiers.json", { cache: "reload" })).json();

		const tmp = await Array.fromAsync((async function* () {
			$groupsLoop: for (const { identifier } of groupIdentifiers) {
				yield (async () => {
					const { name } = await (await globalThis.fetch(`https://w3c.github.io/groups/${identifier}/group.json`, { cache: "reload" })).json();
					try {
						const repositories = await (await globalThis.fetch(`https://w3c.github.io/groups/${identifier}/repositories.json`, { cache: "reload" })).json();

						const specs = await Array.fromAsync((async function* () {
							$reposLoop: for (const { name: repoName, homepageUrl, isArchived, owner: { login } } of repositories) {
								if (isArchived || !homepageUrl) continue $reposLoop;
								yield {
									name: repoName,
									url: homepageUrl.startsWith("https://www.w3.org/") ? `https://${login}.github.io/${repoName}/` : homepageUrl,
								};
							}
						})());

						return specs;
					} catch {
						// continue $groupsLoop;
					}
				})();
			}
		})());

		console.log(tmp);

		// const html = await (await window.fetch("https://w3c.github.io/groups/all-repositories.json", { cache: "reload" })).json();


	})(),
]);

Deno.writeTextFile(new URL("./specs.json", import.meta.url), JSON.stringify(list, null, "\t"));
