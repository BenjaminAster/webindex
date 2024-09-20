
export default {
	additionalGroups: [
		{
			name: "ORTC (Object Real-time Communications) Community Group",
			identifier: "cg/ortc",
			homepage: "https://www.w3.org/community/ortc/",
		},
		{
			name: "Media Resource In-band Tracks Community Group",
			identifier: "cg/inbandtracks",
			homepage: "https://www.w3.org/community/inbandtracks/",
		},
		{
			name: "XSLT Working Group",
			identifier: "wg/xslt",
			homepage: "https://www.w3.org/Style/XSL/",
		},
		{
			name: "XML Query Working Group",
			identifier: "wg/xml-query",
			homepage: "https://www.w3.org/XML/Query/",
		},
		{
			name: "XML Core Working Group",
			identifier: "wg/xml-core",
			homepage: "https://www.w3.org/XML/Core/",
		},
		{
			name: "Tracking Protection Working Group",
			identifier: "wg/tracking",
			homepage: "https://www.w3.org/2011/tracking-protection/",
		},
		{
			name: "Second Screen Working Group",
			identifier: "wg/secondscreen",
			homepage: "https://www.w3.org/groups/wg/secondscreen/",
		},
		{
			name: "Web Hypertext Application Technology Working Group",
			identifier: "whatwg",
			homepage: "https://whatwg.org/",
		},
		{
			name: "TC39",
			identifier: "tc39",
			homepage: "https://tc39.es/",
		},
		{
			name: "WebGL Working Group",
			identifier: "khronos/webgl",
			homepage: "https://www.khronos.org/webgl/",
		},
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
		{
			name: "Codec Working Group",
			identifier: "aomedia/cwg",
			homepage: "https://aomedia.org/about/#codec-working-group",
		},
		{
			name: "Storage and Transport Formats Working Group",
			identifier: "aomedia/stfwg",
			homepage: "https://aomedia.org/about/#storage-and-transport-formats-working-group",
		},
		{
			name: "Tab Atkins",
			identifier: "tabatkins",
			homepage: "https://github.com/tabatkins",
		},
		{
			name: "Harald Alvestrand",
			identifier: "haraldalvestrand",
			homepage: "https://github.com/alvestrand",
		},
		{
			name: "Google",
			identifier: "google",
			homepage: "https://developers.google.com/web",
		},
		{
			name: "Mozilla",
			identifier: "mozilla",
			homepage: "https://www.mozilla.org/en-US/about/",
		},
		{
			name: "DeWitt Clinton",
			identifier: "dewittclinton",
			homepage: "https://github.com/dewitt",
		},
		{
			name: "David Baron",
			identifier: "davidbaron",
			homepage: "https://github.com/dbaron",
		},
		{
			name: "FIDO2 Technical Working Group",
			identifier: "fido/fido2",
			homepage: "https://fidoalliance.org/members/working-groups/#fido2-technical-working-group",
		},
		{
			name: "Netscape",
			identifier: "netscape",
			homepage: "https://connect.netscape.com/",
		},
		{
			name: "CompuServe",
			identifier: "compuserve",
			homepage: "https://www.compuserve.com/",
		},
		{
			name: "Joint Photographic Experts Group",
			identifier: "jpeg",
			homepage: "https://jpeg.org/about.html",
		},
		{
			name: "Moving Picture Experts Group",
			identifier: "mpeg",
			homepage: "https://www.mpeg.org/",
		},
		{
			name: "Mark Nottingham",
			identifier: "marknottingham",
			homepage: "https://datatracker.ietf.org/person/mnot@mnot.net",
		},
		{
			name: "Larry Masinter",
			identifier: "larrymasinter",
			homepage: "https://datatracker.ietf.org/person/lmm@acm.org",
		},
		{
			name: "Dylan Cutler",
			identifier: "dylancutler",
			homepage: "https://datatracker.ietf.org/person/dylancutler@google.com",
		},
		{
			name: "David Benjamin",
			identifier: "davidbenjamin",
			homepage: "https://datatracker.ietf.org/person/davidben@google.com",
		},
	],
	groupRewrites: {
		"https://w3c.github.io/encrypted-media/": "wg/media",
		"https://w3c.github.io/webcrypto/": "wg/webappsec",
		"https://www.rfc-editor.org/rfc/rfc2397": "larrymasinter",
		"https://www.rfc-editor.org/rfc/rfc4120": "ietf/krb-wg",
		"https://w3c.github.io/touch-events/": "cg/touchevents",
		"https://w3c.github.io/DOM-Parsing/": "wg/webapps",
		"https://drafts.fxtf.org/compositing-1/": "wg/css",
		"https://drafts.fxtf.org/fill-stroke-3/": "wg/css",
		"https://w3c.github.io/webvtt/": "cg/texttracks",
		"https://w3c.github.io/mse-byte-stream-format-registry/": "wg/media",
		"https://w3c.github.io/mse-byte-stream-format-isobmff/": "wg/media",
		"https://w3c.github.io/mse-byte-stream-format-mp2t/": "wg/media",
		"https://w3c.github.io/mse-byte-stream-format-mpeg-audio/": "wg/media",
		"https://w3c.github.io/mse-byte-stream-format-webm/": "wg/media",
		"https://explainers-by-googlers.github.io/CHIPS-spec/draft-cutler-httpbis-partitioned-cookies.html": "dylancutler",
		"https://www.ietf.org/archive/id/draft-davidben-http-client-hint-reliability-03.html": "davidbenjamin",
		"https://www.ietf.org/archive/id/draft-zern-webp-15.html": "google",
		"https://www.rfc-editor.org/rfc/rfc6386": "google",
		"https://httpwg.org/specs/rfc8288.html": "marknottingham",
		"https://w3c.github.io/openscreenprotocol/": "wg/secondscreen",
		"https://registry.khronos.org/OpenGL/specs/es/3.2/GLSL_ES_Specification_3.20.html": "khronos",
		"https://www.rfc-editor.org/rfc/rfc7932": "ietf/appsawg",
		"https://www.rfc-editor.org/rfc/rfc8878": "ietf/appsawg",
	},
	additionalSpecs: [
		{ repo: "https://github.com/w3c/mathml", group: "wg/math" },
		{ repo: "https://github.com/w3c/mediacapture-extensions", group: "wg/webrtc" },
		{ repo: "https://github.com/w3c/webappsec-cowl", group: "wg/webappsec" },
		{ repo: "https://github.com/w3c/webappsec-suborigins", group: "wg/webappsec" },
		{ repo: "https://github.com/w3c/webappsec-uisecurity", group: "wg/webappsec" },
		{ repo: "https://github.com/w3c/webrtc-extensions", group: "wg/webrtc" },
		{ repo: "https://github.com/w3c/webrtc-provisional-stats", group: "wg/webrtc" },
		{ repo: "https://github.com/w3c/xml-entities", group: "wg/math" },
		{ repo: "https://github.com/w3c/dpub-aria", group: "wg/aria" },
		{ repo: "https://github.com/w3c/dpub-aam", group: "wg/aria" },
		{ repo: "https://github.com/w3c/webpayments-crypto", group: "wg/payments" },
		{ repo: "https://github.com/w3c/webpayments-http-messages", group: "wg/payments" },
		{ repo: "https://github.com/w3c/webpayments-methods-tokenization", group: "wg/payments" },
		{ repo: "https://github.com/w3c/p2p-webtransport", group: "cg/ortc" },
		{ repo: "https://github.com/w3c/p2p-webtransport/blob/master/cs.html", group: "cg/ortc", shortname: "p2p-webtransport-cs" },
		{ repo: "https://github.com/w3c/ortc", url: "https://draft.ortc.org/", group: "cg/ortc", shortname: "ortc" },
		// { repo: "https://github.com/WICG/WebApiDevice/tree/main/device_attributes", group: "cg/wicg" },
		// { repo: "https://github.com/WICG/aom/tree/gh-pages/spec", group: "cg/wicg", shortname: "aom" },
		// { repo: "https://github.com/WICG/aom/blob/gh-pages/spec/aria-reflection.bs", group: "cg/wicg", shortname: "aom/aria-reflection" },
		// { repo: "https://github.com/WICG/aom/blob/gh-pages/spec/custom-element-semantics.bs", group: "cg/wicg", shortname: "aom/custom-element-semantics" },
		// { repo: "https://github.com/WICG/aom/blob/gh-pages/spec/input-events.html", group: "cg/wicg", shortname: "input-events" },
		{ repo: "https://github.com/WICG/conditional-focus", group: "cg/wicg" },
		{ repo: "https://github.com/WICG/handwriting-recognition", group: "cg/wicg" },
		{ repo: "https://github.com/WICG/multicapture", group: "cg/wicg" },
		{ repo: "https://github.com/WICG/pending-beacon", group: "cg/wicg" },
		{ repo: "https://github.com/WICG/web-smart-card", group: "cg/wicg" },
		{ repo: "https://github.com/WICG/webpackage/blob/main/subresource-loading.html", group: "ietf/wpack" },
		{ repo: "https://github.com/WICG/webpackage/blob/main/draft-yasskin-dispatch-web-packaging.md", group: "ietf/wpack", shortname: "web-packaging" },
		{ repo: "https://github.com/WICG/webpackage/blob/main/draft-yasskin-http-origin-signed-responses.md", group: "ietf/wpack", shortname: "signed-http-exchanges" },
		{ repo: "https://github.com/WICG/webpackage/blob/main/draft-yasskin-httpbis-origin-signed-exchanges-impl.md", group: "ietf/wpack", shortname: "signed-http-exchanges-impl" },
		{ repo: "https://github.com/WICG/anonymous-iframe", group: "cg/wicg" },
		{ repo: "https://github.com/WICG/webmonetization", url: "https://webmonetization.org/specification/", group: "cg/wicg", shortname: "webmonetization" },
		{ repo: "https://github.com/webmachinelearning/model-loader", group: "cg/webmachinelearning" },
		{ repo: "https://github.com/wpack-wg/bundled-responses/blob/main/draft-ietf-wpack-bundled-responses.md", group: "ietf/wpack" },
		{ repo: "https://github.com/immersive-web/marker-tracking", group: "cg/immersive-web" },
		{ repo: "https://github.com/screen-share/capture-all-screens", group: "cg/sccg" },
		{ repo: "https://github.com/WICG/color-api", group: "cg/wicg" },
		{ repo: "https://github.com/WICG/controlled-frame", group: "cg/wicg" },
		{ repo: "https://github.com/tabatkins/css-toggle", group: "tabatkins" },
		{ repo: "https://github.com/tabatkins/specs/tree/gh-pages/css-stacking-context-1", group: "tabatkins" },
		{ repo: "https://github.com/alvestrand/mediacapture-transform/tree/chrome-96", url: "https://alvestrand.github.io/mediacapture-transform/chrome-96.html", group: "haraldalvestrand", shortname: "media-stream-track-generator" },
		{ url: "https://developers.google.com/speed/webp/docs/riff_container", group: "google", shortname: "webp-container" },
		{ url: "https://developers.google.com/speed/webp/docs/webp_lossless_bitstream_specification", group: "google", shortname: "webp-lossles-bitstream" },
		{ repo: "https://github.com/googlefonts/colr-gradients-spec/blob/main/OFF_AMD2_WD.md", url: "https://github.com/googlefonts/colr-gradients-spec/blob/main/OFF_AMD2_WD.md", group: "google", shortname: "colr-gradients" },
		{ repo: "https://github.com/w3c/HTMLSourcingInbandTracks", url: "https://dev.w3.org/html5/html-sourcing-inband-tracks/", group: "cg/inbandtracks", shortname: "sourcing-inband-tracks" },
		{ repo: "https://github.com/w3c/svgwg/tree/main/specs/streaming", url: "https://svgwg.org/specs/streaming/", group: "wg/svg", shortname: "svg-streaming" },
		// { repo: "https://github.com/w3c/svgwg/tree/main/specs/markers", url: "https://svgwg.org/specs/markers/", group: "wg/svg", shortname: "svg-markers" },
		{ repo: "https://github.com/w3c/svgwg/tree/main/specs/paths", url: "https://svgwg.org/specs/paths/", group: "wg/svg", shortname: "svg-paths" },
		// { url: "https://wiki.mozilla.org/APNG_Specification", group: "mozilla", shortname: "APNG" },
		{ repo: "https://github.com/w3c/css-houdini-drafts/tree/main/box-tree-api", url: "https://drafts.css-houdini.org/box-tree-api-1/", group: "wg/css" },
		{ url: "https://www.w3.org/TR/xml/", group: "wg/xml-core" },
		{ url: "https://www.w3.org/TR/xml-names/", group: "wg/xml-core" },
		{ repo: "https://github.com/w3c/qtspecs/tree/master/specifications/xslt-30", url: "https://www.w3.org/TR/xslt-30/", group: "wg/xslt" },
		{ repo: "https://github.com/w3c/qtspecs/tree/master/specifications/xpath-full-text-31", url: "https://www.w3.org/TR/xpath-31/", group: "wg/xml-query" },
		// { repo: "https://github.com/KhronosGroup/OpenGL-Registry/tree/main/specs/es/3.2", url: "https://registry.khronos.org/OpenGL/specs/es/3.2/GLSL_ES_Specification_3.20.html", group: "khronos", shortname: "GLSL-ES" },
		{ repo: "https://github.com/KhronosGroup/glTF-Registry/tree/main/specs/2.0", url: "https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html", group: "khronos", shortname: "glTF" },
		{ repo: "https://github.com/dewitt/opensearch", url: "https://github.com/dewitt/opensearch/blob/master/opensearch-1-1-draft-6.md", group: "dewittclinton", shortname: "opensearch" },
		{ repo: "https://github.com/dbaron/css-intrinsic-isize-props", group: "davidbaron" },
		{ repo: "https://github.com/dbaron/css-intrinsic-sizing-one-axis", group: "davidbaron" },
		{ url: "https://dbaron.org/css/intrinsic/", group: "davidbaron" },
		{ repo: "https://github.com/nokiatech/heif", url: "https://nokiatech.github.io/heif/technical.html", group: "mpeg", shortname: "HEIF" },
		// { url: "https://ijg.org/files/T-REC-T.871-201105-I!!PDF-E.pdf", group: "jpeg" },
		// { url: "https://ijg.org/files/Wallace.JPEG.pdf", group: "jpeg" },
		{ url: "https://www.w3.org/Graphics/JPEG/jfif3.pdf", group: "jpeg", shortname: "JPEG-file-format" },
		{ url: "https://www.w3.org/Graphics/JPEG/itu-t81.pdf", group: "jpeg", shortname: "JPEG-compression" },
		{ url: "https://arxiv.org/ftp/arxiv/papers/1908/1908.03565.pdf", group: "jpeg", shortname: "JPEG-XL" },
		{ url: "https://www.w3.org/Graphics/GIF/spec-gif87.txt", group: "compuserve", shortname: "GIF-87a" },
		// { url: "http://www.vurdalakov.net/misc/gif/netscape-looping-application-extension/", group: "netscape", shortname: "GIF-extension-looping" },
		// TODO: more FIDO specs at https://fidoalliance.org/specs/
		// TODO: more image, audio, video, font, ... formats
		{ url: "https://ecma-international.org/wp-content/uploads/ECMA-404_2nd_edition_december_2017.pdf", group: "tc39", shortname: "json" },
	],
	titleRewrites: {
		"jpeg": {
			"https://www.w3.org/Graphics/JPEG/jfif3.pdf": "JPEG File Interchange Format",
			"https://www.w3.org/Graphics/JPEG/itu-t81.pdf": "Digital compression and coding of continuous-tone still images",
			"https://arxiv.org/ftp/arxiv/papers/1908/1908.03565.pdf": "JPEG XL image coding system",
		},
		"compuserve": {
			"https://www.w3.org/Graphics/GIF/spec-gif87.txt": "Graphics Interchange Format (GIF) version 87a",
		},
		"google": {
			"https://developers.google.com/speed/webp/docs/riff_container": "WebP Container Specification",
			"https://developers.google.com/speed/webp/docs/webp_lossless_bitstream_specification": "WebP Lossles Bitstream Specification",
			"https://github.com/googlefonts/colr-gradients-spec/blob/main/OFF_AMD2_WD.md": "COLRv1 Color Gradient Vector Fonts",
		},
		"mozilla": {
			"https://wiki.mozilla.org/APNG_Specification": "APNG Specification",
		},
		"dewittclinton": {
			"https://github.com/dewitt/opensearch/blob/master/opensearch-1-1-draft-6.md": "OpenSearch Specification",
		},
		"netscape": {
			"http://www.vurdalakov.net/misc/gif/netscape-looping-application-extension/": "Netscape Looping Application GIF Extension",
		},
		"wg/service-workers": {
			"https://w3c.github.io/ServiceWorker/": "Service Workers",
		},
		"tc39": {
			"https://tc39.es/proposal-intl-numberformat-v3/out/negotiation/proposed.html": "Intl.NumberFormat V3: Locale and Parameter Negotiation",
			"https://tc39.es/proposal-intl-numberformat-v3/out/numberformat/proposed.html": "Intl.NumberFormat V3: NumberFormat",
			"https://tc39.es/proposal-intl-numberformat-v3/out/pluralrules/proposed.html": "Intl.NumberFormat V3: PluralRules",
			"https://ecma-international.org/wp-content/uploads/ECMA-404_2nd_edition_december_2017.pdf": "The JSON Data Interchange Syntax",
		},
		"wg/webauthn": {
			"https://w3c.github.io/webauthn/": "Web Authentication",
		},
	},
	repoRewrites: {
		"khronos": {
			"https://registry.khronos.org/OpenGL/specs/es/3.2/GLSL_ES_Specification_3.20.html": "https://github.com/KhronosGroup/OpenGL-Registry/tree/main/specs/es/3.2",
		},
		"cg/wicg": {
			"https://wicg.github.io/WebApiDevice/device_attributes/": "https://github.com/WICG/WebApiDevice/tree/main/device_attributes",
		},
	},
	excludedSpecs: [
		"https://www.w3.org/TR/DOM-Level-2-Style/",
		"https://tc39.es/proposal-change-array-by-copy/",
		"https://tc39.es/proposal-array-find-from-last/",
		"https://tc39.es/proposal-symbols-as-weakmap-keys/",
		"https://tc39.es/proposal-is-usv-string/",
		"https://tc39.es/proposal-atomics-wait-async/",
		"https://tc39.es/proposal-intl-numberformat-v3/out/annexes/proposed.html",
		"https://tc39.es/proposal-array-grouping/",
		"https://www.w3.org/TR/CSS21/",
		"https://sourcemaps.info/spec.html",
		"https://w3c.github.io/fingerprinting-guidance/",
		"https://www.w3.org/2001/tag/doc/promises-guide",
		"https://www.w3.org/Consortium/Patent-Policy/",
		"https://www.w3.org/Consortium/Process/",
		"https://www.w3.org/TR/test-methodology/",
		"https://www.w3.org/TR/SVG11/",
		"https://drafts.csswg.org/css-2022/",
		"https://drafts.csswg.org/css-2023/",
		"https://drafts.csswg.org/css-2024/",
		"https://wicg.github.io/close-watcher/",
		"https://wicg.github.io/urlpattern/",
		"https://wicg.github.io/sanitizer-api/",
		"https://www.iso.org/standard/54989.html",
		"https://www.iso.org/standard/85253.html",
		"https://www.iso.org/standard/87621.html",
		"https://wicg.github.io/digital-identities/",
	],
	specURLRewrites: {
		"wg/css": {
			"https://drafts.css-houdini.org/css-animationworklet-1/": "https://drafts.css-houdini.org/css-animation-worklet-1/",
			"https://drafts.csswg.org/css-style-attr/": "https://drafts.csswg.org/css-style-attr-1/",
			"https://drafts.csswg.org/css-viewport/": "https://drafts.csswg.org/css-viewport-1/",
			"https://drafts.csswg.org/css-color-hdr/": "https://drafts.csswg.org/css-color-hdr-1/",
		},
	},
	specsExcludedFromCSS: [
		"https://drafts.csswg.org/css2/",
		"https://aomediacodec.github.io/av1-avif/",
		"https://aomediacodec.github.io/av1-isobmff/",
		"https://w3c.github.io/webappsec-upgrade-insecure-requests/",
		"https://w3c.github.io/webappsec-upgrade-insecure-requests/",
		"https://aomediacodec.github.io/av1-hdr10plus/",
		"https://aomediacodec.github.io/av1-isobmff/",
		"https://aomediacodec.github.io/av1-spec/",
		"https://aomediacodec.github.io/av1-mpeg2-ts/",
		"https://aomediacodec.github.io/av1-avif/",
		"https://aomediacodec.github.io/av1-rtp-spec/",
		"https://aomediacodec.github.io/afgs1-spec/",
		"https://www.w3.org/Graphics/JPEG/jfif3.pdf",
		"https://www.w3.org/Graphics/JPEG/itu-t81.pdf",
		"https://arxiv.org/ftp/arxiv/papers/1908/1908.03565.pdf",
		"https://www.w3.org/Graphics/GIF/spec-gif87.txt",
		"https://www.w3.org/Graphics/GIF/spec-gif89a.txt",
		"http://www.vurdalakov.net/misc/gif/netscape-looping-application-extension/",
		"https://nokiatech.github.io/heif/technical.html",
		"https://ecma-international.org/wp-content/uploads/ECMA-404_2nd_edition_december_2017.pdf",
		"https://webassembly.github.io/branch-hinting/core/bikeshed/",
		"https://webassembly.github.io/extended-const/core/bikeshed/",
		"https://webassembly.github.io/function-references/core/bikeshed/",
		"https://webassembly.github.io/gc/core/bikeshed/",
		"https://webassembly.github.io/memory64/core/bikeshed/",
		"https://webassembly.github.io/multi-memory/core/bikeshed/",
		"https://webassembly.github.io/tail-call/core/bikeshed/",
		"https://webassembly.github.io/threads/core/bikeshed/",
		"https://drafts.csswg.org/css-color-3/",
	],
	specsWithoutIDLInWebref: [
		"https://patcg-individual-drafts.github.io/topics/",
	],
	specsExcludedFromJavaScript: [
		"https://aomediacodec.github.io/av1-hdr10plus/",
		"https://aomediacodec.github.io/av1-isobmff/",
		"https://aomediacodec.github.io/av1-spec/",
		"https://aomediacodec.github.io/av1-mpeg2-ts/",
		"https://aomediacodec.github.io/av1-avif/",
		"https://aomediacodec.github.io/av1-rtp-spec/",
		"https://aomediacodec.github.io/afgs1-spec/",
		"https://www.w3.org/Graphics/JPEG/jfif3.pdf",
		"https://www.w3.org/Graphics/JPEG/itu-t81.pdf",
		"https://arxiv.org/ftp/arxiv/papers/1908/1908.03565.pdf",
		"https://www.w3.org/Graphics/GIF/spec-gif87.txt",
		"https://www.w3.org/Graphics/GIF/spec-gif89a.txt",
		"http://www.vurdalakov.net/misc/gif/netscape-looping-application-extension/",
		"https://nokiatech.github.io/heif/technical.html",
		"https://ecma-international.org/wp-content/uploads/ECMA-404_2nd_edition_december_2017.pdf",
		"https://webassembly.github.io/branch-hinting/core/bikeshed/",
		"https://webassembly.github.io/extended-const/core/bikeshed/",
		"https://webassembly.github.io/function-references/core/bikeshed/",
		"https://webassembly.github.io/gc/core/bikeshed/",
		"https://webassembly.github.io/memory64/core/bikeshed/",
		"https://webassembly.github.io/multi-memory/core/bikeshed/",
		"https://webassembly.github.io/tail-call/core/bikeshed/",
		"https://webassembly.github.io/threads/core/bikeshed/",
	],
	additionalCSSProperties: [
		{
			name: "-webkit-appearance",
			syntax: "none | auto | <compat-auto> | <compat-special>",
			id: "propdef--webkit-appearance",
			spec: "https://drafts.csswg.org/css-ui-4/",
		},
		{
			name: "-webkit-user-select",
			syntax: "auto | text | none | contain | all",
			id: "propdef--webkit-user-select",
			spec: "https://drafts.csswg.org/css-ui-4/",
		},
		{
			name: "-webkit-app-region",
			syntax: "drag | no-drag",
			id: "dfn-webkit-app-region",
			spec: "https://wicg.github.io/manifest-incubations/",
		},
		{
			name: "app-region",
			syntax: "drag | no-drag",
			id: "dfn-app-region",
			spec: "https://wicg.github.io/manifest-incubations/",
		},
		{
			name: "page-break-after",
			syntax: "auto | always | avoid | left | right",
			id: "ref-for-propdef-page-break-after①",
			spec: "https://drafts.csswg.org/css-break-4/",
		},
		{
			name: "page-break-before",
			syntax: "auto | always | avoid | left | right",
			id: "ref-for-propdef-page-break-before①",
			spec: "https://drafts.csswg.org/css-break-4/",
		},
		{
			name: "page-break-inside",
			syntax: "avoid | auto",
			id: "ref-for-propdef-page-break-inside①",
			spec: "https://drafts.csswg.org/css-break-4/",
		},
		{
			name: "touch-action",
			syntax: "auto | none | [ [ pan-x | pan-left | pan-right ] || [ pan-y | pan-up | pan-down ] ] | manipulation",
			id: "the-touch-action-css-property",
			spec: "https://w3c.github.io/pointerevents/",
		},
		{
			name: "z-index",
			syntax: "auto | <integer>",
			id: "propdef-z-index",
			spec: "https://drafts.csswg.org/css2/",
		},
		{
			name: "display",
			syntax: "<display-outside> || [ <display-inside> | math ]",
			onlyNewValues: true,
			id: "new-display-math-value",
			spec: "https://w3c.github.io/mathml-core/",
		},
		{
			name: "stop-color",
			syntax: "<'color'>",
			id: "StopColorProperty",
			spec: "https://svgwg.org/svg2-draft/pservers.html",
		},
		{
			name: "stop-opacity",
			syntax: "<'opacity'>",
			id: "StopOpacityProperty",
			spec: "https://svgwg.org/svg2-draft/pservers.html",
		},
		{
			name: "grid-row-gap",
			syntax: "normal | <length-percentage [0,∞]>",
			id: "propdef-grid-row-gap",
			spec: "https://drafts.csswg.org/css-align-3/",
		},
		{
			name: "grid-column-gap",
			syntax: "normal | <length-percentage [0,∞]>",
			id: "propdef-grid-column-gap",
			spec: "https://drafts.csswg.org/css-align-3/",
		},
		{
			name: "grid-gap",
			syntax: "<'row-gap'> <'column-gap'>?",
			id: "propdef-grid-gap",
			spec: "https://drafts.csswg.org/css-align-3/",
		},
		{
			name: "font-stretch",
			syntax: "normal | <percentage [0,∞]> | ultra-condensed | extra-condensed | condensed | semi-condensed | semi-expanded | expanded | extra-expanded | ultra-expanded",
			id: "propdef-font-stretch",
			spec: "https://drafts.csswg.org/css-fonts/",
		},
	],
	additionalCSSTypes: [
		{
			name: "<feature-value-block>",
			syntax: "<font-feature-value-type> { <declaration-list> }",
			id: "font-feature-values-syntax",
			spec: "https://drafts.csswg.org/css-fonts-4/"
		},
		{
			name: "<font-feature-value-type>",
			syntax: "@stylistic | @historical-forms | @styleset | @character-variant | @swash | @ornaments | @annotation",
			id: "font-feature-values-syntax",
			spec: "https://drafts.csswg.org/css-fonts-4/",
		},
	],
	additionalCSSSelectors: [
		{
			name: "*",
			id: "the-universal-selector",
			spec: "https://drafts.csswg.org/selectors-4/",
		},
	],
	additionalCSSPseudoElements: [
		{
			name: ":before",
			id: "css2-compat",
			spec: "https://drafts.csswg.org/css-pseudo-4/",
		},
		{
			name: ":after",
			id: "css2-compat",
			spec: "https://drafts.csswg.org/css-pseudo-4/",
		},
		{
			name: ":first-letter",
			id: "css2-compat",
			spec: "https://drafts.csswg.org/css-pseudo-4/",
		},
		{
			name: ":first-line",
			id: "css2-compat",
			spec: "https://drafts.csswg.org/css-pseudo-4/",
		},
	],
	additionalCSSUnits: [
		{
			name: "cqw",
			forType: "<length>",
			id: "container-lengths",
			spec: "https://drafts.csswg.org/css-contain-3/",
		},
		{
			name: "cqh",
			forType: "<length>",
			id: "container-lengths",
			spec: "https://drafts.csswg.org/css-contain-3/",
		},
		{
			name: "cqi",
			forType: "<length>",
			id: "container-lengths",
			spec: "https://drafts.csswg.org/css-contain-3/",
		},
		{
			name: "cqb",
			forType: "<length>",
			id: "container-lengths",
			spec: "https://drafts.csswg.org/css-contain-3/",
		},
		{
			name: "cqmin",
			forType: "<length>",
			id: "container-lengths",
			spec: "https://drafts.csswg.org/css-contain-3/",
		},
		{
			name: "cqmax",
			forType: "<length>",
			id: "container-lengths",
			spec: "https://drafts.csswg.org/css-contain-3/",
		},
	],
};
