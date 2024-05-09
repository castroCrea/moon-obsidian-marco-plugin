type StartEndAnchor = {
    startAnchor: '{{START_NOTE}}';
    endAnchor: '{{END_NOTE}}';
} | {
    startAnchor: '{{DATE}}';
    endAnchor: '{{END_DATE}}';
};
export declare const extractContentBetweenAnchors: ({ text, startAnchor, endAnchor }: {
    text: string;
} & StartEndAnchor) => (string | undefined)[];
export {};
