
/// <reference types="better-typescript" />
/// <reference types="deno-types" />

/* 
deno run --allow-net --allow-read --allow-write=. index/new/generate.deno.ts
*/

// @ts-ignore
import { DOMParser as _DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";
const DOMParser: typeof globalThis.DOMParser = _DOMParser;

const title = new DOMParser().parseFromString(await (await self.fetch(
	// "https://developers.google.com/speed/webp/docs/webp_lossless_bitstream_specification",
	"https://github.com/googlefonts/colr-gradients-spec/blob/main/OFF_AMD2_WD.md",
	// "http://localhost/webindex/",
	{
		headers: {
			"accept": "text/html;q=0.9",
			// "accept-encoding": "gzip, deflate, br",
			"accept-language": "en-US,en;q=0.9",
			// "cache-control": "no-cache",
			// "Sec-Ch-Ua": '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
			// "Sec-Ch-Ua-Arch": '"x86"',
			// "Sec-Ch-Ua-Bitness": '"64"',
			// "Sec-Ch-Ua-Full-Version-List": '"Google Chrome";v="117.0.5897.4", "Not;A=Brand";v="8.0.0.0", "Chromium";v="117.0.5897.4"',
			// "Sec-Ch-Ua-Mobile": '?0',
			// "Sec-Ch-Ua-Model": '""',
			// "Sec-Ch-Ua-Platform": '"Windows"',
			// "Sec-Ch-Ua-Platform-Version": '"14.0.0"',
			// "Sec-Ch-Ua-Wow64": '?0',
			// "Sec-Fetch-Dest": 'document',
			// "Sec-Fetch-Mode": 'navigate',
			// "Sec-Fetch-Site": 'none',
			// "Sec-Fetch-User": '?1',
			// "Upgrade-Insecure-Requests": '1',
			// "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
		},
	},
)).text(), "text/html").title.trim();

console.log(title);
