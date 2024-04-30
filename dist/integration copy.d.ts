import { type Context } from '@moonjot/moon';
import { type LOG } from './types';
export declare const doIntegration: ({ markdown, pathToTemplates, log, context }: {
    markdown: string;
    pathToTemplates?: string | undefined;
    log: LOG;
    context: Context;
}) => boolean;
