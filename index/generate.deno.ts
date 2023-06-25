
/// <reference types="better-typescript" />
/// <reference types="deno-types" />

// @ ts-nocheck

/* 

deno run --unstable --allow-net --allow-read --allow-write=. index/generate.deno.ts

*/

// @ts-ignore
import { DOMParser as _DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";
const DOMParser: typeof globalThis.DOMParser = _DOMParser;

import manualData from "./manual-data.ts";
const { excludedGroups } = manualData;

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

let list: { name: string, homepage: string, specs: { name: string, url: string, repoUrl: string }[] }[] = (await Promise.all([
	(async function* () {
		// WHATWG:

		const html = await (await globalThis.fetch("https://spec.whatwg.org/", { cache: "reload" })).text();
		const doc = new DOMParser().parseFromString(html, "text/html");

		const specs = await Array.fromAsync((async function* () {
			for (const anchor of doc.querySelectorAll("body > dl > dt > a:first-of-type")) {
				const { id } = anchor.getAttribute("href").match(/^https:\/\/(?<id>[\w-]+)\.spec\.whatwg\.org\//).groups;
				yield {
					name: anchor.innerText,
					url: `https://${id}.spec.whatwg.org/`,
					repoUrl: `https://github.com/whatwg/${id}`,
				};
			}
		})());

		yield {
			name: "Web Hypertext Application Technology Working Group (WHATWG)",
			homepage: "https://whatwg.org",
			specs,
		};
	})(),
	(async function* () {
		// TC39:

		yield {
			name: "TC39",
			homepage: "https://tc39.es",
			specs: [
				{
					name: "ECMAScript",
					url: "https://tc39.es/ecma262/",
					repoUrl: "https://github.com/tc39/ecma262",
				},
				{
					name: "ECMAScript Internationalization API",
					url: "https://tc39.es/ecma402/",
					repoUrl: "https://github.com/tc39/ecma402",
				},
			],
		};
	})(),
	// (async () => {
	// 	// W3C Working Groups

	// 	const html = await (await globalThis.fetch("https://www.w3.org/groups/wg/", { cache: "reload" })).text();
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
	(async function* () {
		// CSS

		const infos = [
			{
				name: "CSS Working Group",
				repoName: "csswg-drafts",
				draftsDomain: "https://drafts.csswg.org",
				homepage: "https://wiki.csswg.org/",
			},
			{
				name: "CSS-SVG Effects Task Force",
				repoName: "fxtf-drafts",
				draftsDomain: "https://drafts.fxtf.org",
				homepage: "https://www.w3.org/Graphics/fx/",
			},
			{
				name: "CSS-TAG Houdini Task Force",
				repoName: "css-houdini-drafts",
				draftsDomain: "https://drafts.css-houdini.org",
				homepage: "https://github.com/w3c/css-houdini-drafts/wiki/",
			},
		];

		for (const { name, draftsDomain, repoName, homepage } of infos) {
			const html = await (await globalThis.fetch(draftsDomain, { cache: "reload" })).text();
			const doc = new DOMParser().parseFromString(html, "text/html");

			const specs = await Array.fromAsync((async function* () {
				for (const anchor of doc.querySelectorAll("#spec_table > tbody > tr[data-path] > td:first-child > a")) {
					const id = anchor.getAttribute("href").match(/^\/(?<id>[\w-]+)\/$/).groups.id;
					// const { id: idWithoutLevel, level } = id.match(/^(?<id>(\w|(-(?!\d+$)))+)(-(?<level>\d+))?$/).groups;
					const url = `${draftsDomain}/${id}/`;
					yield {
						name: anchor.innerText,
						url,
						repoUrl: `https://github.com/w3c/${repoName}/tree/main/${id}`,
					};
				}
			})());

			yield {
				name,
				homepage,
				specs,
			};
		}
	})(),
	(async function* () {
		// W3C

		const groupIdentifiers = await (await globalThis.fetch("https://w3c.github.io/groups/identifiers.json", { cache: "reload" })).json();

		$groupsLoop: for await (const { identifier, name, repositories, homepage } of groupIdentifiers.map(async ({ identifier }) => {
			if (excludedGroups.includes(identifier)) return {};

			const { name, _links: { homepage } } = await (await globalThis.fetch(`https://w3c.github.io/groups/${identifier}/group.json`, { cache: "reload" })).json();

			let repositories = await Promise.all(manualData.includedRepos[identifier]?.map(async (url) => {
				const { login, repoName, path } = url.match(/^https:\/\/github.com\/(?<login>[\w-]+)\/(?<repoName>[\w-]+)(\/tree\/(?<branch>[\w-]+)(\/(?<path>.*))?)?$/).groups;
				return {
					name: path?.split("/").at(-1) || repoName,
					homepageUrl: `https://${login}.github.io/${repoName}/${path ? `${path}/` : ""}`,
					repoUrl: url,
				}
			}) || []);

			try {
				repositories.push(...await (await globalThis.fetch(`https://w3c.github.io/groups/${identifier}/repositories.json`, { cache: "reload" })).json());
			} catch { }

			return { identifier, name, repositories, homepage };
		})) {
			if (!(repositories?.length > 0)) continue $groupsLoop;

			const specs = await Array.fromAsync((async function* () {
				$reposLoop: for (const { name: repoName, homepageUrl, isArchived, owner: { login = undefined } = {}, repoUrl } of repositories) {
					if (isArchived || !homepageUrl) continue $reposLoop;
					yield {
						name: repoName,
						repoUrl: repoUrl || `https://github.com/${login}/${repoName}`,
						url: homepageUrl.startsWith("https://www.w3.org/") ? `https://${login}.github.io/${repoName}/` : homepageUrl,
					};
				}
			})());

			if (specs.length > 0) yield {
				name,
				identifier,
				homepage,
				specs,
			};
		}

		// console.log(tmp);

		// return tmp;

		// const html = await (await globalThis.fetch("https://w3c.github.io/groups/all-repositories.json", { cache: "reload" })).json();
	})(),
].map(async (generator) => await Array.fromAsync(generator)))).flat();

Deno.writeTextFile(new URL("./specs.json", import.meta.url), JSON.stringify(list, null, "\t"));
