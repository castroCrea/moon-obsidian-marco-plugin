"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFiles = exports.createDirectory = exports.mergeIfFileExist = void 0;
const mergeMarkdown_1 = require("./mergeMarkdown");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mergeIfFileExist = (filePath, content) => {
    if (fs_1.default.existsSync(filePath)) {
        // File exists, merge the content
        const existingContent = fs_1.default.readFileSync(filePath, 'utf8');
        const mergedContent = (0, mergeMarkdown_1.mergeMarkdownFiles)(existingContent, content);
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