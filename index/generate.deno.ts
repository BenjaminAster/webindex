
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

const fetchOptions: RequestInit = { cache: "default" };

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

let list: { name: string, homepage: string, identifier: string, specs: { name: string, url: string, repoUrl: string }[] }[] = (await Promise.all([
	(async function* () {
		// WHATWG:

		const html = await (await globalThis.fetch("https://spec.whatwg.org/", fetchOptions)).text();
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
			name: "Web Hypertext Application Technology Working Group",
			homepage: "https://whatwg.org/",
			identifier: "whatwg",
			specs,
		};
	})(),
	(async function* () {
		// TC39:

		yield {
			name: "TC39",
			identifier: "tc39",
			homepage: "https://tc39.es/",
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

	// 	const html = await (await globalThis.fetch("https://www.w3.org/groups/wg/", fetchOptions)).text();
	// 	const doc = new DOMParser().parseFromString(html, "text/html");

	// 	for (const anchor of doc.querySelectorAll(".group-list > card a.card__link")) {
	// 		const groupName = anchor.innerText;
	// 		const { id } = anchor.getAttribute("href").match(/\/groups\/wg\/(?<id>[\w-]+)\/$/).groups;
	// 		const groupHTML = await (await globalThis.fetch(`https://www.w3.org/groups/wg/${id}/publications/`, fetchOptions)).text();
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
				identifier: "wg/css",
				draftsDomain: "https://drafts.csswg.org",
				homepage: "https://wiki.csswg.org/",
			},
			{
				name: "CSS-SVG Effects Task Force",
				repoName: "fxtf-drafts",
				identifier: "fxtf",
				draftsDomain: "https://drafts.fxtf.org",
				homepage: "https://www.w3.org/Graphics/fx/",
			},
			{
				name: "CSS-TAG Houdini Task Force",
				repoName: "css-houdini-drafts",
				identifier: "css-houdini",
				draftsDomain: "https://drafts.css-houdini.org",
				homepage: "https://github.com/w3c/css-houdini-drafts/wiki/",
			},
		];

		for (const { name, draftsDomain, repoName, homepage, identifier } of infos) {
			const html = await (await globalThis.fetch(draftsDomain, fetchOptions)).text();
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
				identifier,
				homepage,
				specs,
			};
		}
	})(),
	(async function* () {
		// W3C

		const groupIdentifiers = await (await globalThis.fetch("https://w3c.github.io/groups/identifiers.json", fetchOptions)).json();

		$groupsLoop: for await (const { identifier, name, specs, homepage } of groupIdentifiers.map(async ({ identifier }) => {
			if (excludedGroups.includes(identifier)) return {};

			const { name, _links: { homepage: { href: homepage = undefined } = {} } = {} } = (
				await (await globalThis.fetch(`https://w3c.github.io/groups/${identifier}/group.json`, fetchOptions)).json()
			);

			let repositories = await Promise.all(manualData.includedRepos[identifier]?.map(async (url) => {
				let { login, repoName, path, isFile } = url.match(/^https:\/\/github.com\/(?<login>[\w-]+)\/(?<repoName>[\w-]+)(\/(tree|(?<isFile>blob))\/(?<branch>[\w-]+)(\/(?<path>.*))?)?$/).groups;
				let homepageUrl = `https://${login}.github.io/${repoName}/${path ? (isFile ? path.replace(/(\.bs|\.html)$/, "") : `${path}/`) : ""}`;
				// if (path?.endsWith(".md")) homepageUrl = url;
				return {
					name: path?.split("/").at(-1) || repoName,
					homepageUrl,
					repoUrl: url,
				}
			}) || []);

			try {
				repositories.push(...await (await globalThis.fetch(`https://w3c.github.io/groups/${identifier}/repositories.json`, fetchOptions)).json());
			} catch { }

			if (!(repositories?.length > 0)) return {};

			const specs = await Array.fromAsync((async function* () {
				$reposLoop: for (let { name: repoName, homepageUrl, isArchived, isPrivate, owner: { login = undefined } = {}, repoUrl } of repositories) {
					if (isArchived || isPrivate) continue $reposLoop;
					repoUrl ||= `https://github.com/${login}/${repoName}`;
					if (!homepageUrl || manualData.ignoreHomepageUrl[identifier]?.includes(repoUrl)) {
						homepageUrl = `https://${login}.github.io/${repoName}/`;
					}
					if (manualData.excludedRepos[identifier]?.includes(repoUrl)) continue $reposLoop;
					if (homepageUrl.startsWith("https://www.w3.org/")) homepageUrl = `https://${login}.github.io/${repoName}/`;
					else if (homepageUrl.startsWith("http://")) homepageUrl = homepageUrl.replace("http://", "https://");
					else if (!homepageUrl.startsWith("https://")) homepageUrl = "https://" + homepageUrl;
					const response = await globalThis.fetch(homepageUrl, fetchOptions);
					if (!response.ok) continue $reposLoop;
					let doc = new DOMParser().parseFromString(await response.text(), "text/html");
					if (doc.querySelector("meta[http-equiv=refresh]")) {
						const link = doc.querySelector("meta[http-equiv=refresh]").getAttribute("content").match(/https:.+$/)[0];
						doc = new DOMParser().parseFromString(await (await globalThis.fetch(link, fetchOptions)).text(), "text/html");
					}
					let title = doc.title.trim() || repoName;
					if (title.match(/\b((working|community) group)\b/i)) continue $reposLoop;
					yield {
						name: title,
						repoUrl,
						url: homepageUrl,
					};
				}
			})());

			return { identifier, name, specs, homepage };
		})) {
			if (specs?.length > 0) yield {
				name,
				identifier,
				homepage,
				specs,
			};
		}

		// console.log(tmp);

		// return tmp;

		// const html = await (await globalThis.fetch("https://w3c.github.io/groups/all-repositories.json", fetchOptions)).json();
	})(),
].map(async (generator) => await Array.fromAsync(generator)))).flat();

Deno.writeTextFile(new URL("./specs.json", import.meta.url), JSON.stringify(list, null, "\t"));
