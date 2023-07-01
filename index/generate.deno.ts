
/// <reference types="better-typescript" />
/// <reference types="deno-types" />

// @ ts-nocheck

/* 

deno run --unstable --allow-net --allow-read --allow-write=. index/generate.deno.ts

*/

// @ts-ignore
import { DOMParser as _DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";
const DOMParser: typeof globalThis.DOMParser = _DOMParser;

// @ts-ignore
import { parse as parseIDL } from "npm:webidl2@24.4.0";

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

const fetchJson = async (url: string) => await (await globalThis.fetch(url, fetchOptions)).json();

const domParser = new DOMParser();
const fetchDocument = async (url: string) => domParser.parseFromString(await (await globalThis.fetch(url, fetchOptions)).text(), "text/html");

let list: { name: string, homepage: string, identifier: string, specs: { name: string, url: string, repoUrl: string }[] }[] = [];


{
	// WHATWG:

	const specs: (typeof list)[number]["specs"] = [];

	{
		const doc = await fetchDocument("https://html.spec.whatwg.org/multipage/");

		let urls = new Set();

		specs.push({
			name: `HTML: Table of contents`,
			url: "https://html.spec.whatwg.org/multipage/",
			repoUrl: "https://github.com/whatwg/html",
		});

		const recursiveToc = (ol: HTMLOListElement) => {
			$loop: for (const li of ol.querySelectorAll(":scope > li")) {
				const anchor = li.querySelector(":scope > a[href]");
				const url = anchor.getAttribute("href").split("#")[0];
				let { name } = anchor.textContent.trim().match(/^(\d+(\.\d+)*) (?<name>.+)$/s)?.groups ?? {};
				if (!name) continue $loop;
				name = name.replaceAll(/\s+/g, " ");
				if (!urls.has(url)) {
					urls.add(url);
					specs.push({
						name: `HTML: ${name}`,
						url: new URL(url, "https://html.spec.whatwg.org/multipage/").href,
						repoUrl: "https://github.com/whatwg/html",
					});
				}
				const newOl = li.querySelector(":scope > ol");
				if (newOl) recursiveToc(newOl);
			}
		}

		recursiveToc(doc.querySelector("#contents + ol.toc"));
	}

	{
		const doc = await fetchDocument("https://spec.whatwg.org/");

		$specLoop: for (const anchor of doc.querySelectorAll("body > dl > dt > a:first-of-type")) {
			const { id } = anchor.getAttribute("href").match(/^https:\/\/(?<id>[\w-]+)\.spec\.whatwg\.org\//).groups;
			const repoUrl = `https://github.com/whatwg/${id}`;
			if (manualData.excludedRepos["whatwg"]?.includes(repoUrl)) continue $specLoop;
			specs.push({
				name: anchor.innerText,
				url: `https://${id}.spec.whatwg.org/`,
				repoUrl,
			});
		}
	}

	list.push({
		name: "Web Hypertext Application Technology Working Group",
		homepage: "https://whatwg.org/",
		identifier: "whatwg",
		specs,
	});
}
{
	// TC39:

	list.push({
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
	});
}
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
{
	// CSS

	const infos = [
		{
			name: "CSS Working Group",
			repoName: "csswg-drafts",
			identifier: "wg/css",
			draftsDomain: "drafts.csswg.org",
			homepage: "https://wiki.csswg.org/",
		},
		{
			name: "CSS-SVG Effects Task Force",
			repoName: "fxtf-drafts",
			identifier: "fxtf",
			draftsDomain: "drafts.fxtf.org",
			homepage: "https://www.w3.org/Graphics/fx/",
		},
		{
			name: "CSS-TAG Houdini Task Force",
			repoName: "css-houdini-drafts",
			identifier: "css-houdini",
			draftsDomain: "drafts.css-houdini.org",
			homepage: "https://github.com/w3c/css-houdini-drafts/wiki/",
		},
	];

	for (const { name, draftsDomain, repoName, homepage, identifier } of infos) {
		const doc = await fetchDocument(`https://${draftsDomain}/`);

		const specs = await Array.fromAsync((async function* () {
			$specLoop: for (const anchor of doc.querySelectorAll("#spec_table > tbody > tr[data-path] > td:first-child > a")) {
				const id = anchor.getAttribute("href").match(/^\/(?<id>[\w-]+)\/$/).groups.id;
				// const { id: idWithoutLevel, level } = id.match(/^(?<id>(\w|(-(?!\d+$)))+)(-(?<level>\d+))?$/).groups;
				const url = `https://${draftsDomain}/${id}/`;
				const repoUrl = `https://github.com/w3c/${repoName}/tree/main/${id}`;
				if (manualData.excludedRepos[identifier]?.includes(repoUrl)) continue $specLoop;
				yield {
					name: anchor.innerText,
					url,
					repoUrl,
				};
			}
		})());

		list.push({
			name,
			identifier,
			homepage,
			specs,
		});
	}
}
{
	// SVG

	const specs = [{
		name: "SVG Accessibility API Mappings",
		url: "https://w3c.github.io/svg-aam/",
		repoUrl: "https://github.com/w3c/svg-aam",
	}];

	{
		const doc = await fetchDocument("https://svgwg.org/svg-next/");
		const tocLi = doc.querySelector("nav#toc > ol.toc");
		specs.push({
			name: `SVG: Table of Contents`,
			url: "https://svgwg.org/svg-next/",
			repoUrl: `https://github.com/w3c/svgwg/tree/main/master`,
		});
		for (const linkEl of tocLi.querySelectorAll(":scope > li > .secno + a[href]")) {
			const chapterFileName = linkEl.getAttribute("href");
			specs.push({
				name: `SVG: ${linkEl.textContent.trim()}`,
				url: new URL(chapterFileName, "https://svgwg.org/svg-next/").href,
				repoUrl: `https://github.com/w3c/svgwg/blob/main/master/${chapterFileName}`,
			});
		}
	}

	{
		const doc = await fetchDocument("https://svgwg.org/");
		const specListEl = doc.querySelector("body > ul");
		for (const li of specListEl.querySelectorAll(":scope > li:not(:first-of-type)")) {
			console.log(li.textContent);
			const anchor = li.querySelector(":scope > a[href]:nth-child(1)");
			const url = new URL(anchor.getAttribute("href"), "https://svgwg.org/").href;
			const repoUrl = li.querySelector(":scope > a[href]:nth-child(2)").getAttribute("href");
			const name = anchor.textContent.trim().replaceAll(/( Editor's Draft$)/g, "");

			specs.push({
				name,
				url,
				repoUrl,
			});
		}
	}

	list.push({
		name: "Scalable Vector Graphics (SVG) Working Group",
		identifier: "wg/svg",
		homepage: "https://www.w3.org/Graphics/SVG/WG/wiki/Main_Page",
		specs,
	});
}
{
	// W3C & other organizations (e.g. Khronos, Alliance for Open Media, etc.)

	const groupIdentifiers = [...await fetchJson("https://w3c.github.io/groups/identifiers.json"), ...manualData.additionalGroups];

	$groupsLoop: for (let { identifier, name, homepage } of groupIdentifiers) {

		console.log(`group ${identifier}`);

		// if (excludedGroups.includes(identifier)) return {};
		if (excludedGroups.includes(identifier)) continue $groupsLoop;

		if (!name || !homepage) {
			({ name, _links: { homepage: { href: homepage = undefined } = {} } = {} } = (
				await fetchJson(`https://w3c.github.io/groups/${identifier}/group.json`)
			));
		}

		let repositories = await Promise.all(manualData.includedRepos[identifier]?.map(async (url) => {
			let { login, repoName, path, isFile } = url.match(/^https:\/\/github.com\/(?<login>[\w-]+)\/(?<repoName>[\w-]+)(\/(tree|(?<isFile>blob))\/(?<branch>[\w-]+)(\/(?<path>.*))?)?$/).groups;
			let homepageUrl = `https://${login.toLowerCase()}.github.io/${repoName}/${path ? (isFile ? path.replace(/(\.bs|\.html)$/, "") : `${path}/`) : ""}`;
			if (path?.endsWith(".md")) homepageUrl = url;
			return {
				name: path?.split("/").at(-1) || repoName,
				homepageUrl,
				repoUrl: url,
			}
		}) || []);

		try {
			repositories.push(...await fetchJson(`https://w3c.github.io/groups/${identifier}/repositories.json`));
		} catch { }

		// if (!(repositories?.length > 0)) return {};
		if (!(repositories?.length > 0)) continue $groupsLoop;

		const specs = await Array.fromAsync((async function* () {
			$reposLoop: for (let { name: repoName, homepageUrl, isArchived, isPrivate, owner: { login = undefined } = {}, repoUrl } of repositories) {
				if (isArchived || isPrivate) continue $reposLoop;
				repoUrl ||= `https://github.com/${login}/${repoName}`;
				if (!homepageUrl || manualData.ignoreHomepageUrl[identifier]?.includes(repoUrl) || homepageUrl.startsWith("https://www.w3.org/")) {
					// console.log(repoName, identifier, homepageUrl, login);
					homepageUrl = `https://${login.toLowerCase()}.github.io/${repoName}/`;
				}
				if (manualData.urlRewrites[identifier]?.[repoUrl]) {
					homepageUrl = manualData.urlRewrites[identifier]?.[repoUrl];
				}
				if (manualData.excludedRepos[identifier]?.includes(repoUrl)) continue $reposLoop;
				else if (homepageUrl.startsWith("http://")) homepageUrl = homepageUrl.replace("http://", "https://");
				else if (!homepageUrl.startsWith("https://")) homepageUrl = "https://" + homepageUrl;
				const response = await globalThis.fetch(homepageUrl, fetchOptions);
				if (!response.ok) continue $reposLoop;
				let doc = domParser.parseFromString(await response.text(), "text/html");
				let title = doc.title.trim() || repoName;
				if (title.match(/\b((working|community) group)\b/i)) continue $reposLoop;
				else if (homepageUrl.match(/^https:\/\/github.com\/.+\.md$/)) {
					let newTitle = doc.querySelector("#readme > .markdown-body :is(h1, h2, h3)").textContent.trim();
					if (newTitle) title = newTitle;
				}
				console.log(homepageUrl);
				yield {
					name: title,
					repoUrl,
					url: homepageUrl,
				};
			}
		})());

		// return { identifier, name, specs, homepage };

		if (specs?.length > 0) {
			console.log(`added group ${name} with ${specs.length} specs`);
			list.push({
				name,
				identifier,
				homepage,
				specs,
			});
		}
	}

	// console.log(tmp);

	// return tmp;

	// const html = await (await globalThis.fetch("https://w3c.github.io/groups/all-repositories.json", fetchOptions)).json();
}

Deno.writeTextFile(new URL("./specs.json", import.meta.url), JSON.stringify({
	timestamp: {
		iso: new Date().toISOString(),
		utc: new Date().toUTCString(),
		unix: Date.now(),
	},
	list,
}, null, "\t"));
