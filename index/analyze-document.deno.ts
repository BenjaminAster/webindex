
// @ts-ignore
import { parse as parseIDL } from "npm:webidl2@24.4.0";

export const collectedStuff = {
	cssProperties: [],
};

export const analyzeDocument = (doc: Document, { specUrl }: { specUrl: string }) => {
	{
		// CSS

		{
			// CSS properties

			$loop: for (const tbody of doc.querySelectorAll("table.def.propdef > tbody")) {
				if (tbody.closest(".issue")) continue $loop;
				const propertyEl = tbody.querySelector(":scope > tr:first-of-type > td:first-of-type > :is(dfn, .css)");
				const propertyName = propertyEl.textContent.trim();
				const linkId = propertyEl.getAttribute("id");

				collectedStuff.cssProperties.push({
					name: propertyName,
					id: linkId,
					spec: specUrl,
				});
			}
		}
	}
};
