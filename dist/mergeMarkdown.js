"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeMarkdownFiles = void 0;
const js_yaml_1 = __importDefault(require("js-yaml"));
const removeMDPropertiesFromContent = (content) => content.split('---').slice(2).join('---');
const mergeMarkdownFiles = (originalContent, newContent) => {
    var _a, _b, _c, _d;
    if (originalContent === newContent)
        return originalContent;
    // Parse the YAML front matter from both contents
    const frontMatter1 = (_b = (_a = originalContent.split('---')[1]) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : '';
    const frontMatter2 = (_d = (_c = newContent.split('---')[1]) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : '';
    // Convert YAML front matter to objects
    const data1 = (js_yaml_1.default.load(frontMatter1) || {});
    const data2 = (js_yaml_1.default.load(frontMatter2) || {});
    // Merge the front matter data while avoiding duplication
    const mergedData = Object.assign(Object.assign({}, (data1 || {})), (data2 || {}));
    for (const topic in data1) {
        if (Array.isArray(mergedData[topic])) {
            mergedData[topic] = [
                ...new Set([...(data1[topic] || []), ...(data2[topic] || [])])
            ];
        }
        else {
            mergedData[topic] = data2[topic] || data1[topic];
        }
    }
    // Serialize the merged front matter back to YAML
    const mergedPropsMD = js_yaml_1.default.dump(mergedData);
    const mergedFrontMatter = Object.keys(mergedData).length > 0 && mergedPropsMD !== '{}' ? '---\n' + mergedPropsMD + '---' : '';
    // remove props if exist in the content
    const originalContentText = Object.keys(data1).length > 0 ? removeMDPropertiesFromContent(originalContent).trim() : originalContent.trim();
    const newContentText = Object.keys(data2).length > 0 ? removeMDPropertiesFromContent(newContent).trim() : newContent.trim();
    const originalContentTextStartWithTitle = originalContentText.startsWith('##');
    const newContentStartWithTitle = newContentText.startsWith('##');
    const originalContentGroupeByTitle = originalContentText.trim().split(/^##\s/gm).map((section, index) => {
        if (!!section && (index > 0 || originalContentTextStartWithTitle))
            section = `## ${section}`;
        return section.split('\n');
    });
    const newContentGroupeByTitle = newContentText.trim().split(/^##\s/gm).map((section, index) => {
        if (!!section && (index > 0 || newContentStartWithTitle))
            section = `## ${section}`;
        return section.split('\n');
    });
    let finalContent = `${mergedFrontMatter}\n`;
    for (let i = 0; i < originalContentGroupeByTitle.length; i++) {
        const title = originalContentGroupeByTitle[i][0];
        finalContent += `${originalContentGroupeByTitle[i].join('\n')}`;
        const thereIsGroupWithSameTitleIndex = newContentGroupeByTitle.findIndex(section => section[0] === title);
        if (thereIsGroupWithSameTitleIndex > -1) {
            const blockContentThatMatch = newContentGroupeByTitle[thereIsGroupWithSameTitleIndex];
            blockContentThatMatch.shift();
            const shouldAddContent = blockContentThatMatch.filter(b => !!b).length > 0;
            if (!shouldAddContent)
                continue;
            finalContent += `${blockContentThatMatch.join('\n')}`;
            newContentGroupeByTitle.splice(thereIsGroupWithSameTitleIndex, 1);
        }
    }
    // Concatenate the merged front matter with the content
    return `${finalContent}\n${newContentGroupeByTitle.filter(b => !!b).map(section => section.join('\n')).join('\n')}`;
};
exports.mergeMarkdownFiles = mergeMarkdownFiles;
//# sourceMappingURL=mergeMarkdown.js.map