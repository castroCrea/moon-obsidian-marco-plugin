import { type Context } from '@moonjot/moon';
export declare const doIntegration: ({ markdown, pathToTemplates, log, context }: {
    markdown: string;
    pathToTemplates?: string | undefined;
    log: ((log: string) => void) | undefined;
    context: Context;
}) => boolean;
