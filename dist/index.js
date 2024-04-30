"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moon_1 = require("@moonjot/moon");
const integration_1 = require("./integration");
const path_1 = __importDefault(require("path"));
const createFile_1 = require("./createFile");
class default_1 extends moon_1.MoonPlugin {
    constructor(props) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        super(props);
        this.name = 'Obsidian Marco';
        this.logo = 'https://www.mindstoneconsulting.net/content/images/size/w300/2024/04/Logo-500x500-1.png';
        this.settingsDescription = {
            vaultPath: {
                type: 'path',
                required: true,
                label: 'Path to vault',
                description: 'Path to vault'
            },
            pathToTemplate: {
                type: 'file',
                required: true,
                label: 'Path to templates',
                description: 'Path to all your templates'
            }
        };
        this.settings = {
            vaultPath: '',
            pathToTemplate: ''
        };
        this.integration = {
            callback: ({ markdown, context }) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                try {
                    if (!this.settings.vaultPath) {
                        (_a = this.log) === null || _a === void 0 ? void 0 : _a.call(this, 'Error: Is vault path not defined');
                        return false;
                    }
                    const files = (0, integration_1.doIntegration)({ markdown, pathToTemplate: this.settings.pathToTemplate, log: this.log, context });
                    const defaultPath = path_1.default.join(this.settings.vaultPath);
                    (0, createFile_1.createDirectory)(defaultPath);
                    return (0, createFile_1.createFiles)({ files, vaultPath: this.settings.vaultPath });
                }
                catch (err) {
                    (_b = this.log) === null || _b === void 0 ? void 0 : _b.call(this, `Error: ${this.name} => ${err.message}`);
                    return false;
                }
            }),
            buttonIconUrl: 'https://www.mindstoneconsulting.net/content/images/size/w300/2024/04/Logo-500x500-1.png'
        };
        if (!props)
            return;
        if (props.settings)
            this.settings = props.settings;
        this.log = props.helpers.moonLog;
    }
}
exports.default = default_1;
//# sourceMappingURL=index.js.map