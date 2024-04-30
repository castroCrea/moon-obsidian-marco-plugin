"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extractText_1 = require("../extractText");
describe('extractAllNotes', () => {
    it('extractAllNotes', () => {
        const text = '${START_NOTE}1. This is the text ${SOURCE.TEXT}${END_NOTE} some content after${START_NOTE}2. This is the text ${SOURCE.TEXT}${END_NOTE} some content after';
        const result = (0, extractText_1.extractAllNotes)({ text, startAnchor: '${START_NOTE}', endAnchor: '${END_NOTE}' });
        expect(result).toEqual(['1. This is the text ${SOURCE.TEXT}', '2. This is the text ${SOURCE.TEXT}']);
    });
});
//# sourceMappingURL=extractText.test%20copy.js.map