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
Object.defineProperty(exports, "__esModule", { value: true });
const moon_1 = require("@moonjot/moon");
const integration_1 = require("./integration");
class default_1 extends moon_1.MoonPlugin {
    constructor(props) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        super(props);
        this.name = 'Obsidian Marco';
        this.logo = 'https://www.mindstoneconsulting.net/content/images/size/w300/2024/04/Logo-500x500-1.png';
        this.settingsDescription = {
            pathToTemplates: {
                type: 'path',
                required: true,
                label: 'Path to templates',
                description: 'Path to all your templates'
            }
        };
        this.settings = {
            pathToTemplates: ''
        };
        this.integration = {
            callback: ({ markdown, context }) => __awaiter(this, void 0, void 0, function* () {
                return (0, integration_1.doIntegration)({ markdown, pathToTemplates: this.settings.pathToTemplates, log: this.log, context });
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