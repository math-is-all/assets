import type { WorkerResizeOptions } from './meta.js';
import type { InitInput as InitResizeInput } from './lib/resize/pkg/squoosh_resize.js';
import type { InitInput as InitHqxInput } from './lib/hqx/pkg/squooshhqx.js';
export declare function initResize(moduleOrPath?: InitResizeInput): Promise<unknown>;
export declare function initHqx(moduleOrPath?: InitHqxInput): Promise<unknown>;
export default function resize(data: ImageData, overrideOptions: Partial<WorkerResizeOptions> & {
    width: number;
    height: number;
}): Promise<ImageData>;
//# sourceMappingURL=index.d.ts.map