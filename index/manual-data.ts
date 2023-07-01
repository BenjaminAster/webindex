
export default {
	excludedGroups: [
		"wg/css",
		"wg/eowg",
		"cg/credibility",
		"cg/aria-at",
		"tf/wcag-act",
		"cg/a11y-discov-vocab",
		"wg/apa",
		"other/ab",
		"cg/audio-comgp",
		"cg/av4browsers",
		"wg/auto",
		"bg/autowebplatform",
		"cg/blockchain",
		"other/board",
		"cg/cssprint",
		"ig/chinese-web",
		"cg/cogai",
		"tf/cognitive-a11y-tf",
		"cg/colorweb",
		"cg/council",
		"cg/consent",
		"cg/conv",
		"cg/dpvcg",
		"wg/dx",
		"cg/epub3",
		"cg/equity",
		"cg/fed-id",
		"cg/font-text",
		"wg/htmlwg",
		"tf/i18n-hlreq",
		"bg/web-adv",
		"ig/i18n",
		"wg/i18n-core",
		"wg/json-ld",
		"tf/i18n-jlreq",
		"tf/low-vision-a11y-tf",
		"cg/mathml4",
		"ig/me",
		"cg/miniapps",
		"wg/miniapps",
		"cg/mixedreality",
		"tf/mobile-a11y-tf",
		"tf/i18n-mlreq",
		"cg/multicast",
		"cg/music-notation",
		"cg/n3-dev",
		"cg/opentrack",
		"cg/pwe",
		"ig/privacy",
		"bg/publishingbg",
		"cg/publishingcg",
		"wg/pm",
		"wg/rch",
		"cg/rdf-tests",
		"cg/rdf-dev",
		"wg/rdf-star",
		"cg/sparql-12",
		"cg/scholarlyhtml",
		"cg/hclscg",
		"tf/i18n-sealreq",
		"wg/sdw",
		"cg/sustyweb",
		"other/tag",
		"cg/tdmrep",
		"tf/i18n-tlreq",
		"wg/timed-text",
		"wg/vc",
		"cg/voiceinteraction",
		"cg/w3process",
		"ig/web-networks",
		"cg/webcomponents",
		"cg/webmediaapi",
		"ig/securepay",
		"cg/web-thing-protocol",
		"cg/wot",
		"ig/wot",
		"cg/wot-jp",
		"wg/wot",
		"cg/webextensions",
		"cg/webid",
		"wg/gpu",
		"wg/distributed-tracing",
		"wg/svg",
		"cg/webassembly",
	],
	additionalGroups: [
		{
			name: "Khronos Group",
			identifier: "khronos",
			homepage: "https://www.khronos.org/",
		},
		{
			name: "Alliance for Open Media",
			identifier: "aomedia",
			homepage: "https://aomedia.org/",
		},
	],
	excludedRepos: {
		"wg/css": [
			"https://github.com/w3c/csswg-drafts/tree/main/css-egg-1",
		],
		"fxtf": [
			"https://github.com/w3c/fxtf-drafts/tree/main/matrix",
		],
		"wg/ag": [
			"https://github.com/w3c/wcag-act-rules-cg",
			"https://github.com/w3c/wcag2ict",
		],
		"wg/audio": [
			"https://github.com/WebAudio/Audio-EQ-Cookbook"
		],
		"wg/math": [
			"https://github.com/w3c/mathml-docs",
		],
		"wg/svg": [
			"https://github.com/w3c/writing-accessible-svg"
		],
		// "cg/webassembly": [
		// 	"https://github.com/WebAssembly/annotations",
		// 	"https://github.com/WebAssembly/feature-detection",
		// 	"https://github.com/WebAssembly/profiles",
		// 	"https://github.com/WebAssembly/spec",
		// ],
		"wg/wasm": [
			"https://github.com/w3c/wasm-wg",
		],
		"wg/json-ld": [
			"https://github.com/w3c/json-ld-rc"
		],
		"wg/webapps": [
			"https://github.com/w3c/contact-picker",
		],
		"wg/das": [
			"https://github.com/w3c/wake-lock",
			"https://github.com/w3c/devicesensors-wg",
		],
		"cg/gpu": [
			"https://github.com/gpuweb/cts",
		],
		"wg/gpu": [
			"https://github.com/gpuweb/cts",
		],
		"cg/immersive-web": [
			"https://github.com/immersive-web/webvr-polyfill-dpdb",
			"https://github.com/immersive-web/webxr-input-profiles",
			"https://github.com/immersive-web/geo-alignment",
			"https://github.com/immersive-web/immersive-web-weekly",
			"https://github.com/immersive-web/webvr-polyfill",
			"https://github.com/immersive-web/webxr-layers-polyfill",
		],
		"wg/immersive-web": [
			"https://github.com/immersive-web/immersiveweb.dev",
			"https://github.com/immersive-web/webxr-test-api",
		],
		"tf/silver-tf": [
			"https://github.com/w3c/silver",
		],
		"wg/aria": [
			"https://github.com/w3c/aria-practices",
		],
		"cg/audio-comgp": [
			"https://github.com/WebAudio/Audio-EQ-Cookbook",
		],
		"cg/open-ui": [
			"https://github.com/openui/open-ui",
		],
		"wg/did": [
			"https://github.com/w3c/did-test-suite",
			"https://github.com/w3c/did-use-cases",
		],
		"cg/privacycg": [
			"https://github.com/privacycg/template",
		],
		"wg/webappsec": [
			"https://github.com/w3c/webappsec-cors-for-developers",
		],
		"wg/webfonts": [
			"https://github.com/w3c/IFT",
			"https://github.com/w3c/PFE-analysis",
		],
		"wg/webmachinelearning": [
			"https://github.com/webmachinelearning/webmachinelearning-ethics",
		],
		"wg/payments": [
			"https://github.com/w3c/webpayments",
			"https://github.com/w3c/webpayments-flows",
		],
		"cg/wicg": [
			"https://github.com/WICG/admin",
			"https://github.com/WICG/audio-focus",
			"https://github.com/WICG/capability-delegation",
			"https://github.com/WICG/controls-list",
			"https://github.com/WICG/devtools-protocol",
			"https://github.com/WICG/file-handling",
			"https://github.com/WICG/focus-visible",
			"https://github.com/WICG/import-maps",
			"https://github.com/WICG/inert",
			"https://github.com/WICG/media-latency-hint",
			"https://github.com/WICG/nav-speculation",
			"https://github.com/WICG/navigation-api",
			"https://github.com/WICG/origin-policy",
			"https://github.com/WICG/spatial-navigation",
			"https://github.com/WICG/starter-kit",
			"https://github.com/WICG/view-transitions",
			"https://github.com/WICG/webpackage",
			"https://github.com/WICG/webmonetization",
			"https://github.com/WICG/element-capture",
			"https://github.com/privacycg/CHIPS",
		],
		"whatwg": [
			"https://github.com/whatwg/html",
		],
	},
	includedRepos: {
		"khronos": [
			"https://github.com/KhronosGroup/WebGL/tree/main/specs/latest/1.0",
			"https://github.com/KhronosGroup/WebGL/tree/main/specs/latest/2.0",
		],
		"wg/webediting": [
			"https://github.com/w3c/editing/tree/gh-pages/docs/execCommand",
		],
		"cg/web-bluetooth": [
			"https://github.com/WebBluetoothCG/web-bluetooth",
		],
		"cg/webmachinelearning": [
			"https://github.com/webmachinelearning/model-loader",
		],
		"cg/gpu": [
			"https://github.com/gpuweb/gpuweb/tree/main/wgsl",
		],
		"cg/wicg": [
			"https://github.com/WICG/shape-detection-api/blob/main/text.bs",
			"https://github.com/WICG/capability-delegation/blob/main/spec.bs",
			"https://github.com/WICG/nav-speculation/blob/main/prefetch.bs",
			"https://github.com/WICG/nav-speculation/blob/main/prerendering.bs",
			"https://github.com/WICG/nav-speculation/blob/main/speculation-rules.bs",
			"https://github.com/WICG/nav-speculation/blob/main/no-vary-search.bs",
			"https://github.com/WICG/webpackage/blob/main/draft-yasskin-dispatch-web-packaging.md",
			"https://github.com/WICG/webpackage/blob/main/draft-yasskin-http-origin-signed-responses.md",
			"https://github.com/WICG/webpackage/blob/main/draft-yasskin-httpbis-origin-signed-exchanges-impl.md",
		],
		"cg/privacycg": [
			"https://github.com/privacycg/CHIPS/blob/main/README.md",
		],
		"tf/silver-tf": [
			"https://github.com/w3c/silver/tree/main/guidelines",
		],
		"wg/wasm": [
			"https://github.com/WebAssembly/spec/tree/main/document/core",
			"https://github.com/WebAssembly/spec/tree/main/document/js-api",
			"https://github.com/WebAssembly/spec/tree/main/document/web-api",
		],
		"cg/fedid": [
			"https://github.com/fedidcg/FedCM",
		],
		"wg/webfonts": [
			"https://github.com/w3c/woff/tree/main/woff1/spec/Overview.html"
		],
		"wg/media": [
			"https://github.com/w3c/audio-session",
		],
		"cg/sccg": [
			"https://github.com/screen-share/captured-mouse-events",
			"https://github.com/screen-share/element-capture",
			"https://github.com/screen-share/capture-all-screens",
		],
		"aomedia": [
			"https://github.com/AOMediaCodec/afgs1-spec",
			"https://github.com/AOMediaCodec/av1-hdr10plus",
			"https://github.com/AOMediaCodec/av1-isobmff",
			"https://github.com/AOMediaCodec/av1-spec",
			"https://github.com/AOMediaCodec/av1-mpeg2-ts",
			"https://github.com/AOMediaCodec/av1-avif",
			"https://github.com/AOMediaCodec/av1-rtp-spec",
		],
		"cg/patcg": [
			"https://github.com/patcg-individual-drafts/topics",
			"https://github.com/patcg-individual-drafts/private-aggregation-api",
		],
	},
	ignoreHomepageUrl: {
		"cg/gpu": [
			"https://github.com/gpuweb/gpuweb",
		],
		"cg/wicg": [
			"https://github.com/WICG/storage-buckets",
		],
	},
	urlRewrites: {
		"cg/wicg": {
			"https://github.com/WICG/webmonetization": "https://webmonetization.org/specification",
			"https://github.com/WICG/webpackage/blob/main/draft-yasskin-dispatch-web-packaging.md": "https://wicg.github.io/webpackage/draft-yasskin-dispatch-web-packaging",
			"https://github.com/WICG/webpackage/blob/main/draft-yasskin-http-origin-signed-responses.md": "https://wicg.github.io/webpackage/draft-yasskin-http-origin-signed-responses",
			"https://github.com/WICG/webpackage/blob/main/draft-yasskin-httpbis-origin-signed-exchanges-impl.md": "https://wicg.github.io/webpackage/draft-yasskin-httpbis-origin-signed-exchanges-impl",
			"https://github.com/WICG/csp-next": "https://wicg.github.io/csp-next/scripting-policy",
		},
		"wg/webperf": {
			"https://github.com/w3c/device-memory": "https://www.w3.org/TR/device-memory/",
		},
		"khronos": {
			"https://github.com/KhronosGroup/WebGL/tree/main/specs/latest/1.0": "https://registry.khronos.org/webgl/specs/latest/1.0/",
			"https://github.com/KhronosGroup/WebGL/tree/main/specs/latest/2.0": "https://registry.khronos.org/webgl/specs/latest/2.0/",
		},
		"wg/wasm": {
			"https://github.com/WebAssembly/spec/tree/main/document/core": "https://webassembly.github.io/spec/core/bikeshed/",
			"https://github.com/WebAssembly/spec/tree/main/document/js-api": "https://webassembly.github.io/spec/js-api/",
			"https://github.com/WebAssembly/spec/tree/main/document/web-api": "https://webassembly.github.io/spec/web-api/",
		},
	},
};
