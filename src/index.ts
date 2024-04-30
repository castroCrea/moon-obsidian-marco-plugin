import { type Context, MoonPlugin, type MoonPluginConstructorProps, type MoonPluginSettings, type PluginSettingsDescription } from '@moonjot/moon'
import { doIntegration } from './integration'
import path from 'path'
import { createDirectory, createFiles } from './createFile'

interface SamplePluginSettingsDescription extends PluginSettingsDescription {
  vaultPath: {
    type: 'path'
    required: boolean
    label: string
    description: string
  }
  pathToTemplate: {
    type: 'file'
    required: boolean
    label: string
    description: string
  }
}

interface SamplePluginSettings extends MoonPluginSettings {
  pathToTemplate: string
}

export default class extends MoonPlugin {
  name: string = 'Obsidian Marco'
  logo: string = 'https://www.mindstoneconsulting.net/content/images/size/w300/2024/04/Logo-500x500-1.png'

  settingsDescription: SamplePluginSettingsDescription = {
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
  }

  settings: SamplePluginSettings = {
    vaultPath: '',
    pathToTemplate: ''
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
      try {
        if (!this.settings.vaultPath) {
          this.log?.('Error: Is vault path not defined')
          return false
        }
        const files = doIntegration({ markdown, pathToTemplate: this.settings.pathToTemplate, log: this.log, context })

        const defaultPath = path.join(this.settings.vaultPath)
        createDirectory(defaultPath)

        return createFiles({ files, vaultPath: this.settings.vaultPath })
      } catch (err: any) {
        this.log?.(`Error: ${this.name} => ${err.message}`)
        return false
      }
    },
    buttonIconUrl: 'https://www.mindstoneconsulting.net/content/images/size/w300/2024/04/Logo-500x500-1.png'
  }
}
