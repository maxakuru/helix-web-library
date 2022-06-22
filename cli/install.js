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

import { stat, rm, copyFile } from 'fs/promises';
import crypto from 'crypto';

import path from 'path';
import { createReadStream } from 'fs';
import { fileURLToPath } from 'url';

async function getInstallDir(dir) {
  const cwd = process.cwd();
  const installDir = path.resolve(cwd, dir);

  // Cannot install outside of cwd
  if (!installDir.startsWith(cwd)) {
    throw Error(`Invalid install directory path: ${installDir}`);
  }

  // Must exist, must be directory
  try {
    const s = await stat(installDir);
    if (!s.isDirectory()) {
      throw Error(`Invalid install location, must be directory: ${installDir}`);
    }
  } catch (e) {
    if (e.code === 'ENOENT') {
      throw Error(`Invalid install location, missing directory: ${installDir}`);
    }
    throw e;
  }

  return installDir;
}

function fileHash(filePath, algo = 'sha1') {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash(algo);
    const file = createReadStream(filePath);

    hash.setEncoding('hex');

    file.on('end', () => {
      hash.end();
      resolve(hash.read());
    });

    file.on('error', reject);
    file.pipe(hash);
  });
}

/**
 * Install library, optionally overwriting/removing existing file at path.
 *
 * @example
 * npx helix-web-library install [--dir=./some/path] [--force] [--minify]
 *
 * @example
 * npx helix-web-library uninstall
 */
export const install = async ({
  dir = './scripts',
  force = false,
  minify = false,
  remove = false,
} = {}) => {
  const installDir = await getInstallDir(dir);
  const libFileName = `helix-web-library.esm${minify ? '.min' : ''}.js`;
  const installPath = path.resolve(installDir, `./${libFileName}`);
  const libPath = fileURLToPath(new URL(`../dist/${libFileName}`, import.meta.url));

  console.info(`Installing Helix Web Library ${minify ? '(minified) ' : ''}to path: ${installPath}`);

  let exists = false;
  let existingHash;
  try {
    const existing = await stat(installPath);
    if (!existing.isFile()) {
      throw Error('Invalid item already exists at path, not a file.');
    } else {
      exists = true;
      if (!remove) {
        existingHash = await fileHash(installPath);
      }
    }
  } catch (e) {
    if (e.code !== 'ENOENT') {
      throw e;
    }
  }

  if (exists) {
    if (!force && !remove) {
      const hash = await fileHash(libPath);
      if (hash === existingHash) {
        console.info('Library already exists with same hash. Exiting.');
        return;
      }
      throw Error('Item already exists. Use flag \'--force\' to overwrite.');
    }

    console.info('Removing existing library.');
    await rm(installPath);
  }

  if (!remove) {
    console.info('Installing library.');
    await copyFile(libPath, installPath);
  }

  console.info('Done ✨');
};
