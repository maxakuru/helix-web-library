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

const banner = `/* eslint-disable */
/*
 * @license
 * Copyright ${new Date().getFullYear()} Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */`;

const bundles = [
  {
    source: 'src/index.js',
    outputFile: 'helix-web-library',
  },
  {
    source: 'src/components/form/index.js',
    outputFile: 'helix-web-forms',
  },
];

function stripComments(node, comment) {
  const { type, value } = comment;
  if (type === 'comment2') {
    return value === ' eslint-disable ' || /@license/i.test(value);
  }
  return false;
}

export default (ctx) => bundles.map((bundle) => ({
  input: bundle.source,
  inlineDynamicImports: true,
  output: [
    {
      file: `dist/${bundle.outputFile}.esm.js`,
      format: 'es',
      sourcemap: false,
      exports: 'auto',
    },
    {
      file: `dist/${bundle.outputFile}.esm.min.js`,
      format: 'es',
      sourcemap: false,
      exports: 'auto',
      plugins: [
        terser({
          format: {
            comments: ctx.environment !== 'NODE_ENV:production' || stripComments,
          },
        }),
      ],
      banner,
    },
  ],
}));
