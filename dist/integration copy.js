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
const searchObject_1 = require("./searchObject");
const turnKeyIntoContent = ({ content, searchObj }) => {
    const regex = /\$\{((.)*?)\}/gm;
    const matches = content === null || content === void 0 ? void 0 : content.match(regex);
    // console.log({ matches })
    matches === null || matches === void 0 ? void 0 : matches.forEach(value => {
        const key = (value.replace('${', '').replace('}', '')).toLowerCase();
        const keyValue = (0, searchObject_1.searchObject)({ obj: searchObj, path: key });
        const stringKeyValue = !keyValue ? undefined : typeof keyValue === 'string' ? keyValue : JSON.stringify(keyValue);
        console.log({
            key,
            keyValue
        });
        if (!stringKeyValue) {
            content = content === null || content === void 0 ? void 0 : content.replace(value, '');
            return;
        }
        content = content === null || content === void 0 ? void 0 : content.replace(value, stringKeyValue);
    });
    return content;
};
const handleConditions = ({ content, searchObj }) => {
    const regexIf = /\$\{IF.*?\}(.*)\$\{END_IF.*?\}/gm;
    const regexIfStart = /\$\{IF ((.)*?)\}/gm;
    const regexIfEnd = /\$\{END_IF ((.)*?)\}/gm;
    const matches = content === null || content === void 0 ? void 0 : content.match(regexIf);
    console.log('ifArray', { matches });
    matches === null || matches === void 0 ? void 0 : matches.forEach(value => {
        var _a, _b, _c;
        const ifValue = (_a = value.match(regexIfStart)) === null || _a === void 0 ? void 0 : _a[0];
        if (!ifValue)
            return;
        const key = (ifValue.replace('${IF ', '').replace('}', '')).toLowerCase();
        const keyValue = (0, searchObject_1.searchObject)({ obj: searchObj, path: key });
        console.log({ ifValue, key, keyValue });
        if (!keyValue) {
            content = content === null || content === void 0 ? void 0 : content.replace(value, '');
        }
        else {
            let valueReplaced = value;
            const endIfValue = (_b = value.match(regexIfEnd)) === null || _b === void 0 ? void 0 : _b[0];
            if (ifValue)
                valueReplaced = valueReplaced === null || valueReplaced === void 0 ? void 0 : valueReplaced.replace(ifValue, '');
            if (endIfValue)
                valueReplaced = valueReplaced === null || valueReplaced === void 0 ? void 0 : valueReplaced.replace(endIfValue, '');
            valueReplaced = (_c = turnKeyIntoContent({ content: valueReplaced, searchObj })) !== null && _c !== void 0 ? _c : '';
            content = content === null || content === void 0 ? void 0 : content.replace(value, valueReplaced);
        }
    });
    return content;
};
const getPath = ({ noteContent, log, searchObj }) => {
    var _a;
    const pathContent = (_a = (noteContent.split('${END_PATH}')[0].split('${PATH}')[1])) === null || _a === void 0 ? void 0 : _a.trim();
    const lines = pathContent.split('\n');
    let notePath;
    for (const line of lines) {
        notePath = handleConditions({ content: line !== null && line !== void 0 ? line : '', searchObj });
        if (notePath)
            break;
    }
    return undefined;
};
const doIntegration = ({ markdown, pathToTemplates, log, context }) => {
    if (!pathToTemplates)
        return false;
    const defaultTemplate = fs_1.default.readFileSync(path_1.default.join(pathToTemplates, 'default.md'), 'utf8');
    const allNotes = (0, extractText_1.extractAllNotes)({ text: defaultTemplate, startAnchor: '${START_NOTE}', endAnchor: '${END_NOTE}' });
    const allNotesWithPath = allNotes.map(noteContent => ({
        noteContent,
        path: getPath({ noteContent: noteContent !== null && noteContent !== void 0 ? noteContent : '', log, searchObj })
    })).filter(n => !!n.path);
    const title = (0, extractTitleFromMarkdown_1.extractTitleFromMarkdown)(markdown);
    const content = markdown;
    const searchObj = Object.assign(Object.assign({}, context), { title,
        content });
    const ifArray = allNotesWithPath.map((_a) => {
        var { noteContent } = _a, props = __rest(_a, ["noteContent"]);
        return (Object.assign(Object.assign({}, props), { noteContent: handleConditions({ content: noteContent, searchObj }) }));
    });
    log === null || log === void 0 ? void 0 : log(JSON.stringify(ifArray).replaceAll('${', '\\\$\\\{').replaceAll('}', '\\\}').replaceAll(')', '\\\)'));
    // CONTENT
    const finalArray = ifArray.map((_a) => {
        var { noteContent } = _a, props = __rest(_a, ["noteContent"]);
        return (Object.assign(Object.assign({}, props), { noteContent: turnKeyIntoContent({ content: noteContent, searchObj }) }));
    });
    log === null || log === void 0 ? void 0 : log('----');
    log === null || log === void 0 ? void 0 : log(JSON.stringify(finalArray).replaceAll('${', '\\\$\\\{').replaceAll('}', '\\\}').replaceAll(')', '\\\)'));
    return true;
};
exports.doIntegration = doIntegration;
//# sourceMappingURL=integration%20copy.js.map