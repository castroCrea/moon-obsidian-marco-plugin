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
const template_1 = require("./template");
const ENDPOINT = ({ vaultPath }) => ({
    endpoint: 'moon-obsidian-marco-plugin/template',
    callback: ({ saveSettings, doNotification }) => {
        if (!vaultPath) {
            doNotification({ body: 'Please set up vault path first', width: 400 });
            return;
        }
        const date = new Date();
        const year = date.getFullYear().toString();
        const month = `0${date.getMonth() + 1}`.slice(-2);
        const day = `0${date.getDate()}`.slice(-2);
        const name = `moon-jot-template-${year}-${month}-${day}`;
        const templatePath = `/${name}.md`;
        (0, createFile_1.createFiles)({
            files: [{
                    content: template_1.DEFAULT_TEMPLATE,
                    path: templatePath
                }],
            vaultPath
        });
        saveSettings({ key: 'pathToTemplate', value: path_1.default.join(vaultPath, templatePath) });
        doNotification({ body: 'Template as been created', width: 400, url: `obsidian://open?vault=${vaultPath.split('/').pop()}&file=${name}` });
    }
});
class default_1 extends moon_1.MoonPlugin {
    constructor(props) {
        var _a, _b, _c;
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
                var _d, _e;
                try {
                    if (!this.settings.vaultPath) {
                        (_d = this.log) === null || _d === void 0 ? void 0 : _d.call(this, 'Error: Is vault path not defined');
                        return false;
                    }
                    const files = (0, integration_1.doIntegration)({ markdown, pathToTemplate: this.settings.pathToTemplate, log: this.log, context });
                    const defaultPath = path_1.default.join(this.settings.vaultPath);
                    (0, createFile_1.createDirectory)(defaultPath);
                    return (0, createFile_1.createFiles)({ files, vaultPath: this.settings.vaultPath });
                }
                catch (err) {
                    (_e = this.log) === null || _e === void 0 ? void 0 : _e.call(this, `Error: ${this.name} => ${err.message}`);
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
        (_b = (_a = props.helpers).moonLog) === null || _b === void 0 ? void 0 : _b.call(_a, `THIS IS THE LOG ${JSON.stringify(props.settings)}`);
        this.settingsButtons = [{
                type: 'button',
                label: 'Import templates',
                description: 'Set vault before importing templates',
                callback: () => {
                    window.open('moonjot://moon-obsidian-marco-plugin/template', '_blank');
                }
            }];
        this.endpointCallbacks = [ENDPOINT({ vaultPath: (_c = props.settings) === null || _c === void 0 ? void 0 : _c.vaultPath })];
    }
}
exports.default = default_1;
//# sourceMappingURL=index.js.map