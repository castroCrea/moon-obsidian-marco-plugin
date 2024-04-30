/* eslint-disable no-template-curly-in-string */
import { type Context } from '@moonjot/moon'
import { extractTitleFromMarkdown } from './extractTitleFromMarkdown'
import fs from 'fs'
import path from 'path'
import { type SearchObject, type LOG } from './types'
import { extractTextFromAnchor } from './extractText'

type Indexable = Record<string, any>

// Function to search into the object using a string path
const searchObject = ({
  obj,
  path
}: { obj: object, path: string }) => {
  const keys = path.split('.') // Split the path string into an array of keys
  let current: Indexable = obj

  for (const key of keys) {
    if (key in current) {
      current = current[key]
    } else { return undefined } // Key doesn't exist in the object
  }

  return current // Return the value found at the end of the path
}

const turnKeyIntoContent = ({ content, searchObj }: { content?: string, searchObj: SearchObject }) => {
  const regex = /\$\{((.)*?)\}/gm

  const matches = content?.match(regex)
  // console.log({ matches })

  matches?.forEach(value => {
    const key = (value.replace('${', '').replace('}', '')).toLowerCase()
    const keyValue = searchObject({ obj: searchObj, path: key })
    const stringKeyValue = !keyValue ? undefined : typeof keyValue === 'string' ? keyValue : JSON.stringify(keyValue)
    console.log({
      key,
      keyValue
    })
    if (!stringKeyValue) {
      content = content?.replace(value, '')
      return
    }
    content = content?.replace(value, stringKeyValue)
  })

  return content
}

const handleConditions = ({ content, searchObj }: { content?: string, searchObj: SearchObject }) => {
  const regexIf = /\$\{IF.*?\}(.*)\$\{END_IF.*?\}/gm
  const regexIfStart = /\$\{IF ((.)*?)\}/gm
  const regexIfEnd = /\$\{END_IF ((.)*?)\}/gm
  const matches = content?.match(regexIf)
  console.log('ifArray', { matches })

  matches?.forEach(value => {
    const ifValue = value.match(regexIfStart)?.[0]
    if (!ifValue) return
    const key = (ifValue.replace('${IF ', '').replace('}', '')).toLowerCase()

    const keyValue = searchObject({ obj: searchObj, path: key })
    console.log({ ifValue, key, keyValue })

    if (!keyValue) {
      content = content?.replace(value, '')
    } else {
      let valueReplaced = value
      const endIfValue = value.match(regexIfEnd)?.[0]
      if (ifValue) valueReplaced = valueReplaced?.replace(ifValue, '')
      if (endIfValue) valueReplaced = valueReplaced?.replace(endIfValue, '')
      valueReplaced = turnKeyIntoContent({ content: valueReplaced, searchObj }) ?? ''
      content = content?.replace(value, valueReplaced)
    }
  })

  return content
}

const getPath = ({ noteContent, log, searchObj }: { noteContent: string, log: LOG, searchObj: SearchObject }) => {
  const pathContent = (noteContent.split('${END_PATH}')[0].split('${PATH}')[1])?.trim()

  const lines = pathContent.split('\n')

  let notePath: string | undefined

  for (const line of lines) {
    notePath = handleConditions({ content: line ?? '', searchObj })
    if (notePath) break
  }

  return undefined
}

export const doIntegration = ({ markdown, pathToTemplates, log, context }: { markdown: string, pathToTemplates?: string, log: LOG, context: Context }) => {
  if (!pathToTemplates) return false
  const defaultTemplate = fs.readFileSync(path.join(pathToTemplates, 'default.md'), 'utf8')

  const noteTemplate = extractTextFromAnchor({ text: defaultTemplate, startAnchor: '${START_NOTE}', endAnchor: '${END_NOTE}' })

  const peopleTemplate = extractTextFromAnchor({ text: defaultTemplate, startAnchor: '${START_PERSON}', endAnchor: '${END_PERSON}' })
  const sourceTemplate = extractTextFromAnchor({ text: defaultTemplate, startAnchor: '${START_SOURCE}', endAnchor: '${END_SOURCE}' })
  const journalTemplate = extractTextFromAnchor({ text: defaultTemplate, startAnchor: '${START_JOURNAL}', endAnchor: '${END_JOURNAL}' })

  const title = extractTitleFromMarkdown(markdown)
  const content = markdown

  const searchObj: SearchObject = {
    ...context,
    title,
    content
  }
  getPath({ noteContent: noteTemplate ?? '', log, searchObj })

  const array = [noteTemplate,
    peopleTemplate,
    sourceTemplate,
    journalTemplate
  ]

  const ifArray = array.map(noteContent => {
    return handleConditions({ content: noteContent, searchObj })
  })

  log?.(JSON.stringify(ifArray).replaceAll('${', '\\\$\\\{').replaceAll('}', '\\\}').replaceAll(')', '\\\)'))

  // CONTENT
  const finalArray = ifArray.map(noteContent => {
    return turnKeyIntoContent({ content: noteContent, searchObj })
  })

  log?.('----')
  log?.(JSON.stringify(finalArray).replaceAll('${', '\\\$\\\{').replaceAll('}', '\\\}').replaceAll(')', '\\\)'))

  return true
}
