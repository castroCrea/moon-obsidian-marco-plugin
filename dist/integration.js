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
exports.handleAnchorsFlow = exports.doIntegration = void 0;
const moon_utils_1 = require("@moonjot/moon-utils");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const doIntegration = ({ markdown, pathToTemplate, log, context }) => {
    if (!pathToTemplate)
        return [];
    const defaultTemplate = fs_1.default.readFileSync(path_1.default.join(pathToTemplate), 'utf8');
    return (0, exports.handleAnchorsFlow)({ markdown, template: defaultTemplate !== null && defaultTemplate !== void 0 ? defaultTemplate : '', log, context });
};
exports.doIntegration = doIntegration;
const handleAnchorsFlow = ({ markdown, template, log, context }) => {
    const handleDateContent = (0, moon_utils_1.turnDate)({ content: template });
    // eslint-disable-next-line no-template-curly-in-string
    const allNotes = (0, moon_utils_1.extractContentBetweenAnchors)({ text: handleDateContent, startAnchor: '{{START_NOTE}}', endAnchor: '{{END_NOTE}}' }).filter((note) => !!note);
    const title = (0, moon_utils_1.extractTitleFromMarkdown)(markdown);
    const task = (0, moon_utils_1.extractTaskFromMarkdown)(markdown);
    const content = markdown;
    const searchObj = Object.assign(Object.assign({}, context), { title,
        content,
        task });
    const allNotesWithPath = allNotes.map(content => (0, moon_utils_1.getPath)({ content, log, searchObj })).filter((n) => !!n.path);
    // CONTENT
    const replaceAnchor = allNotesWithPath.map((_a) => {
        var _b;
        var { content } = _a, props = __rest(_a, ["content"]);
        return (Object.assign(Object.assign({}, props), { content: (_b = (0, moon_utils_1.handleReplacingProperties)({ content, searchObj })) !== null && _b !== void 0 ? _b : '' }));
    });
    // log?.(JSON.stringify(allNotesWithPath))
    // CONDITION
    const finalArray = replaceAnchor.map((_a) => {
        var _b, _c;
        var { content } = _a, props = __rest(_a, ["content"]);
        return (Object.assign(Object.assign({}, props), { content: (_c = (_b = (0, moon_utils_1.handleConditions)({ content, searchObj })) === null || _b === void 0 ? void 0 : _b.trim()) !== null && _c !== void 0 ? _c : '' }));
    });
    // log?.('----')
    // log?.(JSON.stringify(finalArray))
    return finalArray;
};
exports.handleAnchorsFlow = handleAnchorsFlow;
//# sourceMappingURL=integration.js.map