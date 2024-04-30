"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractAllNotes = void 0;
const extractAllNotes = ({ text, startAnchor, endAnchor }) => {
    const allBlocksSplitByEndAnchor = text.split(endAnchor);
    const keepBlocksWithTheStartAnchor = allBlocksSplitByEndAnchor.filter(text => text.includes(startAnchor));
    return keepBlocksWithTheStartAnchor.map(text => { var _a; return (_a = text.split(startAnchor).pop()) === null || _a === void 0 ? void 0 : _a.trim(); });
};
exports.extractAllNotes = extractAllNotes;
//# sourceMappingURL=extractText.js.map