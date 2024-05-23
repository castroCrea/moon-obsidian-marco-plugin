"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFiles = exports.createDirectory = exports.mergeIfFileExist = exports.handleCanvas = void 0;
const moon_utils_1 = require("@moonjot/moon-utils");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function generateRandomId() {
    return Math.floor((1 + Math.random()) * 0x10000000000000000)
        .toString(16)
        .substring(1);
}
// 30px per lines
const handleCanvas = ({ filePath, content }) => {
    var _a, _b;
    const canvasContentString = fs_1.default.existsSync(filePath) ? fs_1.default.readFileSync(filePath, 'utf8') : '{}';
    const canvas = JSON.parse(canvasContentString);
    const height = content.split('\n').length * 30;
    const width = (((_a = content.split('\n').map(line => line.length).sort((a, b) => b - a)[0]) !== null && _a !== void 0 ? _a : 1) * 4) + 50;
    const y = (_b = canvas.nodes) === null || _b === void 0 ? void 0 : _b.filter((node) => node.x === 0).map(node => node.y + height).sort((a, b) => b - a)[0];
    const canvasContent = { id: generateRandomId(), type: 'text', text: content, x: 0, y: y ? y + 8 : 0, width: width !== null && width !== void 0 ? width : 250, height: height !== null && height !== void 0 ? height : 60 };
    canvas.nodes = [...canvas.nodes, canvasContent];
    fs_1.default.writeFileSync(filePath, JSON.stringify(canvas));
};
exports.handleCanvas = handleCanvas;
const mergeIfFileExist = (filePath, content) => {
    if (filePath.endsWith('.canvas')) {
        (0, exports.handleCanvas)({ filePath, content });
        return;
    }
    if (fs_1.default.existsSync(filePath)) {
        // File exists, merge the content
        const existingContent = fs_1.default.readFileSync(filePath, 'utf8');
        const mergedContent = (0, moon_utils_1.mergeMarkdownFiles)({ originalContent: existingContent, newContent: content });
        fs_1.default.writeFileSync(filePath, mergedContent);
    }
    else {
        // File doesn't exist, create it
        fs_1.default.writeFileSync(filePath, content);
    }
};
exports.mergeIfFileExist = mergeIfFileExist;
const createDirectory = (dirPath) => {
    if (!fs_1.default.existsSync(dirPath)) {
        fs_1.default.mkdirSync(dirPath, { recursive: true });
    }
};
exports.createDirectory = createDirectory;
const createFiles = ({ files, vaultPath }) => {
    files.forEach(({ content, path: absoluteFilePath }) => {
        const paths = absoluteFilePath.split('/');
        const fileName = paths.pop();
        const doc = paths.join('/');
        const fileDoc = path_1.default.join(vaultPath, doc);
        const filePath = path_1.default.join(fileDoc, `${fileName}`);
        (0, exports.createDirectory)(fileDoc);
        (0, exports.mergeIfFileExist)(filePath, content);
    });
    return true;
};
exports.createFiles = createFiles;
//# sourceMappingURL=createFile.js.map