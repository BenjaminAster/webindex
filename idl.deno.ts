
/// <reference types="better-typescript" />
/// <reference types="deno-types" />

// @ts-ignore
import { parse as parseIDL } from "npm:webidl2@24.4.0";

const idl = `


[Exposed=(Window,Worker)]
partial interface Worker {
    constructor(ScriptURLString scriptURL, optional WorkerOptions options = {});
};

[Exposed=(Window,Worker)]
partial interface SharedWorker {
  constructor(ScriptURLString scriptURL, optional (DOMString or WorkerOptions) options = {});
};

[Exposed=Worker]
partial interface WorkerGlobalScope {
  undefined importScripts(ScriptURLString... urls);
};


partial interface HTMLInputElement {
	[CEReactions] attribute DOMString align;
	[CEReactions] attribute DOMString useMap;
 };


[Exposed=Window]
interface MathMLElement : Element { };
MathMLElement includes GlobalEventHandlers;
MathMLElement includes HTMLOrForeignElement;

// interface SVGPathSegment {
// 	DOMString type;
// 	sequence<float> values;
// };

[Exposed=*]
interface Event {
  constructor(DOMString type, optional EventInit eventInitDict = {});

  readonly attribute DOMString type;
  readonly attribute EventTarget? target;
  readonly attribute EventTarget? srcElement; // legacy
  readonly attribute EventTarget? currentTarget;
  sequence<EventTarget> composedPath();

  const unsigned short NONE = 0;
  const unsigned short CAPTURING_PHASE = 1;
  const unsigned short AT_TARGET = 2;
  const unsigned short BUBBLING_PHASE = 3;
  readonly attribute unsigned short eventPhase;

  undefined stopPropagation();
           attribute boolean cancelBubble; // legacy alias of .stopPropagation()
  undefined stopImmediatePropagation();

  readonly attribute boolean bubbles;
  readonly attribute boolean cancelable;
           attribute boolean returnValue;  // legacy
  undefined preventDefault();
  readonly attribute boolean defaultPrevented;
  readonly attribute boolean composed;

  [LegacyUnforgeable] readonly attribute boolean isTrusted;
  readonly attribute DOMHighResTimeStamp timeStamp;

  undefined initEvent(DOMString type, optional boolean bubbles = false, optional boolean cancelable = false); // legacy
};

dictionary EventInit {
  boolean bubbles = false;
  boolean cancelable = false;
  boolean composed = false;
};

partial interface Window {
  [Replaceable] readonly attribute (Event or undefined) event; // legacy
};

[Exposed=*]
interface CustomEvent : Event {
  constructor(DOMString type, optional CustomEventInit eventInitDict = {});

  readonly attribute any detail;

  undefined initCustomEvent(DOMString type, optional boolean bubbles = false, optional boolean cancelable = false, optional any detail = null); // legacy
};

dictionary CustomEventInit : EventInit {
  any detail = null;
};

[Exposed=*]
interface EventTarget {
  constructor();

  undefined addEventListener(DOMString type, EventListener? callback, optional (AddEventListenerOptions or boolean) options = {});
  undefined removeEventListener(DOMString type, EventListener? callback, optional (EventListenerOptions or boolean) options = {});
  boolean dispatchEvent(Event event);
};

callback interface EventListener {
  undefined handleEvent(Event event);
};

dictionary EventListenerOptions {
  boolean capture = false;
};

dictionary AddEventListenerOptions : EventListenerOptions {
  boolean passive;
  boolean once = false;
  AbortSignal signal;
};

[Exposed=*]
interface AbortController {
  constructor();

  [SameObject] readonly attribute AbortSignal signal;

  undefined abort(optional any reason);
};

[Exposed=*]
interface AbortSignal : EventTarget {
  [NewObject] static AbortSignal abort(optional any reason);
  [Exposed=(Window,Worker), NewObject] static AbortSignal timeout([EnforceRange] unsigned long long milliseconds);
  [NewObject] static AbortSignal _any(sequence<AbortSignal> signals);

  readonly attribute boolean aborted;
  readonly attribute any reason;
  undefined throwIfAborted();

  attribute EventHandler onabort;
};
interface mixin NonElementParentNode {
  Element? getElementById(DOMString elementId);
};
Document includes NonElementParentNode;
DocumentFragment includes NonElementParentNode;

interface mixin DocumentOrShadowRoot {
};
Document includes DocumentOrShadowRoot;
ShadowRoot includes DocumentOrShadowRoot;

interface mixin ParentNode {
  [SameObject] readonly attribute HTMLCollection children;
  readonly attribute Element? firstElementChild;
  readonly attribute Element? lastElementChild;
  readonly attribute unsigned long childElementCount;

  [CEReactions, Unscopable] undefined prepend((Node or DOMString)... nodes);
  [CEReactions, Unscopable] undefined append((Node or DOMString)... nodes);
  [CEReactions, Unscopable] undefined replaceChildren((Node or DOMString)... nodes);

  Element? querySelector(DOMString selectors);
  [NewObject] NodeList querySelectorAll(DOMString selectors);
};
Document includes ParentNode;
DocumentFragment includes ParentNode;
Element includes ParentNode;

interface mixin NonDocumentTypeChildNode {
  readonly attribute Element? previousElementSibling;
  readonly attribute Element? nextElementSibling;
};
Element includes NonDocumentTypeChildNode;
CharacterData includes NonDocumentTypeChildNode;

interface mixin ChildNode {
  [CEReactions, Unscopable] undefined before((Node or DOMString)... nodes);
  [CEReactions, Unscopable] undefined after((Node or DOMString)... nodes);
  [CEReactions, Unscopable] undefined replaceWith((Node or DOMString)... nodes);
  [CEReactions, Unscopable] undefined remove();
};
DocumentType includes ChildNode;
Element includes ChildNode;
CharacterData includes ChildNode;

interface mixin Slottable {
  readonly attribute HTMLSlotElement? assignedSlot;
};
Element includes Slottable;
Text includes Slottable;

[Exposed=Window]
interface NodeList {
  getter Node? item(unsigned long index);
  readonly attribute unsigned long length;
  iterable<Node>;
};

[Exposed=Window, LegacyUnenumerableNamedProperties]
interface HTMLCollection {
  readonly attribute unsigned long length;
  getter Element? item(unsigned long index);
  getter Element? namedItem(DOMString name);
};

[Exposed=Window]
interface MutationObserver {
  constructor(MutationCallback callback);

  undefined observe(Node target, optional MutationObserverInit options = {});
  undefined disconnect();
  sequence<MutationRecord> takeRecords();
};

callback MutationCallback = undefined (sequence<MutationRecord> mutations, MutationObserver observer);

dictionary MutationObserverInit {
  boolean childList = false;
  boolean attributes;
  boolean characterData;
  boolean subtree = false;
  boolean attributeOldValue;
  boolean characterDataOldValue;
  sequence<DOMString> attributeFilter;
};

[Exposed=Window]
interface MutationRecord {
  readonly attribute DOMString type;
  [SameObject] readonly attribute Node target;
  [SameObject] readonly attribute NodeList addedNodes;
  [SameObject] readonly attribute NodeList removedNodes;
  readonly attribute Node? previousSibling;
  readonly attribute Node? nextSibling;
  readonly attribute DOMString? attributeName;
  readonly attribute DOMString? attributeNamespace;
  readonly attribute DOMString? oldValue;
};

[Exposed=Window]
interface Node : EventTarget {
  const unsigned short ELEMENT_NODE = 1;
  const unsigned short ATTRIBUTE_NODE = 2;
  const unsigned short TEXT_NODE = 3;
  const unsigned short CDATA_SECTION_NODE = 4;
  const unsigned short ENTITY_REFERENCE_NODE = 5; // legacy
  const unsigned short ENTITY_NODE = 6; // legacy
  const unsigned short PROCESSING_INSTRUCTION_NODE = 7;
  const unsigned short COMMENT_NODE = 8;
  const unsigned short DOCUMENT_NODE = 9;
  const unsigned short DOCUMENT_TYPE_NODE = 10;
  const unsigned short DOCUMENT_FRAGMENT_NODE = 11;
  const unsigned short NOTATION_NODE = 12; // legacy
  readonly attribute unsigned short nodeType;
  readonly attribute DOMString nodeName;

  readonly attribute USVString baseURI;

  readonly attribute boolean isConnected;
  readonly attribute Document? ownerDocument;
  Node getRootNode(optional GetRootNodeOptions options = {});
  readonly attribute Node? parentNode;
  readonly attribute Element? parentElement;
  boolean hasChildNodes();
  [SameObject] readonly attribute NodeList childNodes;
  readonly attribute Node? firstChild;
  readonly attribute Node? lastChild;
  readonly attribute Node? previousSibling;
  readonly attribute Node? nextSibling;

  [CEReactions] attribute DOMString? nodeValue;
  [CEReactions] attribute DOMString? textContent;
  [CEReactions] undefined normalize();

  [CEReactions, NewObject] Node cloneNode(optional boolean deep = false);
  boolean isEqualNode(Node? otherNode);
  boolean isSameNode(Node? otherNode); // legacy alias of ===

  const unsigned short DOCUMENT_POSITION_DISCONNECTED = 0x01;
  const unsigned short DOCUMENT_POSITION_PRECEDING = 0x02;
  const unsigned short DOCUMENT_POSITION_FOLLOWING = 0x04;
  const unsigned short DOCUMENT_POSITION_CONTAINS = 0x08;
  const unsigned short DOCUMENT_POSITION_CONTAINED_BY = 0x10;
  const unsigned short DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 0x20;
  unsigned short compareDocumentPosition(Node other);
  boolean contains(Node? other);

  DOMString? lookupPrefix(DOMString? namespace);
  DOMString? lookupNamespaceURI(DOMString? prefix);
  boolean isDefaultNamespace(DOMString? namespace);

  [CEReactions] Node insertBefore(Node node, Node? child);
  [CEReactions] Node appendChild(Node node);
  [CEReactions] Node replaceChild(Node node, Node child);
  [CEReactions] Node removeChild(Node child);
};

dictionary GetRootNodeOptions {
  boolean composed = false;
};

[Exposed=Window]
interface Document : Node {
  constructor();

  [SameObject] readonly attribute DOMImplementation implementation;
  readonly attribute USVString URL;
  readonly attribute USVString documentURI;
  readonly attribute DOMString compatMode;
  readonly attribute DOMString characterSet;
  readonly attribute DOMString charset; // legacy alias of .characterSet
  readonly attribute DOMString inputEncoding; // legacy alias of .characterSet
  readonly attribute DOMString contentType;

  readonly attribute DocumentType? doctype;
  readonly attribute Element? documentElement;
  HTMLCollection getElementsByTagName(DOMString qualifiedName);
  HTMLCollection getElementsByTagNameNS(DOMString? namespace, DOMString localName);
  HTMLCollection getElementsByClassName(DOMString classNames);

  [CEReactions, NewObject] Element createElement(DOMString localName, optional (DOMString or ElementCreationOptions) options = {});
  [CEReactions, NewObject] Element createElementNS(DOMString? namespace, DOMString qualifiedName, optional (DOMString or ElementCreationOptions) options = {});
  [NewObject] DocumentFragment createDocumentFragment();
  [NewObject] Text createTextNode(DOMString data);
  [NewObject] CDATASection createCDATASection(DOMString data);
  [NewObject] Comment createComment(DOMString data);
  [NewObject] ProcessingInstruction createProcessingInstruction(DOMString target, DOMString data);

  [CEReactions, NewObject] Node importNode(Node node, optional boolean deep = false);
  [CEReactions] Node adoptNode(Node node);

  [NewObject] Attr createAttribute(DOMString localName);
  [NewObject] Attr createAttributeNS(DOMString? namespace, DOMString qualifiedName);

  [NewObject] Event createEvent(DOMString interface); // legacy

  [NewObject] Range createRange();

  // NodeFilter.SHOW_ALL = 0xFFFFFFFF
  [NewObject] NodeIterator createNodeIterator(Node root, optional unsigned long whatToShow = 0xFFFFFFFF, optional NodeFilter? filter = null);
  [NewObject] TreeWalker createTreeWalker(Node root, optional unsigned long whatToShow = 0xFFFFFFFF, optional NodeFilter? filter = null);
};

[Exposed=Window]
interface XMLDocument : Document {};

dictionary ElementCreationOptions {
  DOMString is;
};

[Exposed=Window]
interface DOMImplementation {
  [NewObject] DocumentType createDocumentType(DOMString qualifiedName, DOMString publicId, DOMString systemId);
  [NewObject] XMLDocument createDocument(DOMString? namespace, [LegacyNullToEmptyString] DOMString qualifiedName, optional DocumentType? doctype = null);
  [NewObject] Document createHTMLDocument(optional DOMString title);

  boolean hasFeature(); // useless; always returns true
};

[Exposed=Window]
interface DocumentType : Node {
  readonly attribute DOMString name;
  readonly attribute DOMString publicId;
  readonly attribute DOMString systemId;
};

[Exposed=Window]
interface DocumentFragment : Node {
  constructor();
};

[Exposed=Window]
interface ShadowRoot : DocumentFragment {
  readonly attribute ShadowRootMode mode;
  readonly attribute boolean delegatesFocus;
  readonly attribute SlotAssignmentMode slotAssignment;
  readonly attribute Element host;
  attribute EventHandler onslotchange;
};

enum ShadowRootMode { "open", "closed" };
enum SlotAssignmentMode { "manual", "named" };

[Exposed=Window]
interface Element : Node {
  readonly attribute DOMString? namespaceURI;
  readonly attribute DOMString? prefix;
  readonly attribute DOMString localName;
  readonly attribute DOMString tagName;

  [CEReactions] attribute DOMString id;
  [CEReactions] attribute DOMString className;
  [SameObject, PutForwards=value] readonly attribute DOMTokenList classList;
  [CEReactions, Unscopable] attribute DOMString slot;

  boolean hasAttributes();
  [SameObject] readonly attribute NamedNodeMap attributes;
  sequence<DOMString> getAttributeNames();
  DOMString? getAttribute(DOMString qualifiedName);
  DOMString? getAttributeNS(DOMString? namespace, DOMString localName);
  [CEReactions] undefined setAttribute(DOMString qualifiedName, DOMString value);
  [CEReactions] undefined setAttributeNS(DOMString? namespace, DOMString qualifiedName, DOMString value);
  [CEReactions] undefined removeAttribute(DOMString qualifiedName);
  [CEReactions] undefined removeAttributeNS(DOMString? namespace, DOMString localName);
  [CEReactions] boolean toggleAttribute(DOMString qualifiedName, optional boolean force);
  boolean hasAttribute(DOMString qualifiedName);
  boolean hasAttributeNS(DOMString? namespace, DOMString localName);

  Attr? getAttributeNode(DOMString qualifiedName);
  Attr? getAttributeNodeNS(DOMString? namespace, DOMString localName);
  [CEReactions] Attr? setAttributeNode(Attr attr);
  [CEReactions] Attr? setAttributeNodeNS(Attr attr);
  [CEReactions] Attr removeAttributeNode(Attr attr);

  ShadowRoot attachShadow(ShadowRootInit init);
  readonly attribute ShadowRoot? shadowRoot;

  Element? closest(DOMString selectors);
  boolean matches(DOMString selectors);
  boolean webkitMatchesSelector(DOMString selectors); // legacy alias of .matches

  HTMLCollection getElementsByTagName(DOMString qualifiedName);
  HTMLCollection getElementsByTagNameNS(DOMString? namespace, DOMString localName);
  HTMLCollection getElementsByClassName(DOMString classNames);

  [CEReactions] Element? insertAdjacentElement(DOMString where, Element element); // legacy
  undefined insertAdjacentText(DOMString where, DOMString data); // legacy
};

dictionary ShadowRootInit {
  required ShadowRootMode mode;
  boolean delegatesFocus = false;
  SlotAssignmentMode slotAssignment = "named";
};

[Exposed=Window,
 LegacyUnenumerableNamedProperties]
interface NamedNodeMap {
  readonly attribute unsigned long length;
  getter Attr? item(unsigned long index);
  getter Attr? getNamedItem(DOMString qualifiedName);
  Attr? getNamedItemNS(DOMString? namespace, DOMString localName);
  [CEReactions] Attr? setNamedItem(Attr attr);
  [CEReactions] Attr? setNamedItemNS(Attr attr);
  [CEReactions] Attr removeNamedItem(DOMString qualifiedName);
  [CEReactions] Attr removeNamedItemNS(DOMString? namespace, DOMString localName);
};

[Exposed=Window]
interface Attr : Node {
  readonly attribute DOMString? namespaceURI;
  readonly attribute DOMString? prefix;
  readonly attribute DOMString localName;
  readonly attribute DOMString name;
  [CEReactions] attribute DOMString value;

  readonly attribute Element? ownerElement;

  readonly attribute boolean specified; // useless; always returns true
};
[Exposed=Window]
interface CharacterData : Node {
  attribute [LegacyNullToEmptyString] DOMString data;
  readonly attribute unsigned long length;
  DOMString substringData(unsigned long offset, unsigned long count);
  undefined appendData(DOMString data);
  undefined insertData(unsigned long offset, DOMString data);
  undefined deleteData(unsigned long offset, unsigned long count);
  undefined replaceData(unsigned long offset, unsigned long count, DOMString data);
};

[Exposed=Window]
interface Text : CharacterData {
  constructor(optional DOMString data = "");

  [NewObject] Text splitText(unsigned long offset);
  readonly attribute DOMString wholeText;
};

[Exposed=Window]
interface CDATASection : Text {
};
[Exposed=Window]
interface ProcessingInstruction : CharacterData {
  readonly attribute DOMString target;
};
[Exposed=Window]
interface Comment : CharacterData {
  constructor(optional DOMString data = "");
};

[Exposed=Window]
interface AbstractRange {
  readonly attribute Node startContainer;
  readonly attribute unsigned long startOffset;
  readonly attribute Node endContainer;
  readonly attribute unsigned long endOffset;
  readonly attribute boolean collapsed;
};

dictionary StaticRangeInit {
  required Node startContainer;
  required unsigned long startOffset;
  required Node endContainer;
  required unsigned long endOffset;
};

[Exposed=Window]
interface StaticRange : AbstractRange {
  constructor(StaticRangeInit init);
};

[Exposed=Window]
interface Range : AbstractRange {
  constructor();

  readonly attribute Node commonAncestorContainer;

  undefined setStart(Node node, unsigned long offset);
  undefined setEnd(Node node, unsigned long offset);
  undefined setStartBefore(Node node);
  undefined setStartAfter(Node node);
  undefined setEndBefore(Node node);
  undefined setEndAfter(Node node);
  undefined collapse(optional boolean toStart = false);
  undefined selectNode(Node node);
  undefined selectNodeContents(Node node);

  const unsigned short START_TO_START = 0;
  const unsigned short START_TO_END = 1;
  const unsigned short END_TO_END = 2;
  const unsigned short END_TO_START = 3;
  short compareBoundaryPoints(unsigned short how, Range sourceRange);

  [CEReactions] undefined deleteContents();
  [CEReactions, NewObject] DocumentFragment extractContents();
  [CEReactions, NewObject] DocumentFragment cloneContents();
  [CEReactions] undefined insertNode(Node node);
  [CEReactions] undefined surroundContents(Node newParent);

  [NewObject] Range cloneRange();
  undefined detach();

  boolean isPointInRange(Node node, unsigned long offset);
  short comparePoint(Node node, unsigned long offset);

  boolean intersectsNode(Node node);

  stringifier;
};

[Exposed=Window]
interface NodeIterator {
  [SameObject] readonly attribute Node root;
  readonly attribute Node referenceNode;
  readonly attribute boolean pointerBeforeReferenceNode;
  readonly attribute unsigned long whatToShow;
  readonly attribute NodeFilter? filter;

  Node? nextNode();
  Node? previousNode();

  undefined detach();
};

[Exposed=Window]
interface TreeWalker {
  [SameObject] readonly attribute Node root;
  readonly attribute unsigned long whatToShow;
  readonly attribute NodeFilter? filter;
           attribute Node currentNode;

  Node? parentNode();
  Node? firstChild();
  Node? lastChild();
  Node? previousSibling();
  Node? nextSibling();
  Node? previousNode();
  Node? nextNode();
};
[Exposed=Window]
callback interface NodeFilter {
  // Constants for acceptNode()
  const unsigned short FILTER_ACCEPT = 1;
  const unsigned short FILTER_REJECT = 2;
  const unsigned short FILTER_SKIP = 3;

  // Constants for whatToShow
  const unsigned long SHOW_ALL = 0xFFFFFFFF;
  const unsigned long SHOW_ELEMENT = 0x1;
  const unsigned long SHOW_ATTRIBUTE = 0x2;
  const unsigned long SHOW_TEXT = 0x4;
  const unsigned long SHOW_CDATA_SECTION = 0x8;
  const unsigned long SHOW_ENTITY_REFERENCE = 0x10; // legacy
  const unsigned long SHOW_ENTITY = 0x20; // legacy
  const unsigned long SHOW_PROCESSING_INSTRUCTION = 0x40;
  const unsigned long SHOW_COMMENT = 0x80;
  const unsigned long SHOW_DOCUMENT = 0x100;
  const unsigned long SHOW_DOCUMENT_TYPE = 0x200;
  const unsigned long SHOW_DOCUMENT_FRAGMENT = 0x400;
  const unsigned long SHOW_NOTATION = 0x800; // legacy

  unsigned short acceptNode(Node node);
};

[Exposed=Window]
interface DOMTokenList {
  readonly attribute unsigned long length;
  getter DOMString? item(unsigned long index);
  boolean contains(DOMString token);
  [CEReactions] undefined add(DOMString... tokens);
  [CEReactions] undefined remove(DOMString... tokens);
  [CEReactions] boolean toggle(DOMString token, optional boolean force);
  [CEReactions] boolean replace(DOMString token, DOMString newToken);
  boolean supports(DOMString token);
  [CEReactions] stringifier attribute DOMString value;
  iterable<DOMString>;
};

[Exposed=Window]
interface XPathResult {
  const unsigned short ANY_TYPE = 0;
  const unsigned short NUMBER_TYPE = 1;
  const unsigned short STRING_TYPE = 2;
  const unsigned short BOOLEAN_TYPE = 3;
  const unsigned short UNORDERED_NODE_ITERATOR_TYPE = 4;
  const unsigned short ORDERED_NODE_ITERATOR_TYPE = 5;
  const unsigned short UNORDERED_NODE_SNAPSHOT_TYPE = 6;
  const unsigned short ORDERED_NODE_SNAPSHOT_TYPE = 7;
  const unsigned short ANY_UNORDERED_NODE_TYPE = 8;
  const unsigned short FIRST_ORDERED_NODE_TYPE = 9;

  readonly attribute unsigned short resultType;
  readonly attribute unrestricted double numberValue;
  readonly attribute DOMString stringValue;
  readonly attribute boolean booleanValue;
  readonly attribute Node? singleNodeValue;
  readonly attribute boolean invalidIteratorState;
  readonly attribute unsigned long snapshotLength;

  Node? iterateNext();
  Node? snapshotItem(unsigned long index);
};

[Exposed=Window]
interface XPathExpression {
  // XPathResult.ANY_TYPE = 0
  XPathResult evaluate(Node contextNode, optional unsigned short type = 0, optional XPathResult? result = null);
};

callback interface XPathNSResolver {
  DOMString? lookupNamespaceURI(DOMString? prefix);
};

interface mixin XPathEvaluatorBase {
  [NewObject] XPathExpression createExpression(DOMString expression, optional XPathNSResolver? resolver = null);
  Node createNSResolver(Node nodeResolver); // legacy
  // XPathResult.ANY_TYPE = 0
  XPathResult evaluate(DOMString expression, Node contextNode, optional XPathNSResolver? resolver = null, optional unsigned short type = 0, optional XPathResult? result = null);
};
Document includes XPathEvaluatorBase;

[Exposed=Window]
interface XPathEvaluator {
  constructor();
};

XPathEvaluator includes XPathEvaluatorBase;

[Exposed=Window]
interface XSLTProcessor {
  constructor();
  undefined importStylesheet(Node style);
  [CEReactions] DocumentFragment transformToFragment(Node source, Document output);
  [CEReactions] Document transformToDocument(Node source);
  undefined setParameter([LegacyNullToEmptyString] DOMString namespaceURI, DOMString localName, any value);
  any getParameter([LegacyNullToEmptyString] DOMString namespaceURI, DOMString localName);
  undefined removeParameter([LegacyNullToEmptyString] DOMString namespaceURI, DOMString localName);
  undefined clearParameters();
  undefined reset();
};

dictionary WebAssemblyInstantiatedSource {
	required Module module;
	required Instance instance;
};

[Exposed=*]
namespace WebAssembly {
	boolean validate(BufferSource bytes);
	Promise<Module> compile(BufferSource bytes);

	Promise<WebAssemblyInstantiatedSource> instantiate(
		 BufferSource bytes, optional object importObject);

	Promise<Instance> instantiate(
		 Module moduleObject, optional object importObject);
};

enum ImportExportKind {
 "function",
 "table",
 "memory",
 "global"
};

dictionary ModuleExportDescriptor {
 required USVString name;
 required ImportExportKind kind;
 // Note: Other fields such as signature may be added in the future.
};

dictionary ModuleImportDescriptor {
 required USVString module;
 required USVString name;
 required ImportExportKind kind;
};

[LegacyNamespace=WebAssembly, Exposed=*]
interface Module {
 constructor(BufferSource bytes);
 static sequence<ModuleExportDescriptor> exports(Module moduleObject);
 static sequence<ModuleImportDescriptor> imports(Module moduleObject);
 static sequence<ArrayBuffer> customSections(Module moduleObject, DOMString sectionName);
};

[LegacyNamespace=WebAssembly, Exposed=*]
interface Instance {
 constructor(Module module, optional object importObject);
 readonly attribute object exports;
};

dictionary MemoryDescriptor {
 required [EnforceRange] unsigned long initial;
 [EnforceRange] unsigned long maximum;
};

[LegacyNamespace=WebAssembly, Exposed=*]
interface Memory {
 constructor(MemoryDescriptor descriptor);
 unsigned long grow([EnforceRange] unsigned long delta);
 readonly attribute ArrayBuffer buffer;
};

enum TableKind {
 "externref",
 "anyfunc",
 // Note: More values may be added in future iterations,
 // e.g., typed function references, typed GC references
};

dictionary TableDescriptor {
 required TableKind element;
 required [EnforceRange] unsigned long initial;
 [EnforceRange] unsigned long maximum;
};

[LegacyNamespace=WebAssembly, Exposed=*]
interface Table {
 constructor(TableDescriptor descriptor, optional any value);
 unsigned long grow([EnforceRange] unsigned long delta, optional any value);
 any get([EnforceRange] unsigned long index);
 undefined set([EnforceRange] unsigned long index, optional any value);
 readonly attribute unsigned long length;
};

enum ValueType {
 "i32",
 "i64",
 "f32",
 "f64",
 "v128",
 "externref",
 "anyfunc",
};

dictionary GlobalDescriptor {
 required ValueType value;
 boolean mutable = false;
};

[LegacyNamespace=WebAssembly, Exposed=*]
interface Global {
 constructor(GlobalDescriptor descriptor, optional any v);
 any valueOf();
 attribute any value;
};

interface mixin GPUObjectBase {
	attribute USVString label;
};

dictionary GPUObjectDescriptorBase {
	USVString label = "";
};

[Exposed=(Window, DedicatedWorker), SecureContext]
interface GPUSupportedLimits {
	readonly attribute unsigned long maxTextureDimension1D;
	readonly attribute unsigned long maxTextureDimension2D;
};

[Exposed=(Window, DedicatedWorker), SecureContext]
interface GPUSupportedFeatures {
	readonly setlike<DOMString>;
};

[Exposed=(Window, DedicatedWorker), SecureContext]
interface WGSLLanguageFeatures {
	readonly setlike<DOMString>;
};

[Exposed=(Window, DedicatedWorker), SecureContext]
interface GPUAdapterInfo {
	readonly attribute DOMString vendor;
	readonly attribute DOMString architecture;
	readonly attribute DOMString device;
	readonly attribute DOMString description;
};

interface mixin NavigatorGPU {
	[SameObject, SecureContext] readonly attribute GPU gpu;
};
Navigator includes NavigatorGPU;
WorkerNavigator includes NavigatorGPU;

[Exposed=(Window, DedicatedWorker), SecureContext]
interface GPU {
	Promise<GPUAdapter?> requestAdapter(optional GPURequestAdapterOptions options = {});
	GPUTextureFormat getPreferredCanvasFormat();
	[SameObject] readonly attribute WGSLLanguageFeatures wgslLanguageFeatures;
};

dictionary GPURequestAdapterOptions {
	GPUPowerPreference powerPreference;
	boolean forceFallbackAdapter = false;
};

enum GPUPowerPreference {
	"low-power",
	"high-performance",
};

[Exposed=(Window, DedicatedWorker), SecureContext]
interface GPUAdapter {
	[SameObject] readonly attribute GPUSupportedFeatures features;
	[SameObject] readonly attribute GPUSupportedLimits limits;
	readonly attribute boolean isFallbackAdapter;

	Promise<GPUDevice> requestDevice(optional GPUDeviceDescriptor descriptor = {});
	Promise<GPUAdapterInfo> requestAdapterInfo(optional sequence<DOMString> unmaskHints = []);
};

dictionary GPUDeviceDescriptor
		  : GPUObjectDescriptorBase {
	sequence<GPUFeatureName> requiredFeatures = [];
	record<DOMString, GPUSize64> requiredLimits = {};
	GPUQueueDescriptor defaultQueue = {};
};

enum GPUFeatureName {
	"depth-clip-control",
	"depth32float-stencil8",
	"texture-compression-bc",
	"texture-compression-etc2",
	"texture-compression-astc",
	"timestamp-query",
	"indirect-first-instance",
	"shader-f16",
	"rg11b10ufloat-renderable",
	"bgra8unorm-storage",
	"float32-filterable",
};

[Exposed=(Window, DedicatedWorker), SecureContext]
interface GPUDevice : EventTarget {
	[SameObject] readonly attribute GPUSupportedFeatures features;
	[SameObject] readonly attribute GPUSupportedLimits limits;

	[SameObject] readonly attribute GPUQueue queue;

	undefined destroy();

	GPUBuffer createBuffer(GPUBufferDescriptor descriptor);
	GPUTexture createTexture(GPUTextureDescriptor descriptor);
	GPUSampler createSampler(optional GPUSamplerDescriptor descriptor = {});
	GPUExternalTexture importExternalTexture(GPUExternalTextureDescriptor descriptor);

	GPUBindGroupLayout createBindGroupLayout(GPUBindGroupLayoutDescriptor descriptor);
	GPUPipelineLayout createPipelineLayout(GPUPipelineLayoutDescriptor descriptor);
	GPUBindGroup createBindGroup(GPUBindGroupDescriptor descriptor);

	GPUShaderModule createShaderModule(GPUShaderModuleDescriptor descriptor);
	GPUComputePipeline createComputePipeline(GPUComputePipelineDescriptor descriptor);
	GPURenderPipeline createRenderPipeline(GPURenderPipelineDescriptor descriptor);
	Promise<GPUComputePipeline> createComputePipelineAsync(GPUComputePipelineDescriptor descriptor);
	Promise<GPURenderPipeline> createRenderPipelineAsync(GPURenderPipelineDescriptor descriptor);

	GPUCommandEncoder createCommandEncoder(optional GPUCommandEncoderDescriptor descriptor = {});
	GPURenderBundleEncoder createRenderBundleEncoder(GPURenderBundleEncoderDescriptor descriptor);

	GPUQuerySet createQuerySet(GPUQuerySetDescriptor descriptor);
};
GPUDevice includes GPUObjectBase;

[Exposed=(Window, DedicatedWorker), SecureContext]
interface GPUBuffer {
	readonly attribute GPUSize64Out size;
	readonly attribute GPUFlagsConstant usage;

	readonly attribute GPUBufferMapState mapState;

	Promise<undefined> mapAsync(GPUMapModeFlags mode, optional GPUSize64 offset = 0, optional GPUSize64 size);
	ArrayBuffer getMappedRange(optional GPUSize64 offset = 0, optional GPUSize64 size);
	undefined unmap();

	undefined destroy();
};
GPUBuffer includes GPUObjectBase;

enum GPUBufferMapState {
	"unmapped",
	"pending",
	"mapped",
};

dictionary GPUBufferDescriptor
		  : GPUObjectDescriptorBase {
	required GPUSize64 size;
	required GPUBufferUsageFlags usage;
	boolean mappedAtCreation = false;
};

typedef [EnforceRange] unsigned long GPUBufferUsageFlags;
[Exposed=(Window, DedicatedWorker), SecureContext]
namespace GPUBufferUsage {
	const GPUFlagsConstant MAP_READ      = 0x0001;
	const GPUFlagsConstant MAP_WRITE     = 0x0002;
	const GPUFlagsConstant COPY_SRC      = 0x0004;
	const GPUFlagsConstant COPY_DST      = 0x0008;
	const GPUFlagsConstant INDEX         = 0x0010;
	const GPUFlagsConstant VERTEX        = 0x0020;
	const GPUFlagsConstant UNIFORM       = 0x0040;
	const GPUFlagsConstant STORAGE       = 0x0080;
	const GPUFlagsConstant INDIRECT      = 0x0100;
	const GPUFlagsConstant QUERY_RESOLVE = 0x0200;
};

typedef [EnforceRange] unsigned long GPUMapModeFlags;
[Exposed=(Window, DedicatedWorker), SecureContext]
namespace GPUMapMode {
	const GPUFlagsConstant READ  = 0x0001;
	const GPUFlagsConstant WRITE = 0x0002;
};

[Exposed=(Window, DedicatedWorker), SecureContext]
interface GPUTexture {
	GPUTextureView createView(optional GPUTextureViewDescriptor descriptor = {});

	undefined destroy();

	readonly attribute GPUIntegerCoordinateOut width;
	readonly attribute GPUIntegerCoordinateOut height;
	readonly attribute GPUIntegerCoordinateOut depthOrArrayLayers;
	readonly attribute GPUIntegerCoordinateOut mipLevelCount;
	readonly attribute GPUSize32Out sampleCount;
	readonly attribute GPUTextureDimension dimension;
	readonly attribute GPUTextureFormat format;
	readonly attribute GPUFlagsConstant usage;
};
GPUTexture includes GPUObjectBase;

dictionary GPUTextureDescriptor
		  : GPUObjectDescriptorBase {
	required GPUExtent3D size;
	GPUIntegerCoordinate mipLevelCount = 1;
	GPUSize32 sampleCount = 1;
	GPUTextureDimension dimension = "2d";
	required GPUTextureFormat format;
	required GPUTextureUsageFlags usage;
	sequence<GPUTextureFormat> viewFormats = [];
};

enum GPUTextureDimension {
	"1d",
	"2d",
	"3d",
};

typedef [EnforceRange] unsigned long GPUTextureUsageFlags;
[Exposed=(Window, DedicatedWorker), SecureContext]
namespace GPUTextureUsage {
	const GPUFlagsConstant COPY_SRC          = 0x01;
	const GPUFlagsConstant COPY_DST          = 0x02;
	const GPUFlagsConstant TEXTURE_BINDING   = 0x04;
	const GPUFlagsConstant STORAGE_BINDING   = 0x08;
	const GPUFlagsConstant RENDER_ATTACHMENT = 0x10;
};

[Exposed=(Window, DedicatedWorker), SecureContext]
interface GPUTextureView {
};
GPUTextureView includes GPUObjectBase;

dictionary GPUTextureViewDescriptor
		  : GPUObjectDescriptorBase {
	GPUTextureFormat format;
	GPUTextureViewDimension dimension;
	GPUTextureAspect aspect = "all";
	GPUIntegerCoordinate baseMipLevel = 0;
	GPUIntegerCoordinate mipLevelCount;
	GPUIntegerCoordinate baseArrayLayer = 0;
	GPUIntegerCoordinate arrayLayerCount;
};

enum GPUTextureViewDimension {
	"1d",
	"2d",
	"2d-array",
	"cube",
	"cube-array",
	"3d",
};

enum GPUTextureAspect {
	"all",
	"stencil-only",
	"depth-only",
};

enum GPUTextureFormat {
	// 8-bit formats
	"r8unorm",
	"r8snorm",
	"r8uint",
	"r8sint",

	// 16-bit formats
	"r16uint",
	"r16sint",
	"r16float",
	"rg8unorm",
	"rg8snorm",
	"rg8uint",
	"rg8sint",

	// 32-bit formats
	"r32uint",
	"r32sint",
	"r32float",
	"rg16uint",
	"rg16sint",
	"rg16float",
	"rgba8unorm",
	"rgba8unorm-srgb",
	"rgba8snorm",
	"rgba8uint",
	"rgba8sint",
	"bgra8unorm",
	"bgra8unorm-srgb",
	// Packed 32-bit formats
	"rgb9e5ufloat",
	"rgb10a2unorm",
	"rg11b10ufloat",

	// 64-bit formats
	"rg32uint",
	"rg32sint",
	"rg32float",
	"rgba16uint",
	"rgba16sint",
	"rgba16float",

	// 128-bit formats
	"rgba32uint",
	"rgba32sint",
	"rgba32float",

	// Depth/stencil formats
	"stencil8",
	"depth16unorm",
	"depth24plus",
	"depth24plus-stencil8",
	"depth32float",

	// "depth32float-stencil8" feature
	"depth32float-stencil8",

	// BC compressed formats usable if "texture-compression-bc" is both
	// supported by the device/user agent and enabled in requestDevice.
	"bc1-rgba-unorm",
	"bc1-rgba-unorm-srgb",
	"bc2-rgba-unorm",
	"bc2-rgba-unorm-srgb",
	"bc3-rgba-unorm",
	"bc3-rgba-unorm-srgb",
	"bc4-r-unorm",
	"bc4-r-snorm",
	"bc5-rg-unorm",
	"bc5-rg-snorm",
	"bc6h-rgb-ufloat",
	"bc6h-rgb-float",
	"bc7-rgba-unorm",
	"bc7-rgba-unorm-srgb",

	// ETC2 compressed formats usable if "texture-compression-etc2" is both
	// supported by the device/user agent and enabled in requestDevice.
	"etc2-rgb8unorm",
	"etc2-rgb8unorm-srgb",
	"etc2-rgb8a1unorm",
	"etc2-rgb8a1unorm-srgb",
	"etc2-rgba8unorm",
	"etc2-rgba8unorm-srgb",
	"eac-r11unorm",
	"eac-r11snorm",
	"eac-rg11unorm",
	"eac-rg11snorm",

	// ASTC compressed formats usable if "texture-compression-astc" is both
	// supported by the device/user agent and enabled in requestDevice.
	"astc-4x4-unorm",
	"astc-4x4-unorm-srgb",
	"astc-5x4-unorm",
	"astc-5x4-unorm-srgb",
	"astc-5x5-unorm",
	"astc-5x5-unorm-srgb",
	"astc-6x5-unorm",
	"astc-6x5-unorm-srgb",
	"astc-6x6-unorm",
	"astc-6x6-unorm-srgb",
	"astc-8x5-unorm",
	"astc-8x5-unorm-srgb",
	"astc-8x6-unorm",
	"astc-8x6-unorm-srgb",
	"astc-8x8-unorm",
	"astc-8x8-unorm-srgb",
	"astc-10x5-unorm",
	"astc-10x5-unorm-srgb",
	"astc-10x6-unorm",
	"astc-10x6-unorm-srgb",
	"astc-10x8-unorm",
	"astc-10x8-unorm-srgb",
	"astc-10x10-unorm",
	"astc-10x10-unorm-srgb",
	"astc-12x10-unorm",
	"astc-12x10-unorm-srgb",
	"astc-12x12-unorm",
	"astc-12x12-unorm-srgb",
};

[Exposed=(Window, DedicatedWorker), SecureContext]
interface GPUExternalTexture {
};
GPUExternalTexture includes GPUObjectBase;

dictionary GPUExternalTextureDescriptor
		  : GPUObjectDescriptorBase {
	required (HTMLVideoElement or VideoFrame) source;
	PredefinedColorSpace colorSpace = "srgb";
};

[Exposed=(Window, DedicatedWorker), SecureContext]
interface GPUSampler {
};
GPUSampler includes GPUObjectBase;

dictionary GPUSamplerDescriptor
		  : GPUObjectDescriptorBase {
	GPUAddressMode addressModeU = "clamp-to-edge";
	GPUAddressMode addressModeV = "clamp-to-edge";
	GPUAddressMode addressModeW = "clamp-to-edge";
	GPUFilterMode magFilter = "nearest";
	GPUFilterMode minFilter = "nearest";
	GPUMipmapFilterMode mipmapFilter = "nearest";
	float lodMinClamp = 0;
	float lodMaxClamp = 32;
	GPUCompareFunction compare;
	[Clamp] unsigned short maxAnisotropy = 1;
};

enum GPUAddressMode {
	"clamp-to-edge",
	"repeat",
	"mirror-repeat",
};

enum GPUFilterMode {
	"nearest",
	"linear",
};

enum GPUMipmapFilterMode {
	"nearest",
	"linear",
};

enum GPUCompareFunction {
	"never",
	"less",
	"equal",
	"less-equal",
	"greater",
	"not-equal",
	"greater-equal",
	"always",
};

[Exposed=(Window, DedicatedWorker), SecureContext]
interface GPUBindGroupLayout {
};
GPUBindGroupLayout includes GPUObjectBase;

dictionary GPUBindGroupLayoutDescriptor
		  : GPUObjectDescriptorBase {
	required sequence<GPUBindGroupLayoutEntry> entries;
};

dictionary GPUBindGroupLayoutEntry {
	required GPUIndex32 binding;
	required GPUShaderStageFlags visibility;

	GPUBufferBindingLayout buffer;
	GPUSamplerBindingLayout sampler;
	GPUTextureBindingLayout texture;
	GPUStorageTextureBindingLayout storageTexture;
	GPUExternalTextureBindingLayout externalTexture;
};

typedef [EnforceRange] unsigned long GPUShaderStageFlags;
[Exposed=(Window, DedicatedWorker), SecureContext]
namespace GPUShaderStage {
	const GPUFlagsConstant VERTEX   = 0x1;
	const GPUFlagsConstant FRAGMENT = 0x2;
	const GPUFlagsConstant COMPUTE  = 0x4;
};

enum GPUBufferBindingType {
	"uniform",
	"storage",
	"read-only-storage",
};

dictionary GPUBufferBindingLayout {
	GPUBufferBindingType type = "uniform";
	boolean hasDynamicOffset = false;
	GPUSize64 minBindingSize = 0;
};

enum GPUSamplerBindingType {
	"filtering",
	"non-filtering",
	"comparison",
};

dictionary GPUSamplerBindingLayout {
	GPUSamplerBindingType type = "filtering";
};

enum GPUTextureSampleType {
	"float",
	"unfilterable-float",
	"depth",
	"sint",
	"uint",
};

dictionary GPUTextureBindingLayout {
	GPUTextureSampleType sampleType = "float";
	GPUTextureViewDimension viewDimension = "2d";
	boolean multisampled = false;
};

enum GPUStorageTextureAccess {
	"write-only",
};

dictionary GPUStorageTextureBindingLayout {
	GPUStorageTextureAccess access = "write-only";
	required GPUTextureFormat format;
	GPUTextureViewDimension viewDimension = "2d";
};

dictionary GPUExternalTextureBindingLayout {
};

[Exposed=(Window, DedicatedWorker), SecureContext]
interface GPUBindGroup {
};
GPUBindGroup includes GPUObjectBase;

dictionary GPUBindGroupDescriptor
		  : GPUObjectDescriptorBase {
	required GPUBindGroupLayout layout;
	required sequence<GPUBindGroupEntry> entries;
};

typedef (GPUSampler or GPUTextureView or GPUBufferBinding or GPUExternalTexture) GPUBindingResource;

dictionary GPUBindGroupEntry {
	required GPUIndex32 binding;
	required GPUBindingResource resource;
};

dictionary GPUBufferBinding {
	required GPUBuffer buffer;
	GPUSize64 offset = 0;
	GPUSize64 size;
};

[Exposed=(Window, DedicatedWorker), SecureContext]
interface GPUPipelineLayout {
};
GPUPipelineLayout includes GPUObjectBase;

dictionary GPUPipelineLayoutDescriptor
		  : GPUObjectDescriptorBase {
	required sequence<GPUBindGroupLayout> bindGroupLayouts;
};

[Exposed=(Window, DedicatedWorker), SecureContext]
interface GPUShaderModule {
	Promise<GPUCompilationInfo> getCompilationInfo();
};
GPUShaderModule includes GPUObjectBase;

dictionary GPUShaderModuleDescriptor
		  : GPUObjectDescriptorBase {
	required USVString code;
	object sourceMap;
	record<USVString, GPUShaderModuleCompilationHint> hints;
};

dictionary GPUShaderModuleCompilationHint {
	(GPUPipelineLayout or GPUAutoLayoutMode) layout;
};

enum GPUCompilationMessageType {
	"error",
	"warning",
	"info",
};

[Exposed=(Window, DedicatedWorker), Serializable, SecureContext]
interface GPUCompilationMessage {
	readonly attribute DOMString message;
	readonly attribute GPUCompilationMessageType type;
	readonly attribute unsigned long long lineNum;
	readonly attribute unsigned long long linePos;
	readonly attribute unsigned long long offset;
	readonly attribute unsigned long long length;
};

[Exposed=(Window, DedicatedWorker), Serializable, SecureContext]
interface GPUCompilationInfo {
	readonly attribute FrozenArray<GPUCompilationMessage> messages;
};

[Exposed=(Window, DedicatedWorker), SecureContext, Serializable]
interface GPUPipelineError : DOMException {
	constructor(optional DOMString message = "", GPUPipelineErrorInit options);
	readonly attribute GPUPipelineErrorReason reason;
};

dictionary GPUPipelineErrorInit {
	required GPUPipelineErrorReason reason;
};

enum GPUPipelineErrorReason {
	"validation",
	"internal",
};

enum GPUAutoLayoutMode {
	"auto",
};

dictionary GPUPipelineDescriptorBase
		  : GPUObjectDescriptorBase {
	required (GPUPipelineLayout or GPUAutoLayoutMode) layout;
};

interface mixin GPUPipelineBase {
	[NewObject] GPUBindGroupLayout getBindGroupLayout(unsigned long index);
};

dictionary GPUProgrammableStage {
	required GPUShaderModule module;
	required USVString entryPoint;
	record<USVString, GPUPipelineConstantValue> constants;
};

typedef double GPUPipelineConstantValue; // May represent WGSL’s bool, f32, i32, u32, and f16 if enabled.

[Exposed=(Window, DedicatedWorker), SecureContext]
interface GPUComputePipeline {
};
GPUComputePipeline includes GPUObjectBase;
GPUComputePipeline includes GPUPipelineBase;

dictionary GPUComputePipelineDescriptor
		  : GPUPipelineDescriptorBase {
	required GPUProgrammableStage compute;
};

[Exposed=(Window, DedicatedWorker), SecureContext]
interface GPURenderPipeline {
};
GPURenderPipeline includes GPUObjectBase;
GPURenderPipeline includes GPUPipelineBase;

dictionary GPURenderPipelineDescriptor
		  : GPUPipelineDescriptorBase {
	required GPUVertexState vertex;
	GPUPrimitiveState primitive = {};
	GPUDepthStencilState depthStencil;
	GPUMultisampleState multisample = {};
	GPUFragmentState fragment;
};

dictionary GPUPrimitiveState {
	GPUPrimitiveTopology topology = "triangle-list";
	GPUIndexFormat stripIndexFormat;
	GPUFrontFace frontFace = "ccw";
	GPUCullMode cullMode = "none";

	// Requires "depth-clip-control" feature.
	boolean unclippedDepth = false;
};

enum GPUPrimitiveTopology {
	"point-list",
	"line-list",
	"line-strip",
	"triangle-list",
	"triangle-strip",
};

enum GPUFrontFace {
	"ccw",
	"cw",
};

enum GPUCullMode {
	"none",
	"front",
	"back",
};

dictionary GPUMultisampleState {
	GPUSize32 count = 1;
	GPUSampleMask mask = 0xFFFFFFFF;
	boolean alphaToCoverageEnabled = false;
};

dictionary GPUFragmentState
		  : GPUProgrammableStage {
	required sequence<GPUColorTargetState?> targets;
};

dictionary GPUColorTargetState {
	required GPUTextureFormat format;

	GPUBlendState blend;
	GPUColorWriteFlags writeMask = 0xF;  // GPUColorWrite.ALL
};

dictionary GPUBlendState {
	required GPUBlendComponent color;
	required GPUBlendComponent alpha;
};

typedef [EnforceRange] unsigned long GPUColorWriteFlags;
[Exposed=(Window, DedicatedWorker), SecureContext]
namespace GPUColorWrite {
	const GPUFlagsConstant RED   = 0x1;
	const GPUFlagsConstant GREEN = 0x2;
	const GPUFlagsConstant BLUE  = 0x4;
	const GPUFlagsConstant ALPHA = 0x8;
	const GPUFlagsConstant ALL   = 0xF;
};

dictionary GPUBlendComponent {
	GPUBlendOperation operation = "add";
	GPUBlendFactor srcFactor = "one";
	GPUBlendFactor dstFactor = "zero";
};

enum GPUBlendFactor {
	"zero",
	"one",
	"src",
	"one-minus-src",
	"src-alpha",
	"one-minus-src-alpha",
	"dst",
	"one-minus-dst",
	"dst-alpha",
	"one-minus-dst-alpha",
	"src-alpha-saturated",
	"constant",
	"one-minus-constant",
};

enum GPUBlendOperation {
	"add",
	"subtract",
	"reverse-subtract",
	"min",
	"max",
};

dictionary GPUDepthStencilState {
	required GPUTextureFormat format;

	required boolean depthWriteEnabled;
	required GPUCompareFunction depthCompare;

	GPUStencilFaceState stencilFront = {};
	GPUStencilFaceState stencilBack = {};

	GPUStencilValue stencilReadMask = 0xFFFFFFFF;
	GPUStencilValue stencilWriteMask = 0xFFFFFFFF;

	GPUDepthBias depthBias = 0;
	float depthBiasSlopeScale = 0;
	float depthBiasClamp = 0;
};

dictionary GPUStencilFaceState {
	GPUCompareFunction compare = "always";
	GPUStencilOperation failOp = "keep";
	GPUStencilOperation depthFailOp = "keep";
	GPUStencilOperation passOp = "keep";
};

enum GPUStencilOperation {
	"keep",
	"zero",
	"replace",
	"invert",
	"increment-clamp",
	"decrement-clamp",
	"increment-wrap",
	"decrement-wrap",
};

enum GPUIndexFormat {
	"uint16",
	"uint32",
};

enum GPUVertexFormat {
	"uint8x2",
	"uint8x4",
	"sint8x2",
	"sint8x4",
	"unorm8x2",
	"unorm8x4",
	"snorm8x2",
	"snorm8x4",
	"uint16x2",
	"uint16x4",
	"sint16x2",
	"sint16x4",
	"unorm16x2",
	"unorm16x4",
	"snorm16x2",
	"snorm16x4",
	"float16x2",
	"float16x4",
	"float32",
	"float32x2",
	"float32x3",
	"float32x4",
	"uint32",
	"uint32x2",
	"uint32x3",
	"uint32x4",
	"sint32",
	"sint32x2",
	"sint32x3",
	"sint32x4",
};

enum GPUVertexStepMode {
	"vertex",
	"instance",
};

dictionary GPUVertexState
		  : GPUProgrammableStage {
	sequence<GPUVertexBufferLayout?> buffers = [];
};

dictionary GPUVertexBufferLayout {
	required GPUSize64 arrayStride;
	GPUVertexStepMode stepMode = "vertex";
	required sequence<GPUVertexAttribute> attributes;
};

dictionary GPUVertexAttribute {
	required GPUVertexFormat format;
	required GPUSize64 offset;

	required GPUIndex32 shaderLocation;
};

dictionary GPUImageDataLayout {
	GPUSize64 offset = 0;
	GPUSize32 bytesPerRow;
	GPUSize32 rowsPerImage;
};

dictionary GPUImageCopyBuffer
		  : GPUImageDataLayout {
	required GPUBuffer buffer;
};

dictionary GPUImageCopyTexture {
	required GPUTexture texture;
	GPUIntegerCoordinate mipLevel = 0;
	GPUOrigin3D origin = {};
	GPUTextureAspect aspect = "all";
};

dictionary GPUImageCopyTextureTagged
		  : GPUImageCopyTexture {
	PredefinedColorSpace colorSpace = "srgb";
	boolean premultipliedAlpha = false;
};

typedef (ImageBitmap or
		  HTMLVideoElement or
		  VideoFrame or
		  HTMLCanvasElement or
		  OffscreenCanvas) GPUImageCopyExternalImageSource;

dictionary GPUImageCopyExternalImage {
	required GPUImageCopyExternalImageSource source;
	GPUOrigin2D origin = {};
	boolean flipY = false;
};

[Exposed=(Window, DedicatedWorker), SecureContext]
interface GPUCommandBuffer {
};
GPUCommandBuffer includes GPUObjectBase;

dictionary GPUCommandBufferDescriptor
		  : GPUObjectDescriptorBase {
};

interface mixin GPUCommandsMixin {
};

[Exposed=(Window, DedicatedWorker), SecureContext]
interface GPUCommandEncoder {
	GPURenderPassEncoder beginRenderPass(GPURenderPassDescriptor descriptor);
	GPUComputePassEncoder beginComputePass(optional GPUComputePassDescriptor descriptor = {});

	undefined copyBufferToBuffer(
		 GPUBuffer source,
		 GPUSize64 sourceOffset,
		 GPUBuffer destination,
		 GPUSize64 destinationOffset,
		 GPUSize64 size);

	undefined copyBufferToTexture(
		 GPUImageCopyBuffer source,
		 GPUImageCopyTexture destination,
		 GPUExtent3D copySize);

	undefined copyTextureToBuffer(
		 GPUImageCopyTexture source,
		 GPUImageCopyBuffer destination,
		 GPUExtent3D copySize);

	undefined copyTextureToTexture(
		 GPUImageCopyTexture source,
		 GPUImageCopyTexture destination,
		 GPUExtent3D copySize);

	undefined clearBuffer(
		 GPUBuffer buffer,
		 optional GPUSize64 offset = 0,
		 optional GPUSize64 size);

	undefined writeTimestamp(GPUQuerySet querySet, GPUSize32 queryIndex);

	undefined resolveQuerySet(
		 GPUQuerySet querySet,
		 GPUSize32 firstQuery,
		 GPUSize32 queryCount,
		 GPUBuffer destination,
		 GPUSize64 destinationOffset);

	GPUCommandBuffer finish(optional GPUCommandBufferDescriptor descriptor = {});
};
GPUCommandEncoder includes GPUObjectBase;
GPUCommandEncoder includes GPUCommandsMixin;
GPUCommandEncoder includes GPUDebugCommandsMixin;

dictionary GPUCommandEncoderDescriptor
		  : GPUObjectDescriptorBase {
};

interface mixin GPUBindingCommandsMixin {
	undefined setBindGroup(GPUIndex32 index, GPUBindGroup? bindGroup,
		 optional sequence<GPUBufferDynamicOffset> dynamicOffsets = []);

	undefined setBindGroup(GPUIndex32 index, GPUBindGroup? bindGroup,
		 Uint32Array dynamicOffsetsData,
		 GPUSize64 dynamicOffsetsDataStart,
		 GPUSize32 dynamicOffsetsDataLength);
};

interface mixin GPUDebugCommandsMixin {
	undefined pushDebugGroup(USVString groupLabel);
	undefined popDebugGroup();
	undefined insertDebugMarker(USVString markerLabel);
};

[Exposed=(Window, DedicatedWorker), SecureContext]
interface GPUComputePassEncoder {
	undefined setPipeline(GPUComputePipeline pipeline);
	undefined dispatchWorkgroups(GPUSize32 workgroupCountX, optional GPUSize32 workgroupCountY = 1, optional GPUSize32 workgroupCountZ = 1);
	undefined dispatchWorkgroupsIndirect(GPUBuffer indirectBuffer, GPUSize64 indirectOffset);

	undefined end();
};
GPUComputePassEncoder includes GPUObjectBase;
GPUComputePassEncoder includes GPUCommandsMixin;
GPUComputePassEncoder includes GPUDebugCommandsMixin;
GPUComputePassEncoder includes GPUBindingCommandsMixin;

dictionary GPUComputePassTimestampWrites {
	required GPUQuerySet querySet;
	GPUSize32 beginningOfPassWriteIndex;
	GPUSize32 endOfPassWriteIndex;
};

dictionary GPUComputePassDescriptor
		  : GPUObjectDescriptorBase {
	GPUComputePassTimestampWrites timestampWrites;
};

[Exposed=(Window, DedicatedWorker), SecureContext]
interface GPURenderPassEncoder {
	undefined setViewport(float x, float y,
		 float width, float height,
		 float minDepth, float maxDepth);

	undefined setScissorRect(GPUIntegerCoordinate x, GPUIntegerCoordinate y,
							  GPUIntegerCoordinate width, GPUIntegerCoordinate height);

	undefined setBlendConstant(GPUColor color);
	undefined setStencilReference(GPUStencilValue reference);

	undefined beginOcclusionQuery(GPUSize32 queryIndex);
	undefined endOcclusionQuery();

	undefined executeBundles(sequence<GPURenderBundle> bundles);
	undefined end();
};
GPURenderPassEncoder includes GPUObjectBase;
GPURenderPassEncoder includes GPUCommandsMixin;
GPURenderPassEncoder includes GPUDebugCommandsMixin;
GPURenderPassEncoder includes GPUBindingCommandsMixin;
GPURenderPassEncoder includes GPURenderCommandsMixin;

dictionary GPURenderPassTimestampWrites {
	required GPUQuerySet querySet;
	GPUSize32 beginningOfPassWriteIndex;
	GPUSize32 endOfPassWriteIndex;
};

dictionary GPURenderPassDescriptor
		  : GPUObjectDescriptorBase {
	required sequence<GPURenderPassColorAttachment?> colorAttachments;
	GPURenderPassDepthStencilAttachment depthStencilAttachment;
	GPUQuerySet occlusionQuerySet;
	GPURenderPassTimestampWrites timestampWrites;
	GPUSize64 maxDrawCount = 50000000;
};

dictionary GPURenderPassColorAttachment {
	required GPUTextureView view;
	GPUTextureView resolveTarget;

	GPUColor clearValue;
	required GPULoadOp loadOp;
	required GPUStoreOp storeOp;
};

dictionary GPURenderPassDepthStencilAttachment {
	required GPUTextureView view;

	float depthClearValue;
	GPULoadOp depthLoadOp;
	GPUStoreOp depthStoreOp;
	boolean depthReadOnly = false;

	GPUStencilValue stencilClearValue = 0;
	GPULoadOp stencilLoadOp;
	GPUStoreOp stencilStoreOp;
	boolean stencilReadOnly = false;
};

enum GPULoadOp {
	"load",
	"clear",
};

enum GPUStoreOp {
	"store",
	"discard",
};

dictionary GPURenderPassLayout
		  : GPUObjectDescriptorBase {
	required sequence<GPUTextureFormat?> colorFormats;
	GPUTextureFormat depthStencilFormat;
	GPUSize32 sampleCount = 1;
};

interface mixin GPURenderCommandsMixin {
	undefined setPipeline(GPURenderPipeline pipeline);

	undefined setIndexBuffer(GPUBuffer buffer, GPUIndexFormat indexFormat, optional GPUSize64 offset = 0, optional GPUSize64 size);
	undefined setVertexBuffer(GPUIndex32 slot, GPUBuffer? buffer, optional GPUSize64 offset = 0, optional GPUSize64 size);

	undefined draw(GPUSize32 vertexCount, optional GPUSize32 instanceCount = 1,
		 optional GPUSize32 firstVertex = 0, optional GPUSize32 firstInstance = 0);
	undefined drawIndexed(GPUSize32 indexCount, optional GPUSize32 instanceCount = 1,
		 optional GPUSize32 firstIndex = 0,
		 optional GPUSignedOffset32 baseVertex = 0,
		 optional GPUSize32 firstInstance = 0);

	undefined drawIndirect(GPUBuffer indirectBuffer, GPUSize64 indirectOffset);
	undefined drawIndexedIndirect(GPUBuffer indirectBuffer, GPUSize64 indirectOffset);
};

[Exposed=(Window, DedicatedWorker), SecureContext]
interface GPURenderBundle {
};
GPURenderBundle includes GPUObjectBase;

dictionary GPURenderBundleDescriptor
		  : GPUObjectDescriptorBase {
};

[Exposed=(Window, DedicatedWorker), SecureContext]
interface GPURenderBundleEncoder {
	GPURenderBundle finish(optional GPURenderBundleDescriptor descriptor = {});
};
GPURenderBundleEncoder includes GPUObjectBase;
GPURenderBundleEncoder includes GPUCommandsMixin;
GPURenderBundleEncoder includes GPUDebugCommandsMixin;
GPURenderBundleEncoder includes GPUBindingCommandsMixin;
GPURenderBundleEncoder includes GPURenderCommandsMixin;

dictionary GPURenderBundleEncoderDescriptor
		  : GPURenderPassLayout {
	boolean depthReadOnly = false;
	boolean stencilReadOnly = false;
};

dictionary GPUQueueDescriptor
		  : GPUObjectDescriptorBase {
};

[Exposed=(Window, DedicatedWorker), SecureContext]
interface GPUQueue {
	undefined submit(sequence<GPUCommandBuffer> commandBuffers);

	Promise<undefined> onSubmittedWorkDone();

	undefined writeBuffer(
		 GPUBuffer buffer,
		 GPUSize64 bufferOffset,
		 AllowSharedBufferSource data,
		 optional GPUSize64 dataOffset = 0,
		 optional GPUSize64 size);

	undefined writeTexture(
		 GPUImageCopyTexture destination,
		 AllowSharedBufferSource data,
		 GPUImageDataLayout dataLayout,
		 GPUExtent3D size);

	undefined copyExternalImageToTexture(
		 GPUImageCopyExternalImage source,
		 GPUImageCopyTextureTagged destination,
		 GPUExtent3D copySize);
};
GPUQueue includes GPUObjectBase;

[Exposed=(Window, DedicatedWorker), SecureContext]
interface GPUQuerySet {
	undefined destroy();

	readonly attribute GPUQueryType type;
	readonly attribute GPUSize32Out count;
};
GPUQuerySet includes GPUObjectBase;

dictionary GPUQuerySetDescriptor
		  : GPUObjectDescriptorBase {
	required GPUQueryType type;
	required GPUSize32 count;
};

enum GPUQueryType {
	"occlusion",
	"timestamp",
};

[Exposed=(Window, DedicatedWorker), SecureContext]
interface GPUCanvasContext {
	readonly attribute (HTMLCanvasElement or OffscreenCanvas) canvas;

	undefined configure(GPUCanvasConfiguration configuration);
	undefined unconfigure();

	GPUTexture getCurrentTexture();
};

enum GPUCanvasAlphaMode {
	"opaque",
	"premultiplied",
};

dictionary GPUCanvasConfiguration {
	required GPUDevice device;
	required GPUTextureFormat format;
	GPUTextureUsageFlags usage = 0x10;  // GPUTextureUsage.RENDER_ATTACHMENT
	sequence<GPUTextureFormat> viewFormats = [];
	PredefinedColorSpace colorSpace = "srgb";
	GPUCanvasAlphaMode alphaMode = "opaque";
};

enum GPUDeviceLostReason {
	"unknown",
	"destroyed",
};

[Exposed=(Window, DedicatedWorker), SecureContext]
interface GPUDeviceLostInfo {
	readonly attribute GPUDeviceLostReason reason;
	readonly attribute DOMString message;
};

partial interface GPUDevice {
	readonly attribute Promise<GPUDeviceLostInfo> lost;
};

[Exposed=(Window, DedicatedWorker), SecureContext]
interface GPUError {
	readonly attribute DOMString message;
};

[Exposed=(Window, DedicatedWorker), SecureContext]
interface GPUValidationError
		 : GPUError {
	constructor(DOMString message);
};

[Exposed=(Window, DedicatedWorker), SecureContext]
interface GPUOutOfMemoryError
		 : GPUError {
	constructor(DOMString message);
};

[Exposed=(Window, DedicatedWorker), SecureContext]
interface GPUInternalError
		 : GPUError {
	constructor(DOMString message);
};

enum GPUErrorFilter {
	"validation",
	"out-of-memory",
	"internal",
};

partial interface GPUDevice {
	undefined pushErrorScope(GPUErrorFilter filter);
	Promise<GPUError?> popErrorScope();
};

[Exposed=(Window, DedicatedWorker), SecureContext]
interface GPUUncapturedErrorEvent : Event {
	constructor(
		 DOMString type,
		 GPUUncapturedErrorEventInit gpuUncapturedErrorEventInitDict
	);
	[SameObject] readonly attribute GPUError error;
};

dictionary GPUUncapturedErrorEventInit : EventInit {
	required GPUError error;
};

partial interface GPUDevice {
	[Exposed=(Window, DedicatedWorker)]
	attribute EventHandler onuncapturederror;
};

typedef [EnforceRange] unsigned long GPUBufferDynamicOffset;
typedef [EnforceRange] unsigned long GPUStencilValue;
typedef [EnforceRange] unsigned long GPUSampleMask;
typedef [EnforceRange] long GPUDepthBias;

typedef [EnforceRange] unsigned long long GPUSize64;
typedef [EnforceRange] unsigned long GPUIntegerCoordinate;
typedef [EnforceRange] unsigned long GPUIndex32;
typedef [EnforceRange] unsigned long GPUSize32;
typedef [EnforceRange] long GPUSignedOffset32;

typedef unsigned long long GPUSize64Out;
typedef unsigned long GPUIntegerCoordinateOut;
typedef unsigned long GPUSize32Out;

typedef unsigned long GPUFlagsConstant;

dictionary GPUColorDict {
	required double r;
	required double g;
	required double b;
	required double a;
};
typedef (sequence<double> or GPUColorDict) GPUColor;

dictionary GPUOrigin2DDict {
	GPUIntegerCoordinate x = 0;
	GPUIntegerCoordinate y = 0;
};
typedef (sequence<GPUIntegerCoordinate> or GPUOrigin2DDict) GPUOrigin2D;

dictionary GPUOrigin3DDict {
	GPUIntegerCoordinate x = 0;
	GPUIntegerCoordinate y = 0;
	GPUIntegerCoordinate z = 0;
};
typedef (sequence<GPUIntegerCoordinate> or GPUOrigin3DDict) GPUOrigin3D;

dictionary GPUExtent3DDict {
	required GPUIntegerCoordinate width;
	GPUIntegerCoordinate height = 1;
	GPUIntegerCoordinate depthOrArrayLayers = 1;
};
typedef (sequence<GPUIntegerCoordinate> or GPUExtent3DDict) GPUExtent3D;
`

await Deno.writeTextFile(new URL("./tree.json", import.meta.url), JSON.stringify(parseIDL(idl), null, "\t"))
