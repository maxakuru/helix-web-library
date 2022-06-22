# Helix Web Library

> Set of reusable classes and functions for rendering Helix pages

## Status
[![codecov](https://img.shields.io/codecov/c/github/dylandepass/helix-web-library.svg)](https://codecov.io/gh/dylandepass/helix-web-library)
[![CircleCI](https://img.shields.io/circleci/project/github/dylandepass/helix-web-library.svg)](https://circleci.com/gh/dylandepass/helix-web-library)
[![GitHub license](https://img.shields.io/github/license/dylandepass/helix-web-library.svg)](https://github.com/dylandepass/helix-web-library/blob/master/LICENSE.txt)
[![GitHub issues](https://img.shields.io/github/issues/dylandepass/helix-web-library.svg)](https://github.com/dylandepass/helix-web-library/issues)
[![LGTM Code Quality Grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/dylandepass/helix-web-library.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/dylandepass/helix-web-library)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Installation

Can be added to a helix project either with by downloading the bundles directly from the releases page on github, using a cloud bundler like skypack or using npm (requires a build step).

### NPM
```bash
$ npm install @dylandepass/helix-web-library
```

After installing, the library bundle can be added to `scripts/` using the CLI:
```bash
$ npx helix-web-library install
```

> For more updating, removing, and options, see [CLI](#cli)


### Github Release
Download the required bundles from the [releases page](https://github.com/dylandepass/helix-web-library/releases).

### Skypack Release
[Helix Web Framework ESM](https://cdn.skypack.dev/@dylandepass/helix-web-library@latest/dist/helix-web-library.esm.js)

[Helix Web Framework ESM (Minified)](https://cdn.skypack.dev/@dylandepass/helix-web-library@latest/dist/helix-web-library.esm.min.js)

[Helix Web Forms ESM](https://cdn.skypack.dev/@dylandepass/helix-web-library@latest/dist/helix-web-forms.esm.js)

[Helix Web Forms ESM (Minified)](https://cdn.skypack.dev/@dylandepass/helix-web-library@latest/dist/helix-web-forms.esm.min.js)

## What's included?

The two scripts included are `helix-web-framework` and `helix-web-forms`.

### helix-web-framework
Includes a helper class that abstracts the decoration and loading of a helix page. This class provides various hooks and overrides for customizating the helix decoration and loading process.

#### Usage

```js

import { HelixApp } from 'https://cdn.skypack.dev/@dylandepass/helix-web-library@latest/dist/helix-web-library.esm.min.js';

HelixApp.init({
  rumEnabled: true,
  rumGeneration: 'project-1',
  productionDomains: ['acme.com'],
  lcpBlocks: ['hero'],
})
  .withLoadEager(loadEager)
  .withBuildAutoBlocks((main) => {
    try {
      buildHeroBlock(main);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Auto Blocking failed', error);
    }
  })
  .decorate();
```

##### Builder Options
Builder configuration options 

| Name        | Description                                             | Example                        | Default           |
|-------------|---------------------------------------------------------|--------------------------------|-------------------|
| rumEnabled       | Enable RUM collection?   | true                   | false                       |
| rumGeneration       | RUM generation id   |  'project-1'                  | undefined                       |
| productionDomains       | A list of productions domains, used when `makeLinksRelative` is true.  | ['acme.com']                   | []                       |
| lcpBlocks       | List of blocks classes to treat as LCP   | ['hero']                   | []                       |
| autoAppear       | Should we set the appear class on the body after LCP load? If false then client must add the appear class (`document.querySelector('body').classList.add('appear');`)   | true                   | true                       |
| blocksSelector       | The CSS selector used to query blocks   | ':scope > div > div'                   | 'div.section > div > div'                       |
| makeLinksRelative       | Should anchor tag links be made relative?   | true                   | true                       |
| lazyStyles       | Should lazy styles be loaded (`/styles/lazy-styles.css`)   | true                    | false                       |

#### Lifecycle hooks
These lifecycle hooks can be used to tie custom logic into the page loading flow.

| Hooks        | Description                                                                                                 | 
|-------------|-------------------------------------------------------------------------------------------------------------|
| `withLoadEager` | Called just after main is decorated and LCP is loaded |
| `withPostDecorateBlockHook` | Called after block decoration and before waitForLCP. |
| `withLoadLazy` | Called just after all blocks have been loaded (js/css) |
| `withLoadDelayed` | Called after the page load lifecycle has completed |

#### Decoration/Loading overrides
If you need to customize the page decoration the following overrides are available.

| Hooks        | Description                                                                                                 | 
|-------------|-------------------------------------------------------------------------------------------------------------|
| `withBuildAutoBlocks` | Add any logic required to build auto blocks here |
| `withDecorateSections` | Overrides the default decorate sections logic |
| `withDecorateBlock` | Overrides the default decorate block logic |
| `withLoadHeader` | Overrides the default load header logic |
| `withLoadFooter` | Overrides the default load footer logic |
| `withDecorateIcons` | Overrides the default decorate icons logic |
| `withDecorateButtons` | Overrides the default decorate buttons logic |

For example, if you want a different decoration for your buttons you can use `withDecorateButtons` to override the default behaviour.

```js
import { HelixApp } from 'https://cdn.skypack.dev/@dylandepass/helix-web-library@latest/dist/helix-web-library.esm.min.js';

HelixApp.init({
  ...
})
  ...
  .withDecorateButtons((main) => {
    // custom button decoration code
  })
  .decorate();
```


See the [API documentation](docs/API.md).

### helix-web-forms

> This is a pre-alpha and and mainly just an experiment.. Not meant for production use

Creates an HTML form based on a form definiton defined in a sheet. The form definition should be contained in the `helix-default` sheet. No assumptions are made on the styling of the form as is left up to the developer to style the form markup.

```js
import { createForm } from 'helix-web-framework.esm.min.js';

export default async function decorate(block) {
  const form = block.querySelector('a[href$=".json"]');
  if (form) {
    form.replaceWith(await createForm(form.href));
  }
}
```

#### Supported form field definitions

| Name        | Description                                                                                                 | Example                                                                                     |
|-------------|-------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| Field       | The name of the field, will be set in the class name.                                                       | customerName                                                                                |
| Label       | The field label                                                                                             | Customer Name                                                                               |
| Placeholder | Placeholder text for the field                                                                              | Acme corp                                                                                   |
| Type        | The field type. Currently supports `text-field`, `heading`, `select`, `text-area`                           | text-area                                                                                   |
| Format      | The [input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types) of the field. | password                                                                                    |
| Mandatory   | Is this a required field?                                                                                   | x                                                                                           |
| Options     | If field type is `select`, options are set here                                                             | Don't know, Yes, No                                                                         |
| Rules       | Basic rules enginem, currently only supports `visible`                                                      | `{"type": "visible", "condition": {"key": "cms", "operator": "eq",  "value": "AEM Sites"}}` |
| Extra       | Redirect path after submission                                                                              | `/thank-you`                                                                                |

## CLI

### Examples

Update/reinstall (overwrites existing file):
```bash
$ npx helix-web-library install --force
```

Remove without installing:
```bash
$ npx helix-web-library uninstall
```

Install to a different path (must be inside current working directory):
```bash
$ npx helix-web-library install --dir=./libs
```

### Install Options
| Option | Shorthand | Description | Default |
| ------ | --------- | ----------- | ------- |
| `--dir` | `-d` | Install directory | `-d=./scripts` |
| `--force` | `-f` | Force overwrite existing, upgrade by deleting existing library at path. | |
| `--minify` | `-m` | Install minified library | |


## Development

New release are built automatically with every commit to main.

### Build

```bash
$ npm install
```

### Test

```bash
$ npm test
```

### Lint

```bash
$ npm run lint
```
