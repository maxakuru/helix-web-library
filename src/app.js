/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/* eslint-disable class-methods-use-this, max-classes-per-file */

import {
  initHlx,
  waitForLCP,
  sampleRUM,
  loadHeader,
  loadFooter,
  loadBlocks,
  makeLinksRelative,
  loadCSS,
  addFavIcon,
  registerPerformanceLogger,
  decorateSections,
  decorateBlock,
  decorateButtons,
  decorateIcons,
  decoratePictures,
  decorateTemplateAndTheme,
  removeStylingFromImages,
} from './core.js';

const defaultConfig = {
  makeLinksRelative: true,
  lazyStyles: false,
  autoAppear: true,
};

/**
 * @typedef {object} AppConfig
 * @property {boolean} makeLinksRelative
 * @property {boolean} rumEnabled
 * @property {string} rumGeneration
 * @property {string} blocksSelector
 * @property {string[]} productionDomains
 * @property {string[]} lcpBlocks
 * @property {boolean} lazyStyles
 * @property {boolean} autoAppear
 */

export default class HelixApp {
  /** @param {AppConfig} config */
  constructor(config = defaultConfig) {
    this.config = config;
    initHlx();

    if (this.config.rumEnabled) {
      this.sampleRUM('top');
      window.addEventListener('load', () => sampleRUM('load'));
      document.addEventListener('click', () => sampleRUM('click'));
    }

    if (window.name.includes('performance')) {
      registerPerformanceLogger();
    }
  }

  static init(config) {
    return new HelixApp(config);
  }

  /**
   * Hook into the end of loadEager function.
   */
  withLoadEager(override) {
    this.loadEagerHook = override;
    return this;
  }

  /**
   * Hook into the end of loadLazy function.
   */
  withLoadLazy(override) {
    this.loadLazyHook = override;
    return this;
  }

  /**
   * Overrides the loadDelayed function.
   */
  withLoadDelayed(override) {
    this.loadDelayed = override;
    return this;
  }

  /**
   * Overrides the buildAutoBlocks function.
   */
  withBuildAutoBlocks(override) {
    this.buildAutoBlocks = override;
    return this;
  }

  /**
   * Overrides the loadHeader function.
   */
  withLoadHeader(override) {
    this.loadHeader = override;
    return this;
  }

  /**
   * Overrides the loadFooter function.
   */
  withLoadFooter(override) {
    this.loadFooter = override;
    return this;
  }

  /**
   * Overrides the decorateSections function.
   */
  withDecorateSections(override) {
    this.decorateSections = override;
    return this;
  }

  /**
   * Overrides the decorateSections function.
   */
  withDecorateBlock(override) {
    this.decorateBlock = override;
    return this;
  }

  /**
   * Overrides the decorateIcons function.
   */
  withDecorateIcons(override) {
    this.decorateIcons = override;
    return this;
  }

  /**
   * Overrides the decorateIcons function.
   */
  withDecorateButtons(override) {
    this.decorateButtons = override;
    return this;
  }

  /**
   * Hook direct after block decoration and before waitForLCP.
   */
  withPostDecorateBlockHook(hook) {
    this.postDecorateBlockHook = hook;
    return this;
  }

  /**
   * Decorate the page
   */
  async decorate() {
    await this.loadEager(document);
    await this.loadLazy(document);
    this.loadDelayed(document);
  }

  /**
   * Decorates all blocks in a container element.
   * @param {Element} main The container element
   * @preserve Exclude from terser
   */
  decorateBlocks(main) {
    main
      .querySelectorAll(this.config.blocksSelector ?? 'div.section > div > div')
      .forEach((block) => this.decorateBlock(block));
  }

  /**
   * Decorates the main element.
   * @param {Element} main The main element
   */
  decorateMain(main) {
    decoratePictures(main);
    removeStylingFromImages(main);
    if (this.config.makeLinksRelative ?? defaultConfig.makeLinksRelative) {
      makeLinksRelative(main, this.config.productionDomains);
    }
    this.decorateButtons(main);
    this.decorateIcons(main);
    this.buildAutoBlocks(main);
    this.decorateSections(main);
    this.decorateBlocks(main);
    if (this.postDecorateBlockHook) {
      this.postDecorateBlockHook(main);
    }
  }

  /**
   * log RUM if part of the sample.
   * @param {string} checkpoint identifies the checkpoint in funnel
   * @param {Object} data additional data for RUM sample
   * @preserve Exclude from terser
   */
  sampleRUM(event, data = {}) {
    sampleRUM(event, this.config.rumGeneration, data);
  }

  /**
   * loads everything needed to get to LCP.
   * Should be overridden by subclasses.
   */
  async loadEager(doc) {
    decorateTemplateAndTheme();
    const main = doc.querySelector('main');
    if (main) {
      this.decorateMain(main);
      await this.waitForLCP(this.config.lcpBlocks ?? []);
    }
    if (this.loadEagerHook) {
      await this.loadEagerHook(doc);
    }
  }

  /**
   * loads everything that doesn't need to be delayed.
   */
  async loadLazy(doc) {
    const main = doc.querySelector('main');
    await loadBlocks(main);

    const { hash } = window.location;
    if (hash) {
      try {
        const element = main.querySelector(hash);
        if (hash && element) element.scrollIntoView();
      } catch {
        /* do nothing */
      }
    }

    this.loadHeader(doc.querySelector('header'));
    this.loadFooter(doc.querySelector('footer'));

    if (this.config.lazyStyles ?? defaultConfig.lazyStyles) {
      loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
    }

    addFavIcon(`${window.hlx.codeBasePath}/styles/icon.svg`);
    if (this.loadLazyHook) {
      this.loadLazyHook(doc);
    }
  }

  /**
   * loads everything that happens a lot later, without impacting
   * the user experience.
   */
  loadDelayed() { }

  /**
   * Builds all synthetic blocks in a container element.
   * @param {Element} main The container element
   */
  buildAutoBlocks() { }

  /**
   * Loads the header block.
   * @param {Element} header The header element
   */
  async loadHeader(header) {
    loadHeader(header, this.config.productionDomains);
  }

  /**
   * Loads the footer block.
   * @param {Element} footer The footer element
   */
  async loadFooter(footer) {
    loadFooter(footer, this.config.productionDomains);
  }

  /**
   * Decorates all sections in a container element.
   * @param {Element} main The container element
   * @preserve Exclude from terser
   */
  decorateSections(main) {
    decorateSections(main);
  }

  /**
   * Decorates a block.
   * @param {Element} block The block element
   * @preserve Exclude from terser
   */
  decorateBlock(main) {
    decorateBlock(main);
  }

  /**
   * Decorates all Icons.
   * @param {Element} block The block element
   * @preserve Exclude from terser
   */
  decorateIcons(main) {
    decorateIcons(main);
  }

  /**
   * Decorates paragraphs containing a single link as buttons.
   * @param {Element} block The block element
   * @preserve Exclude from terser
   */
  decorateButtons(main) {
    decorateButtons(main);
  }

  /**
   * load LCP block and/or wait for LCP in default content.
   * @preserve Exclude from terser
   */
  waitForLCP(lcpBlocks) {
    return waitForLCP(lcpBlocks, this.config.autoAppear ?? defaultConfig.autoAppear);
  }
}
