import { type Context } from '@moonjot/moon';
import { type LOG, type File } from './types';
export declare const doIntegration: ({ markdown, pathToTemplate, log, context }: {
    markdown: string;
    pathToTemplate?: string | undefined;
    log: LOG;
    context: Context;
}) => File[];
