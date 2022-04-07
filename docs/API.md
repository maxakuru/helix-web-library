## Functions

<dl>
<dt><a href="#sampleRUM">sampleRUM(checkpoint, data)</a></dt>
<dd><p>log RUM if part of the sample.</p>
</dd>
<dt><a href="#loadCSS">loadCSS(href)</a></dt>
<dd><p>Loads a CSS file.</p>
</dd>
<dt><a href="#getMetadata">getMetadata(name)</a> ⇒ <code>string</code></dt>
<dd><p>Retrieves the content of a metadata tag.</p>
</dd>
<dt><a href="#addPublishDependencies">addPublishDependencies(url)</a></dt>
<dd><p>Adds one or more URLs to the dependencies for publishing.</p>
</dd>
<dt><a href="#toClassName">toClassName(name)</a> ⇒ <code>string</code></dt>
<dd><p>Sanitizes a name for use as class name.</p>
</dd>
<dt><a href="#wrapSections">wrapSections($sections)</a></dt>
<dd><p>Wraps each section in an additional {@code div}.</p>
</dd>
<dt><a href="#decorateBlock">decorateBlock(block)</a></dt>
<dd><p>Decorates a block.</p>
</dd>
<dt><a href="#decorateSections">decorateSections($main)</a></dt>
<dd><p>Decorates all sections in a container element.</p>
</dd>
<dt><a href="#updateSectionsStatus">updateSectionsStatus($main)</a></dt>
<dd><p>Updates all section status in a container element.</p>
</dd>
<dt><a href="#decorateBlocks">decorateBlocks($main)</a></dt>
<dd><p>Decorates all blocks in a container element.</p>
</dd>
<dt><a href="#buildBlock">buildBlock(blockName, content)</a></dt>
<dd><p>Builds a block DOM Element from a two dimensional array</p>
</dd>
<dt><a href="#loadBlock">loadBlock($block)</a></dt>
<dd><p>Loads JS and CSS for a block.</p>
</dd>
<dt><a href="#loadBlocks">loadBlocks($main)</a></dt>
<dd><p>Loads JS and CSS for all blocks in a container element.</p>
</dd>
<dt><a href="#readBlockConfig">readBlockConfig($block)</a> ⇒ <code>object</code></dt>
<dd><p>Extracts the config from a block.</p>
</dd>
<dt><a href="#createOptimizedPicture">createOptimizedPicture(src, eager, breakpoints)</a></dt>
<dd><p>Returns a picture element with webp and fallbacks</p>
</dd>
<dt><a href="#removeStylingFromImages">removeStylingFromImages(main)</a></dt>
<dd><p>Removes formatting from images.</p>
</dd>
<dt><a href="#makeLinksRelative">makeLinksRelative(main)</a></dt>
<dd><p>Turns absolute links within the domain into relative links.</p>
</dd>
<dt><a href="#normalizeHeadings">normalizeHeadings($elem, allowedHeadings)</a></dt>
<dd><p>Normalizes all headings within a container element.</p>
</dd>
<dt><a href="#decoratePictures">decoratePictures(main)</a></dt>
<dd><p>Decorates the picture elements.</p>
</dd>
<dt><a href="#addFavIcon">addFavIcon(href)</a></dt>
<dd><p>Adds the favicon.</p>
</dd>
<dt><a href="#loadScript">loadScript(url, callback, type)</a> ⇒ <code>Element</code></dt>
<dd><p>loads a script by adding a script tag to the head.</p>
</dd>
<dt><a href="#loadHeader">loadHeader(header)</a></dt>
<dd><p>Loads the header block.</p>
</dd>
<dt><a href="#loadFooter">loadFooter(footer)</a></dt>
<dd><p>Loads the footer block.</p>
</dd>
<dt><a href="#initHlx">initHlx()</a></dt>
<dd><p>Initializes helix</p>
</dd>
<dt><a href="#waitForLCP">waitForLCP()</a></dt>
<dd><p>load LCP block and/or wait for LCP in default content.</p>
</dd>
</dl>

<a name="sampleRUM"></a>

## sampleRUM(checkpoint, data)
log RUM if part of the sample.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| checkpoint | <code>string</code> | identifies the checkpoint in funnel |
| data | <code>Object</code> | additional data for RUM sample |

<a name="loadCSS"></a>

## loadCSS(href)
Loads a CSS file.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| href | <code>string</code> | The path to the CSS file |

<a name="getMetadata"></a>

## getMetadata(name) ⇒ <code>string</code>
Retrieves the content of a metadata tag.

**Kind**: global function  
**Returns**: <code>string</code> - The metadata value  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The metadata name (or property) |

<a name="addPublishDependencies"></a>

## addPublishDependencies(url)
Adds one or more URLs to the dependencies for publishing.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> \| <code>Array.&lt;string&gt;</code> | The URL(s) to add as dependencies |

<a name="toClassName"></a>

## toClassName(name) ⇒ <code>string</code>
Sanitizes a name for use as class name.

**Kind**: global function  
**Returns**: <code>string</code> - The class name  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>\*</code> | The unsanitized name |

<a name="wrapSections"></a>

## wrapSections($sections)
Wraps each section in an additional {@code div}.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| $sections | <code>Array.&lt;Element&gt;</code> | The sections |

<a name="decorateBlock"></a>

## decorateBlock(block)
Decorates a block.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>Element</code> | The block element |

<a name="decorateSections"></a>

## decorateSections($main)
Decorates all sections in a container element.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| $main | <code>Element</code> | The container element |

<a name="updateSectionsStatus"></a>

## updateSectionsStatus($main)
Updates all section status in a container element.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| $main | <code>Element</code> | The container element |

<a name="decorateBlocks"></a>

## decorateBlocks($main)
Decorates all blocks in a container element.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| $main | <code>Element</code> | The container element |

<a name="buildBlock"></a>

## buildBlock(blockName, content)
Builds a block DOM Element from a two dimensional array

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| blockName | <code>string</code> | name of the block |
| content | <code>any</code> | two dimensional array or string or object of content |

<a name="loadBlock"></a>

## loadBlock($block)
Loads JS and CSS for a block.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| $block | <code>Element</code> | The block element |

<a name="loadBlocks"></a>

## loadBlocks($main)
Loads JS and CSS for all blocks in a container element.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| $main | <code>Element</code> | The container element |

<a name="readBlockConfig"></a>

## readBlockConfig($block) ⇒ <code>object</code>
Extracts the config from a block.

**Kind**: global function  
**Returns**: <code>object</code> - The block config  

| Param | Type | Description |
| --- | --- | --- |
| $block | <code>Element</code> | The block element |

<a name="createOptimizedPicture"></a>

## createOptimizedPicture(src, eager, breakpoints)
Returns a picture element with webp and fallbacks

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| src | <code>string</code> | The image URL |
| eager | <code>boolean</code> | load image eager |
| breakpoints | <code>Array</code> | breakpoints and corresponding params (eg. width) |

<a name="removeStylingFromImages"></a>

## removeStylingFromImages(main)
Removes formatting from images.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| main | <code>Element</code> | The container element |

<a name="makeLinksRelative"></a>

## makeLinksRelative(main)
Turns absolute links within the domain into relative links.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| main | <code>Element</code> | The container element |

<a name="normalizeHeadings"></a>

## normalizeHeadings($elem, allowedHeadings)
Normalizes all headings within a container element.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| $elem | <code>Element</code> | The container element |
| allowedHeadings | <code>Array.&lt;string&gt;</code> | The list of allowed headings (h1 ... h6) |

<a name="decoratePictures"></a>

## decoratePictures(main)
Decorates the picture elements.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| main | <code>Element</code> | The container element |

<a name="addFavIcon"></a>

## addFavIcon(href)
Adds the favicon.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| href | <code>string</code> | The favicon URL |

<a name="loadScript"></a>

## loadScript(url, callback, type) ⇒ <code>Element</code>
loads a script by adding a script tag to the head.

**Kind**: global function  
**Returns**: <code>Element</code> - script element  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | URL of the js file |
| callback | <code>function</code> | callback on load |
| type | <code>string</code> | type attribute of script tag |

<a name="loadHeader"></a>

## loadHeader(header)
Loads the header block.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| header | <code>Element</code> | The header element |

<a name="loadFooter"></a>

## loadFooter(footer)
Loads the footer block.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| footer | <code>Element</code> | The footer element |

<a name="initHlx"></a>

## initHlx()
Initializes helix

**Kind**: global function  
<a name="waitForLCP"></a>

## waitForLCP()
load LCP block and/or wait for LCP in default content.

**Kind**: global function  
