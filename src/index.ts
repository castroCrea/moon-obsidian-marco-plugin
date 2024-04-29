import { type Context, MoonPlugin, type MoonPluginConstructorProps, type MoonPluginSettings, type PluginSettingsDescription } from '@moonjot/moon'
import { doIntegration } from './integration'

interface SamplePluginSettingsDescription extends PluginSettingsDescription {
  pathToTemplates: {
    type: 'path'
    required: boolean
    label: string
    description: string
  }
}

interface SamplePluginSettings extends MoonPluginSettings {
  pathToTemplates: string
}

export default class extends MoonPlugin {
  name: string = 'Obsidian Marco'
  logo: string = 'https://www.mindstoneconsulting.net/content/images/size/w300/2024/04/Logo-500x500-1.png'

  settingsDescription: SamplePluginSettingsDescription = {
    pathToTemplates: {
      type: 'path',
      required: true,
      label: 'Path to templates',
      description: 'Path to all your templates'
    }
  }

  settings: SamplePluginSettings = {
    pathToTemplates: ''
  }

  log: ((log: string) => void) | undefined

  constructor (props?: MoonPluginConstructorProps<SamplePluginSettings>) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    super(props)
    if (!props) return
    if (props.settings) this.settings = props.settings
    this.log = props.helpers.moonLog
  }

  integration = {
    callback: async ({ markdown, context }: {
      html: string
      markdown: string
      context: Context
    }
    ) => {
      return doIntegration({ markdown, pathToTemplates: this.settings.pathToTemplates, log: this.log, context })
    },
    buttonIconUrl: 'https://www.mindstoneconsulting.net/content/images/size/w300/2024/04/Logo-500x500-1.png'
  }
}
