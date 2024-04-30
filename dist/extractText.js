"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractAllNotes = exports.extractTextFromAnchor = void 0;
const extractTextFromAnchor = ({ text, startAnchor, endAnchor }) => {
    var _a;
    return (_a = (text.split(endAnchor)[0].split(startAnchor)[1])) === null || _a === void 0 ? void 0 : _a.trim(); // faster than the regex x10
};
exports.extractTextFromAnchor = extractTextFromAnchor;
const extractAllNotes = ({ text, startAnchor, endAnchor }) => {
    const allBlocksSplitByEndAnchor = text.split(endAnchor);
    const keepBlocksWithTheStartAnchor = allBlocksSplitByEndAnchor.filter(text => text.includes(startAnchor));
    return keepBlocksWithTheStartAnchor.map(text => text.split(startAnchor)[1].trim());
};
exports.extractAllNotes = extractAllNotes;
//# sourceMappingURL=extractText.js.map