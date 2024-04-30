type Indexable = Record<string, any>;
export declare const searchObject: ({ obj, path }: {
    obj: object;
    path: string;
}) => Indexable | undefined;
export {};
