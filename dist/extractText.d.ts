interface StartEndAnchor {
    startAnchor: '${START_NOTE}';
    endAnchor: '${END_NOTE}';
}
export declare const extractAllNotes: ({ text, startAnchor, endAnchor }: {
    text: string;
} & StartEndAnchor) => (string | undefined)[];
export {};
