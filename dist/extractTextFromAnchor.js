"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTextFromAnchor = void 0;
const extractTextFromAnchor = ({ text, startAnchor, endAnchor }) => {
    var _a;
    return (_a = (text.split(endAnchor)[0].split(startAnchor)[1])) === null || _a === void 0 ? void 0 : _a.trim(); // faster than the regex x10
};
exports.extractTextFromAnchor = extractTextFromAnchor;
//# sourceMappingURL=extractTextFromAnchor.js.map