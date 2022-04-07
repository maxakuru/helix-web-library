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

Can be added to a helix project either with npm or by downloading the directly from the releases on github

### Github Release
Download the non minified or minified version from the [releases page](https://github.com/dylandepass/helix-web-library/releases).

### NPM
```bash
$ npm install @dylandepass/helix-web-library
```

## Usage

Two scripts are offered `helix-web-core` and `helix-web-framework`.

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
