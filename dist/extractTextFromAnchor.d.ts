type StartEndAnchor = {
    startAnchor: '${START_NOTE}';
    endAnchor: '${END_NOTE}';
} | {
    startAnchor: '${START_PERSON}';
    endAnchor: '${END_PERSON}';
} | {
    startAnchor: '${START_JOURNAL}';
    endAnchor: '${END_JOURNAL}';
} | {
    startAnchor: '${START_SOURCE}';
    endAnchor: '${END_SOURCE}';
};
export declare const extractTextFromAnchor: ({ text, startAnchor, endAnchor }: {
    text: string;
} & StartEndAnchor) => string | undefined;
export {};
