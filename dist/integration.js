"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doIntegration = void 0;
const extractTitleFromMarkdown_1 = require("./extractTitleFromMarkdown");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const extractText_1 = require("./extractText");
// Function to search into the object using a string path
const searchObject = ({ obj, path }) => {
    const keys = path.split('.'); // Split the path string into an array of keys
    let current = obj;
    for (const key of keys) {
        if (key in current) {
            current = current[key];
        }
        else {
            return undefined;
        } // Key doesn't exist in the object
    }
    return current; // Return the value found at the end of the path
};
const turnKeyIntoContent = ({ content, searchObj }) => {
    const regex = /\$\{((.)*?)\}/gm;
    const matches = content === null || content === void 0 ? void 0 : content.match(regex);
    // console.log({ matches })
    matches === null || matches === void 0 ? void 0 : matches.forEach(value => {
        const key = (value.replace('${', '').replace('}', '')).toLowerCase();
        const keyValue = searchObject({ obj: searchObj, path: key });
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
        const keyValue = searchObject({ obj: searchObj, path: key });
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
    const noteTemplate = (0, extractText_1.extractTextFromAnchor)({ text: defaultTemplate, startAnchor: '${START_NOTE}', endAnchor: '${END_NOTE}' });
    const peopleTemplate = (0, extractText_1.extractTextFromAnchor)({ text: defaultTemplate, startAnchor: '${START_PERSON}', endAnchor: '${END_PERSON}' });
    const sourceTemplate = (0, extractText_1.extractTextFromAnchor)({ text: defaultTemplate, startAnchor: '${START_SOURCE}', endAnchor: '${END_SOURCE}' });
    const journalTemplate = (0, extractText_1.extractTextFromAnchor)({ text: defaultTemplate, startAnchor: '${START_JOURNAL}', endAnchor: '${END_JOURNAL}' });
    const title = (0, extractTitleFromMarkdown_1.extractTitleFromMarkdown)(markdown);
    const content = markdown;
    const searchObj = Object.assign(Object.assign({}, context), { title,
        content });
    getPath({ noteContent: noteTemplate !== null && noteTemplate !== void 0 ? noteTemplate : '', log, searchObj });
    const array = [noteTemplate,
        peopleTemplate,
        sourceTemplate,
        journalTemplate
    ];
    const ifArray = array.map(noteContent => {
        return handleConditions({ content: noteContent, searchObj });
    });
    log === null || log === void 0 ? void 0 : log(JSON.stringify(ifArray).replaceAll('${', '\\\$\\\{').replaceAll('}', '\\\}').replaceAll(')', '\\\)'));
    // CONTENT
    const finalArray = ifArray.map(noteContent => {
        return turnKeyIntoContent({ content: noteContent, searchObj });
    });
    log === null || log === void 0 ? void 0 : log('----');
    log === null || log === void 0 ? void 0 : log(JSON.stringify(finalArray).replaceAll('${', '\\\$\\\{').replaceAll('}', '\\\}').replaceAll(')', '\\\)'));
    return true;
};
exports.doIntegration = doIntegration;
//# sourceMappingURL=integration.js.map