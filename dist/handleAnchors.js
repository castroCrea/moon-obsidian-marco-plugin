"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.turnDate = exports.getPath = exports.handleConditions = exports.handleReplacingProperties = void 0;
const searchObject_1 = require("./searchObject");
const extractText_1 = require("./extractText");
const handleReplacingProperties = ({ content, searchObj }) => {
    const regex = /\$\{((\S)*?)\}/gm;
    const matches = content === null || content === void 0 ? void 0 : content.match(regex);
    // console.log({ matches })
    matches === null || matches === void 0 ? void 0 : matches.forEach(value => {
        const key = (value.replace('${', '').replace('}', '')).toLowerCase();
        const keyValue = (0, searchObject_1.searchObject)({ obj: searchObj, path: key });
        const stringKeyValue = !keyValue ? undefined : typeof keyValue === 'string' ? keyValue : JSON.stringify(keyValue);
        if (!stringKeyValue) {
            content = content === null || content === void 0 ? void 0 : content.replace(value, '');
            return;
        }
        content = content === null || content === void 0 ? void 0 : content.replace(value, stringKeyValue);
    });
    return content;
};
exports.handleReplacingProperties = handleReplacingProperties;
const handleConditions = ({ content, searchObj }) => {
    var _a, _b;
    const regexIf = /\$\{IF.*?\}(?:[^{}])*?\{END_IF.*?\}/gm;
    const regexIfStart = /\$\{IF (.*?)\}/gm;
    const regexIfEnd = /\$\{END_IF (.*?)\}/gm;
    const matches = content === null || content === void 0 ? void 0 : content.match(regexIf);
    content = (_a = (0, exports.handleReplacingProperties)({ content, searchObj })) !== null && _a !== void 0 ? _a : '';
    matches === null || matches === void 0 ? void 0 : matches.forEach(value => {
        var _a, _b;
        const ifValue = (_a = value.match(regexIfStart)) === null || _a === void 0 ? void 0 : _a[0];
        if (!ifValue)
            return;
        const key = (ifValue.replace('${IF ', '').replace('}', '')).toLowerCase();
        const keyValue = (0, searchObject_1.searchObject)({ obj: searchObj, path: key });
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
            content = content === null || content === void 0 ? void 0 : content.replace(value, valueReplaced);
        }
    });
    if (!((_b = content === null || content === void 0 ? void 0 : content.match(regexIf)) === null || _b === void 0 ? void 0 : _b.length)) {
        return content;
    }
    // Handle recursive
    return (0, exports.handleConditions)({ content, searchObj });
};
exports.handleConditions = handleConditions;
const getPath = ({ content, searchObj }) => {
    var _a, _b;
    // eslint-disable-next-line no-template-curly-in-string
    const pathContent = (_a = (content.split('${END_PATH}')[0].split('${PATH}')[1])) === null || _a === void 0 ? void 0 : _a.trim();
    if (!pathContent)
        return { path: undefined, content };
    const lines = pathContent.split('\n');
    let notePath;
    for (const line of lines) {
        notePath = (_b = (0, exports.handleConditions)({ content: line !== null && line !== void 0 ? line : '', searchObj })) === null || _b === void 0 ? void 0 : _b.trim();
        if (notePath)
            break;
    }
    const regexRemovePath = /\${PATH}((.|\s)*?)\${END_PATH}/gm;
    const regexRemovePathWithSpaceBefore = /(^\s+|\s+)\${PATH}((.|\s)*?)\${END_PATH}(^\s+|\s+)/gm;
    const replacedContent = content.replaceAll(regexRemovePathWithSpaceBefore, '').replaceAll(regexRemovePath, '');
    return { path: notePath === null || notePath === void 0 ? void 0 : notePath.trim(), content: replacedContent };
};
exports.getPath = getPath;
const turnDate = ({ content }) => {
    // eslint-disable-next-line no-template-curly-in-string
    const datesFormat = (0, extractText_1.extractAllNotes)({ text: content, endAnchor: '${END_DATE}', startAnchor: '${DATE}' }).filter((date) => !!date);
    if (!datesFormat.length)
        return content;
    const date = new Date();
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    datesFormat.forEach((dateFormat) => {
        const dateFormatted = dateFormat.replace('YYYY', `${year}`).replace('MM', `${month}`).replace('DD', `${day}`);
        const regexRemoveDate = new RegExp(`\\\${DATE}${dateFormat}\\\${END_DATE}`, 'gm');
        content = content.replace(regexRemoveDate, dateFormatted);
    });
    return content;
};
exports.turnDate = turnDate;
//# sourceMappingURL=handleAnchors.js.map