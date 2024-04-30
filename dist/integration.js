"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doIntegration = void 0;
const extractTitleFromMarkdown_1 = require("./extractTitleFromMarkdown");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const extractText_1 = require("./extractText");
const handleAnchors_1 = require("./handleAnchors");
const doIntegration = ({ markdown, pathToTemplates, log, context }) => {
    if (!pathToTemplates)
        return false;
    const defaultTemplate = fs_1.default.readFileSync(path_1.default.join(pathToTemplates, 'default.md'), 'utf8');
    // eslint-disable-next-line no-template-curly-in-string
    const allNotes = (0, extractText_1.extractAllNotes)({ text: defaultTemplate, startAnchor: '${START_NOTE}', endAnchor: '${END_NOTE}' });
    const allNotesWithPath = allNotes.map(noteContent => {
        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
        const notePath = (0, handleAnchors_1.getPath)({ content: noteContent !== null && noteContent !== void 0 ? noteContent : '', log, searchObj });
        return ({
            noteContent,
            path: notePath
        });
    }).filter(n => !!n.path);
    const title = (0, extractTitleFromMarkdown_1.extractTitleFromMarkdown)(markdown);
    const content = markdown;
    const searchObj = Object.assign(Object.assign({}, context), { title,
        content });
    // CONTENT
    const replaceAnchor = allNotesWithPath.map((_a) => {
        var { noteContent } = _a, props = __rest(_a, ["noteContent"]);
        return (Object.assign(Object.assign({}, props), { noteContent: (0, handleAnchors_1.handleReplacingProperties)({ content: noteContent, searchObj }) }));
    });
    log === null || log === void 0 ? void 0 : log(JSON.stringify(allNotesWithPath).replaceAll('${', '\\\$\\\{').replaceAll('}', '\\\}').replaceAll(')', '\\\)'));
    const finalArray = replaceAnchor.map((_a) => {
        var { noteContent } = _a, props = __rest(_a, ["noteContent"]);
        return (Object.assign(Object.assign({}, props), { noteContent: (0, handleAnchors_1.handleConditions)({ content: noteContent, searchObj }) }));
    });
    log === null || log === void 0 ? void 0 : log('----');
    log === null || log === void 0 ? void 0 : log(JSON.stringify(finalArray).replaceAll('${', '\\\$\\\{').replaceAll('}', '\\\}').replaceAll(')', '\\\)'));
    return true;
};
exports.doIntegration = doIntegration;
//# sourceMappingURL=integration.js.map