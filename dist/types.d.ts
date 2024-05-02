import { type Context } from '@moonjot/moon';
export type LOG = ((log: string) => void) | undefined;
export type SearchObject = Context & {
    title?: string;
    task?: string;
    content?: string;
};
type Path = string;
export interface File {
    content: string;
    path: Path;
}
export {};
