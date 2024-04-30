type StartEndAnchor = {
    startAnchor: '${START_NOTE}';
    endAnchor: '${END_NOTE}';
} | {
    startAnchor: '${DATE}';
    endAnchor: '${END_DATE}';
};
export declare const extractAllNotes: ({ text, startAnchor, endAnchor }: {
    text: string;
} & StartEndAnchor) => (string | undefined)[];
export {};
