/**
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { defaultOptions } from './meta.js';
import { initEmscriptenModule } from './utils.js';
import { threads } from 'wasm-feature-detect';
let emscriptenModule;
const isRunningInNode = () => typeof process !== 'undefined' &&
    process.release &&
    process.release.name === 'node';
const isRunningInCloudflareWorker = () => { var _a; return ((_a = globalThis.caches) === null || _a === void 0 ? void 0 : _a.default) !== undefined; };
export async function init(module, moduleOptionOverrides) {
    if (!isRunningInNode() &&
        !isRunningInCloudflareWorker() &&
        (await threads())) {
        const avifEncoder = await import('./codec/enc/avif_enc_mt.js');
        emscriptenModule = initEmscriptenModule(avifEncoder.default, module, moduleOptionOverrides);
        return emscriptenModule;
    }
    const avifEncoder = await import('./codec/enc/avif_enc.js');
    emscriptenModule = initEmscriptenModule(avifEncoder.default, module, moduleOptionOverrides);
    return emscriptenModule;
}
export default async function encode(data, options = {}) {
    if (!emscriptenModule)
        emscriptenModule = init();
    const module = await emscriptenModule;
    const _options = { ...defaultOptions, ...options };
    const output = module.encode(data.data, data.width, data.height, _options);
    if (!output) {
        throw new Error('Encoding error.');
    }
    return output.buffer;
}
