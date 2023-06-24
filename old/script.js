
/// <reference types="new-javascript" />
// @ts-nocheck

await Promise.all([
	(async () => {
		// CSS Working Group:

		const html = await (await window.fetch("https://w3c.github.io/csswg-drafts/", { cache: "reload" })).text();
		const doc = new DOMParser().parseFromString(html, "text/html");
		const list = document.querySelector(".csswg");
		const templateContent = list.querySelector(":scope > template").content;

		for (const anchor of doc.querySelectorAll("body > ul > li > ul > li > a")) {
			const id = anchor.getAttribute("href").match(/[\w-]+/)[0];
			const { id: idWithoutLevel, level } = id.match(/^(?<id>(\w|(-(?!\d+$)))+)(-(?<level>\d+))?$/).groups;
			const name = anchor.innerText;
			const url = `https://w3c.github.io/csswg-drafts/${id}/`;
			const clone = templateContent.cloneNode(true);
			clone.querySelector(".link > strong").textContent = idWithoutLevel;
			if (level) clone.querySelector(".link").append(document.createTextNode(`-${level}`));
			clone.querySelector(".link").href = url;
			clone.querySelector(".name").textContent = name;
			list.append(clone);
		}
	})(),
	(async () => {
		// CSS-SVG Effects Task Force:

		const html = await (await window.fetch("https://drafts.fxtf.org/", { cache: "reload" })).text();
		const doc = new DOMParser().parseFromString(html, "text/html");
		const list = document.querySelector(".fxtf");
		const templateContent = list.querySelector(":scope > template").content;

		for (const anchor of doc.querySelectorAll("#spec_table > tbody > tr[data-path] > td:first-child > a")) {
			const id = anchor.getAttribute("href").match(/[\w-]+/)[0];
			const { id: idWithoutLevel, level } = id.match(/^(?<id>(\w|(-(?!\d+$)))+)(-(?<level>\d+))?$/).groups;
			const name = anchor.innerText;
			const url = `https://drafts.fxtf.org/${id}/`;
			const clone = templateContent.cloneNode(true);
			clone.querySelector(".link > strong").textContent = idWithoutLevel;
			if (level) clone.querySelector(".link").append(document.createTextNode(`-${level}`));
			clone.querySelector(".link").href = url;
			clone.querySelector(".name").textContent = name;
			list.append(clone);
		}
	})(),
	(async () => {
		// CSS Houdini Task Force:

		const html = await (await window.fetch("https://drafts.css-houdini.org/", { cache: "reload" })).text();
		const doc = new DOMParser().parseFromString(html, "text/html");
		const list = document.querySelector(".houdini");
		const templateContent = list.querySelector(":scope > template").content;

		for (const anchor of doc.querySelectorAll("#spec_table > tbody > tr[data-path] > td:first-child > a")) {
			const id = anchor.getAttribute("href").match(/[\w-]+/)[0];
			const { id: idWithoutLevel, level } = id.match(/^(?<id>(\w|(-(?!\d+$)))+)(-(?<level>\d+))?$/).groups;
			const name = anchor.innerText;
			const url = `https://drafts.css-houdini.org/${id}/`;
			const clone = templateContent.cloneNode(true);
			clone.querySelector(".link > strong").textContent = idWithoutLevel;
			if (level) clone.querySelector(".link").append(document.createTextNode(`-${level}`));
			clone.querySelector(".link").href = url;
			clone.querySelector(".name").textContent = name;
			list.append(clone);
		}
	})(),
	(async () => {
		// CSS Houdini Task Force:

		const html = await (await window.fetch("https://spec.whatwg.org/", { cache: "reload" })).text();
		const doc = new DOMParser().parseFromString(html, "text/html");
		const list = document.querySelector(".whatwg");
		const templateContent = list.querySelector(":scope > template").content;

		for (const anchor of doc.querySelectorAll("body > dl > dt > a:first-of-type")) {
			const id = anchor.getAttribute("href").match(/https:\/\/([\w-]+)/)[1];
			const name = anchor.innerText;
			const url = `https://${id}.spec.whatwg.org/`;
			const clone = templateContent.cloneNode(true);
			clone.querySelector(".link > strong").textContent = id;
			clone.querySelector(".link").href = url;
			clone.querySelector(".name").textContent = name;
			list.append(clone);
		}
	})(),
]);


$: {
	const /** @type {HTMLInputElement} */ searchBox = document.querySelector("input[type=search]");

	if (!CSS.highlights) {
		searchBox.hidden = true;
		break $;
	};

	searchBox.focus();

	window.addEventListener("keypress", () => {
		searchBox.focus();
	});

	const textNodes = (() => {
		const nodeArray = [];
		const iterator = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT)
		let /** @type {Node} */ node;
		while (node = iterator.nextNode()) if (node.textContent.trim()) nodeArray.push(node);
		return nodeArray;
	})();

	const highlight = new Highlight();
	CSS.highlights.set("search", highlight);

	searchBox.addEventListener("input", function () {
		highlight.clear();
		let /** @type {number} */ index;
		let firstMatch = true;
		for (const node of textNodes) {
			if ((index = node.textContent.toLowerCase().replaceAll(/[^\w]/g, " ").indexOf(this.value.toLowerCase().replaceAll(/[^\w]/g, " "))) >= 0) {
				const range = new Range();
				range.setStart(node, index);
				range.setEnd(node, index + this.value.length);
				highlight.add(range);
				if (firstMatch) HTMLElement.prototype.scrollIntoViewIfNeeded
					? node.parentElement.scrollIntoViewIfNeeded(true)
					: node.parentElement.scrollIntoView({ block: "center" });
				firstMatch = false;
			}
		}
	})
}

export { };
