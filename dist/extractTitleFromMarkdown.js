"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTaskFromMarkdown = exports.extractTitleFromMarkdown = void 0;
const extractTitleFromMarkdown = (markdown) => {
    const lines = markdown.trim().split('\n');
    const firstLine = lines[0].trim();
    if (firstLine.startsWith('# '))
        return firstLine.substring(1).trim();
    return undefined;
};
exports.extractTitleFromMarkdown = extractTitleFromMarkdown;
const extractTaskFromMarkdown = (markdown) => {
    const lines = markdown.trim().split('\n');
    const firstLine = lines[0].trim();
    if (firstLine.startsWith('- [ ]'))
        return firstLine;
    return undefined;
};
exports.extractTaskFromMarkdown = extractTaskFromMarkdown;
//# sourceMappingURL=extractTitleFromMarkdown.js.map