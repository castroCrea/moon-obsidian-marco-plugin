import { type Context, MoonPlugin, type MoonPluginConstructorProps, type MoonPluginSettings, type PluginSettingsDescription, type EndpointCallbackItem } from '@moonjot/moon'
import { doIntegration } from './integration'
import path from 'path'
import { createDirectory, createFiles } from './createFile'
import { DEFAULT_TEMPLATE } from './template'

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

const ENDPOINT = ({ vaultPath }: { vaultPath?: string }): EndpointCallbackItem => ({
  endpoint: 'moon-obsidian-marco-plugin/template',
  callback: ({ saveSettings, doNotification }) => {
    if (!vaultPath) {
      doNotification({ body: 'Please set up vault path first', width: 400 })
      return
    }
    const date = new Date()
    const year = date.getFullYear().toString()
    const month = `0${date.getMonth() + 1}`.slice(-2)
    const day = `0${date.getDate()}`.slice(-2)

    const name = `moon-jot-template-${year}-${month}-${day}`
    const templatePath = `/${name}.md`
    createFiles({
      files: [{
        content: DEFAULT_TEMPLATE,
        path: templatePath
      }],
      vaultPath
    })
    saveSettings({ key: 'pathToTemplate', value: path.join(vaultPath, templatePath) })
    doNotification({ body: 'Template as been created', width: 400, url: `obsidian://open?vault=${vaultPath.split('/').pop()}&file=${name}` })
  }
})

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
    this.settingsButtons = [{
      type: 'button',
      label: 'Import templates',
      description: 'Set the vault before importing the default templates.',
      callback: () => {
        window.open('moonjot://moon-obsidian-marco-plugin/template', '_blank')
      }
    },
    {
      type: 'button',
      label: 'Open the template documentation.',
      description: ' ',
      callback: () => {
        window.open('https://github.com/castroCrea/moon-obsidian-marco-plugin', '_blank')
      }
    }]
    this.endpointCallbacks = [ENDPOINT({ vaultPath: props.settings?.vaultPath })]
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
