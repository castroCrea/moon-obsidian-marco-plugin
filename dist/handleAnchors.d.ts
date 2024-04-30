import { type SearchObject, type LOG } from './types';
export declare const handleReplacingProperties: ({ content, searchObj }: {
    content?: string | undefined;
    searchObj: SearchObject;
}) => string | undefined;
export declare const handleConditions: ({ content, searchObj }: {
    content?: string | undefined;
    searchObj: SearchObject;
}) => string | undefined;
export declare const getPath: ({ content, searchObj }: {
    content: string;
    log: LOG;
    searchObj: SearchObject;
}) => {
    path: string | undefined;
    content: string;
};
export declare const turnDate: ({ content }: {
    content: string;
}) => string;
