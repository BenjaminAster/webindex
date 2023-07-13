
/// <reference types="better-typescript" />
/// <reference types="deno-types" />

/* 
deno run --unstable --allow-net --allow-read --allow-write=. index/all-w3c-repos.deno.ts
*/

// @ts-ignore
import { DOMParser as _DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";
const DOMParser: typeof globalThis.DOMParser = _DOMParser;

const getAllRepos = async (githubUsername: string) => {
	let repoNames: string[] = [];
	$pageLoop: for (let page = 1; true; page++) {
		// the GitHub API limits the amount of repositories
		const response = await globalThis.fetch(`https://github.com/orgs/${githubUsername}/repositories?sort=name&page=${page}`);
		const html = await response.text();
		const doc = new DOMParser().parseFromString(html, "text/html");
		const listItems = doc.querySelectorAll(".repo-list > div > ul > li");
		if (!listItems.length) break $pageLoop;
		$itemLoop: for (const listItem of listItems) {
			if (listItem.querySelector(".Label--attention")) continue $itemLoop; // repo archived
			const anchor = listItem.querySelector("h3 a");
			const repoName = anchor.textContent.trim();
			repoNames.push(`https://github.com/${githubUsername}/${repoName}`);
			console.log(repoName);
		}
	}
	return repoNames.toSorted();
}

const w3cRepos = await getAllRepos("w3c");
await Deno.writeTextFile(new URL("./w3c-repos.json", import.meta.url), JSON.stringify(w3cRepos, null, "\t"));

