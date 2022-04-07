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

import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

// The banner to add to the top of each file
// Pulls details from the package.json file
const banner = `/*! ${pkg.name} v${pkg.version} | ${pkg.description} | Copyright ${new Date().getFullYear()} | ${pkg.license} license */`;

export default [{
  input: 'src/core.js',
  inlineDynamicImports: true,
  output: [
    {
      file: `dist/helix-web-core-${pkg.version}.esm.js`,
      format: 'es',
      sourcemap: false,
      banner,
      exports: 'auto',
    },
    {
      file: `dist/helix-web-core-${pkg.version}.esm.min.js`,
      format: 'es',
      sourcemap: false,
      banner,
      exports: 'auto',
      plugins: [terser({ format: { comments: false } })],
    },
  ],
},
{
  input: 'src/index.js',
  inlineDynamicImports: true,
  output: [
    {
      file: `dist/helix-web-framework-${pkg.version}.esm.js`,
      format: 'es',
      sourcemap: false,
      banner,
      exports: 'auto',
    },
    {
      file: `dist/helix-web-framework-${pkg.version}.esm.min.js`,
      format: 'es',
      sourcemap: false,
      banner,
      exports: 'auto',
      plugins: [terser({ format: { comments: false } })],
    },
  ],
}];
