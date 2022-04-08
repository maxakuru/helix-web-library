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

Can be added to a helix project either with npm or by downloading the bundles directly from the releases page on github

### Github Release
Download the required bundles from the [releases page](https://github.com/dylandepass/helix-web-library/releases).

### NPM
```bash
$ npm install @dylandepass/helix-web-library
```

## Usage

The three scripts are offered `helix-web-core`, `helix-web-framework` and `helix-web-forms`.

### helix-web-core
Includes [functions](docs/API.md) that can be used to aid in the decoration and loading of a helix page.

### helix-web-framework
Includes the functions from `helix-web-core` along with a `HelixApp` class that abstracts the decoration and loading of a helix page. This class provides extension points for customization during the decoration process.

```js
import { HelixApp } from './helix-web-framework.es.min.js';

export class App extends HelixApp {
  constructor(config) {
    super(config);
  }

  /**
   * loads everything that doesn't need to be delayed.
   */
  async loadLazy(doc) {
    super.loadLazy();
    // Custom loadLazy logic
  }


  /**
   * load everything needed to get to LCP.
   */
  async loadEager() {
    super.loadDelayed();
    // Custom loadEager logic
  }

  /**
   * load everything that happens a lot later, without impacting
   * the user experience.
   */
  loadDelayed() {
    super.loadDelayed();
    // Custom loadDelayed logic
  }

  /**
   * Builds all synthetic blocks in a container element.
   * @param {Element} main The container element
   */
  buildAutoBlocks(main) { 
    // Build synthetic blocks based on page template or path
  }
}

/**
 * Decorate Page
 */
new App({
  rumGeneration: 'design-website-1',
  productionDomains: ['adobe.design'],
  lcpBlocks: ['hero', 'carousel'],
});
```

See the [API documentation](docs/API.md).

### helix-web-forms
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



## Development

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
