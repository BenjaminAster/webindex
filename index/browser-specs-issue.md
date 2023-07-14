
I was working on my own browser spec collection for myself, using [w3c/groups](https://github.com/w3c/groups) as a starting point and manually adding lots of stuff, partially by looking at the interfaces in the window object in Chrome's JavaScript console &ndash; until I realized the existence of this repo and webref. This has the disadvantage of having wasted a lot of time, but also the advantage of being able to diff my spec list with yours and finding the differences.

Here are specs that I believe should be added to this repo:

- Topics API: https://patcg-individual-drafts.github.io/topics/
- Private Aggregation API: https://patcg-individual-drafts.github.io/private-aggregation-api/
- WebXR Marker Tracking Module: https://immersive-web.github.io/marker-tracking/
- WebXR Meshing API Level 1: https://immersive-web.github.io/real-world-geometry/webxrmeshing-1.html
- WebXR Plane Detection Module: https://immersive-web.github.io/real-world-geometry/plane-detection.html
- Capture all screens: https://screen-share.github.io/capture-all-screens/
- Audio Session: https://w3c.github.io/audio-session/
- execCommand: https://w3c.github.io/editing/docs/execCommand/
- Mathematical Markup Language (MathML) Version 4.0: https://w3c.github.io/mathml/
- Media Capture and Streams Extensions: https://w3c.github.io/mediacapture-extensions/
- The Capture-Handle Actions Mechanism: https://w3c.github.io/mediacapture-handle/actions/
- Media Source Extensions Byte Stream Format Registry: https://w3c.github.io/mse-byte-stream-format-registry/
- ISO BMFF Byte Stream Format: https://w3c.github.io/mse-byte-stream-format-isobmff/
- MPEG-2 TS Byte Stream Format: https://w3c.github.io/mse-byte-stream-format-mp2t/
- MPEG Audio Byte Stream Format: https://w3c.github.io/mse-byte-stream-format-mpeg-audio/
- WebM Byte Stream Format: https://w3c.github.io/mse-byte-stream-format-webm/
- Confinement with Origin Web Labels: https://w3c.github.io/webappsec-cowl/
- Suborigins: https://w3c.github.io/webappsec-suborigins/
- User Interface Security and the Visibility API: https://w3c.github.io/webappsec-uisecurity/
- WebRTC Extensions: https://w3c.github.io/webrtc-extensions/
- Provisional Identifiers for WebRTC's Statistics API: https://w3c.github.io/webrtc-provisional-stats/
- XML Entity Definitions for Characters: https://w3c.github.io/xml-entities/
- Model Loader API: https://webmachinelearning.github.io/model-loader/
- Accessibility Object Model: https://wicg.github.io/aom/spec/
- AOM ARIA reflection: https://wicg.github.io/aom/spec/aria-reflection.html
- Default semantic properties for Custom Elements: https://wicg.github.io/aom/spec/custom-element-semantics.html
- AOM Input Event Types: https://wicg.github.io/aom/spec/input-events.html
- Conditional Focus: https://wicg.github.io/conditional-focus/
- Handwriting Recognition API: https://wicg.github.io/handwriting-recognition/
- Multicapture: https://wicg.github.io/multicapture/
- No-Vary-Search: https://wicg.github.io/nav-speculation/no-vary-search.html
- Pending Beacon: https://wicg.github.io/pending-beacon/
- Visual Viewport API: https://wicg.github.io/visual-viewport/
- Web Smart Card API: https://wicg.github.io/web-smart-card/
- Subresource Loading with Web Bundles: https://wicg.github.io/webpackage/subresource-loading.html
- Web Packaging: https://wicg.github.io/webpackage/draft-yasskin-dispatch-web-packaging.html
- Signed HTTP Exchanges: https://wicg.github.io/webpackage/draft-yasskin-http-origin-signed-responses.html
- Signed HTTP Exchanges Implementation Checkpoints: https://wicg.github.io/webpackage/draft-yasskin-httpbis-origin-signed-exchanges-impl.html
- Web Bundles: https://wpack-wg.github.io/bundled-responses/draft-ietf-wpack-bundled-responses.html
- Import Attributes: https://tc39.es/proposal-import-attributes/
- Iframe credentialless: https://wicg.github.io/anonymous-iframe/
- Math Accessibility API Mappings 1.0: https://w3c.github.io/math-aam/
- Digital Publishing WAI-ARIA Module 1.1: https://w3c.github.io/dpub-aria/
- Digital Publishing Accessibility API Mappings 1.1: https://w3c.github.io/dpub-aam/
- Web Monetization: https://webmonetization.org/specification/
- Payment Method Encryption: https://w3c.github.io/webpayments-crypto/
- Web Payments HTTP Messages 1.0: https://w3c.github.io/webpayments-http-messages/
- Tokenized Card Payment: https://w3c.github.io/webpayments-methods-tokenization/
- QUIC API for Peer-to-peer Connections: https://w3c.github.io/p2p-webtransport/
- QUIC API for Client-to-Server Connections: https://w3c.github.io/p2p-webtransport/cs.html
- Object RTC (ORTC) API for WebRTC: https://draft.ortc.org/
- Web Bluetooth Scanning: https://webbluetoothcg.github.io/web-bluetooth/scanning.html
- The MerchantValidationEvent interface: https://w3c.github.io/merchant-validation/
- Managed Configuration API: https://wicg.github.io/WebApiDevice/managed_config/
- Device Attributes API: https://wicg.github.io/WebApiDevice/device_attributes/
- overscroll and scrollend events: https://wicg.github.io/overscroll-scrollend-events/

## Specs that might be too unofficial or unmaintained to be in browser-specs, or that don't technically match the criteria
- Color API: https://wicg.github.io/color-api/
- WebP Container Specification (implemented in all three browser engines!): https://developers.google.com/speed/webp/docs/riff_container
- WebP Lossless Bitstream: https://developers.google.com/speed/webp/docs/webp_lossless_bitstream_specification
- Controlled Frame API: https://chasephillips.github.io/controlled-frame/
- AV1 family of specs:
	- HDR10+ AV1 Metadata Handling: https://aomediacodec.github.io/av1-hdr10plus/
	- AV1 Codec ISO Media File Format Binding: https://aomediacodec.github.io/av1-isobmff/
	- AV1 Bitstream & Decoding Process: https://aomediacodec.github.io/av1-spec/
	- Carriage of AV1 in MPEG-2 TS: https://aomediacodec.github.io/av1-mpeg2-ts/
	- AV1 Image File Format (AVIF) (implemented in all three browser engines!): https://aomediacodec.github.io/av1-avif/
	- RTP Payload Format For AV1: https://aomediacodec.github.io/av1-rtp-spec/
- AOMedia Film Grain Synthesis 1 (AFGS1): https://aomediacodec.github.io/afgs1-spec/
- Sourcing In-band Media Resource Tracks from Media Containers into HTML: https://dev.w3.org/html5/html-sourcing-inband-tracks/
- CSS Toggles: https://tabatkins.github.io/css-toggle/
- CSS Stacking Context Module Level 1: https://tabatkins.github.io/specs/css-stacking-context-1/
- Permissions Registry: https://w3c.github.io/permissions-registry/
- COLR — Color Table: https://learn.microsoft.com/en-us/typography/opentype/otspec191alpha/colr
- SVG Streaming: https://svgwg.org/specs/streaming/
- SVG Markers: https://svgwg.org/specs/markers/
- Box Tree API Level 1: https://drafts.css-houdini.org/box-tree-api-1/
- APNG Specification (implemented in all three browser engines!): https://wiki.mozilla.org/APNG_Specification
- MediaStreamTrack Insertable Media Processing using Streams (unofficial draft with MediaStreamTrackGenerator): https://alvestrand.github.io/mediacapture-transform/chrome-96.html

## Specs that I think should be removed from browser-specs:
- Writing Promise-Using Specifications: https://www.w3.org/2001/tag/doc/promises-guide
- W3C Patent Policy: https://www.w3.org/Consortium/Patent-Policy/
- W3C Process Document: https://www.w3.org/Consortium/Process/
- A Method for Writing Testable Conformance Requirements: https://www.w3.org/TR/test-methodology/
- Document Object Model (DOM) Level 2 Style Specification (deprecated and superseded by other specs): https://www.w3.org/TR/DOM-Level-2-Style/
- Cascading Style Sheets Level 2 Revision 1 (CSS 2.1) Specification (superseded by [Cascading Style Sheets Level 2 Revision 2 (CSS 2.2) Specification](https://www.w3.org/TR/CSS22/)): https://www.w3.org/TR/CSS21/
- TC39 proposals that have now been merged into the official ECMAScript standard:
	- Change Array by copy: https://tc39.es/proposal-change-array-by-copy/
	- Proposal-array-find-from-last: https://tc39.es/proposal-array-find-from-last/
	- Symbol as WeakMap Keys Proposal: https://tc39.es/proposal-symbols-as-weakmap-keys/

## Various other things:
- There are currently two editor's drafts for SVG 2: SVG 2.1 at https://svgwg.org/svg2-draft/ and SVG 2.2 at https://svgwg.org/svg-next/. Should the nightly url for the SVG 2 spec be changed to the svg-next version?
- CSS Animation Worklet's spec url changed from https://drafts.css-houdini.org/css-animationworklet-1/ (without hyphen) to https://drafts.css-houdini.org/css-animation-worklet-1/ (with hyphen).
- The link for CSS Style Attributes has the level number missing (https://drafts.csswg.org/css-style-attr/ instead of https://drafts.csswg.org/css-style-attr-1/). Not very important, but should be fixed for consistency.
- The [Web Cryptography Working Group](https://www.w3.org/2012/webcrypto/) doesn't seem to exist any more, and the [Web Cryptography API](https://w3c.github.io/webcrypto/) mentions the [Web Application Security Working Group](https://www.w3.org/groups/wg/webappsec/) as the group behind it.

Could some W3C person please either add the specs and modifications themselves or give me the OK and tell me which specs *not* to add so I can make a PR myself?



<!-- 

Trash


- Solid Project specs (Tim Berners-Lee's idea of a "decentralized web"):
	- Solid Protocol: https://solidproject.org/ED/protocol
	- Solid WebID Profile: https://solid.github.io/webid-profile/
	- Solid-OIDC: https://solid.github.io/solid-oidc/
	- Web Access Control: https://solid.github.io/web-access-control-spec/
	- Access Control Policy (ACP): https://solid.github.io/authorization-panel/acp-specification/
	- Solid Application Interoperability: https://solid.github.io/data-interoperability-panel/specification/
	- did:solid Method Specification: https://solid.github.io/did-method-solid/
	- Solid Notifications Protocol: https://solid.github.io/notifications/protocol
	- EventSourceChannel2023: https://solid.github.io/notifications/eventsource-channel-2023
	- LDNChannel2023: https://solid.github.io/notifications/ldn-channel-2023
	- Solid StreamingHTTPChannel2023: https://solid.github.io/notifications/streaming-http-channel-2023
	- WebSocketChannel2023: https://solid.github.io/notifications/websocket-channel-2023
	- Solid WebhookChannel2023: https://solid.github.io/notifications/webhook-channel-2023


 -->
