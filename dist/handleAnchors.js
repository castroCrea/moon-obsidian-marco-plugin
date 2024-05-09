"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.turnDate = exports.getPath = exports.handleConditions = exports.handleReplacingProperties = void 0;
const searchObject_1 = require("./searchObject");
const extractText_1 = require("./extractText");
const handleReplacingProperties = ({ content, searchObj }) => {
    const regex = /{{((\S)*?)}}/gm;
    const matches = content === null || content === void 0 ? void 0 : content.match(regex);
    // console.log({ matches })
    matches === null || matches === void 0 ? void 0 : matches.forEach(value => {
        const key = (value.replace('{{', '').replace('}}', '')).toLowerCase();
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
const comparatorsSetUp = {
    '=== undefined': {
        callback: ({ key, searchObj }) => {
            const values = key.split('=== undefined').map(v => v.trim());
            const keyValues = (0, searchObject_1.searchObject)({ obj: searchObj, path: values[0].toLowerCase() });
            return keyValues === undefined ? true : undefined;
        }
    },
    '===': {
        callback: ({ key, searchObj }) => {
            const values = key.split('===').map(v => v.trim());
            const keyValues = values.map(value => { var _a; return (_a = (0, searchObject_1.searchObject)({ obj: searchObj, path: value.toLowerCase() })) !== null && _a !== void 0 ? _a : value; });
            return keyValues[0] === keyValues[1] ? keyValues[1] : undefined;
        }
    },
    '!==': {
        callback: ({ key, searchObj }) => {
            const values = key.split('!==').map(v => v.trim());
            const keyValues = values.map(value => { var _a; return (_a = (0, searchObject_1.searchObject)({ obj: searchObj, path: value.toLowerCase() })) !== null && _a !== void 0 ? _a : value; });
            return keyValues[0] !== keyValues[1] ? keyValues[1] : undefined;
        }
    },
    '.includes': {
        callback: ({ key, searchObj }) => {
            const values = key.split('.includes(').map(v => v.trim());
            const checkForMatchValue = values[1].slice(0, -1);
            const currentValue = (0, searchObject_1.searchObject)({ obj: searchObj, path: values[0].toLowerCase() });
            return (currentValue === null || currentValue === void 0 ? void 0 : currentValue.includes(checkForMatchValue)) ? checkForMatchValue : undefined;
        }
    }
};
const handleConditions = ({ content, searchObj }) => {
    var _a, _b;
    const regexIf = /{{IF([^{}]*)}}((?:(?!{{(?:IF|END_IF).*}})[\s\S])*){{END_IF[^{}]*}}/gm;
    // const regexIf = /{{IF.*?}}(?:[^{}])*?{{END_IF.*?}}/gm NOT WORKING BUT HERE FOR DOC
    // const regexIf =  /(\n{|{){IF.*?}}((?!{{).*){{END_IF.*?}(}|}\n)/gm  NOT WORKING BUT HERE FOR DOC
    // const regexIf = /(\n{|{){IF.*?}}((?!{{)(\s|\S)*){{END_IF.*?}(}|}\n)/gm NOT WORKING BUT HERE FOR DOC
    const regexIfStart = /{{IF (.*?)}}/gm;
    const regexIfEnd = /{{END_IF (.*?)}}/gm;
    content = (_a = (0, exports.handleReplacingProperties)({ content, searchObj })) !== null && _a !== void 0 ? _a : '';
    const matches = content === null || content === void 0 ? void 0 : content.match(regexIf);
    matches === null || matches === void 0 ? void 0 : matches.forEach(value => {
        var _a, _b, _c;
        const ifValue = (_a = value.match(regexIfStart)) === null || _a === void 0 ? void 0 : _a[0];
        if (!ifValue)
            return;
        const key = (ifValue.replace('{{IF ', '').replace('}}', '')).toLowerCase();
        const comparator = Object.keys(comparatorsSetUp).find(element => key.includes(element));
        const keyValue = comparator ? (_b = comparatorsSetUp[comparator]) === null || _b === void 0 ? void 0 : _b.callback({ key, searchObj }) : (0, searchObject_1.searchObject)({ obj: searchObj, path: key });
        if (!keyValue) {
            content = content === null || content === void 0 ? void 0 : content.replace(value, '').trim();
        }
        else {
            let valueReplaced = value;
            const endIfValue = (_c = value.match(regexIfEnd)) === null || _c === void 0 ? void 0 : _c[0];
            if (ifValue)
                valueReplaced = valueReplaced === null || valueReplaced === void 0 ? void 0 : valueReplaced.replace(ifValue, '').trim();
            if (endIfValue)
                valueReplaced = valueReplaced === null || valueReplaced === void 0 ? void 0 : valueReplaced.replace(endIfValue, '').trim();
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
    const pathContent = (_a = (content.split('{{END_PATH}}')[0].split('{{PATH}}')[1])) === null || _a === void 0 ? void 0 : _a.trim();
    if (!pathContent)
        return { path: undefined, content };
    const lines = pathContent.split('\n');
    let notePath;
    for (const line of lines) {
        notePath = (_b = (0, exports.handleConditions)({ content: line !== null && line !== void 0 ? line : '', searchObj })) === null || _b === void 0 ? void 0 : _b.trim().replaceAll('|', '');
        if (notePath)
            break;
    }
    const regexRemovePath = /{{PATH}}((.|\s)*?){{END_PATH}}/gm;
    const replacedContent = content.replaceAll(regexRemovePath, '');
    return { path: notePath === null || notePath === void 0 ? void 0 : notePath.trim(), content: replacedContent.trim() };
};
exports.getPath = getPath;
const turnDate = ({ content }) => {
    // eslint-disable-next-line no-template-curly-in-string
    const datesFormat = (0, extractText_1.extractContentBetweenAnchors)({ text: content, endAnchor: '{{END_DATE}}', startAnchor: '{{DATE}}' }).filter((date) => !!date);
    if (!datesFormat.length)
        return content;
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hour = `0${date.getHours()}`.slice(-2);
    const minute = `0${date.getMinutes()}`.slice(-2);
    const second = `0${date.getSeconds()}`.slice(-2);
    datesFormat.forEach((dateFormat) => {
        const dateFormatted = dateFormat.replaceAll('YYYY', year).replaceAll('MM', month).replaceAll('DD', day).replaceAll('HH', hour).replaceAll('mm', minute).replaceAll('ss', second);
        const regexRemoveDate = new RegExp(`{{DATE}}${dateFormat}{{END_DATE}}`, 'gm');
        content = content.replace(regexRemoveDate, dateFormatted);
    });
    return content;
};
exports.turnDate = turnDate;
//# sourceMappingURL=handleAnchors.js.map