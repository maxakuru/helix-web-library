/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { install } from './install.js';

const cmds = {
  install,
};

const aliases = {
  uninstall: {
    cmd: 'install',
    opts: {
      remove: true,
    },
  },
};

const shortcuts = {
  '-f': '--force',
  '-d': '--dir',
  '-m': '--minify',
};

(async () => {
  const args = process.argv.slice(2);

  let cmd = args.shift();
  let opts = {};

  if (aliases[cmd]) {
    ({ cmd, opts } = aliases[cmd]);
  }

  for (let arg of args) {
    if (shortcuts[arg]) {
      arg = shortcuts[arg];
    }

    if (!arg.startsWith('--')) {
      throw Error(`Invalid flag: ${arg}`);
    }

    const spl = arg.split('=');
    if (spl.length > 1) {
      const key = spl.shift().substring(2);
      opts[key] = spl.join('=');
    } else {
      opts[arg.substring(2)] = true;
    }
  }

  if (cmds[cmd]) {
    cmds[cmd](opts);
  } else {
    console.error(`Unknown command: ${cmd}`);
    process.exit(1);
  }
})();
