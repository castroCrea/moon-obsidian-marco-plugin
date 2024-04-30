import { type Context, MoonPlugin, type MoonPluginConstructorProps, type MoonPluginSettings, type PluginSettingsDescription } from '@moonjot/moon';
interface SamplePluginSettingsDescription extends PluginSettingsDescription {
    vaultPath: {
        type: 'path';
        required: boolean;
        label: string;
        description: string;
    };
    pathToTemplate: {
        type: 'file';
        required: boolean;
        label: string;
        description: string;
    };
}
interface SamplePluginSettings extends MoonPluginSettings {
    pathToTemplate: string;
}
export default class extends MoonPlugin {
    name: string;
    logo: string;
    settingsDescription: SamplePluginSettingsDescription;
    settings: SamplePluginSettings;
    log: ((log: string) => void) | undefined;
    constructor(props?: MoonPluginConstructorProps<SamplePluginSettings>);
    integration: {
        callback: ({ markdown, context }: {
            html: string;
            markdown: string;
            context: Context;
        }) => Promise<boolean>;
        buttonIconUrl: string;
    };
}
export {};
