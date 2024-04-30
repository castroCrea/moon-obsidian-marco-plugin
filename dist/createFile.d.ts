import { type File } from './types';
export declare const mergeIfFileExist: (filePath: string, content: string) => void;
export declare const createDirectory: (dirPath: string) => void;
export declare const createFiles: ({ files, vaultPath }: {
    files: File[];
    vaultPath: string;
}) => boolean;
