/* eslint-disable no-template-curly-in-string */
import { type Context } from '@moonjot/moon'
import { extractTitleFromMarkdown } from './extractTitleFromMarkdown'
import fs from 'fs'
import path from 'path'

/**
 * TODO
 * HANDLE IF
 * get PATH
 */

type StartEndAnchor = {
  startAnchor: '${START_NOTE}'
  endAnchor: '${END_NOTE}'
} | {
  startAnchor: '${START_PERSON}'
  endAnchor: '${END_PERSON}'
} | {
  startAnchor: '${START_JOURNAL}'
  endAnchor: '${END_JOURNAL}'
} | {
  startAnchor: '${START_SOURCE}'
  endAnchor: '${END_SOURCE}'
}

const extractTextFromAnchor = ({
  text,
  startAnchor,
  endAnchor
}: { text: string } & StartEndAnchor): string | undefined => {
  return (text.split(endAnchor)[0].split(startAnchor)[1])?.trim() // faster than the regex x10
}

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

const turnKeyIntoContent = ({ content, searchObj }: { content?: string, searchObj: object }) => {
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

export const doIntegration = ({ markdown, pathToTemplates, log, context }: { markdown: string, pathToTemplates?: string, log: ((log: string) => void) | undefined, context: Context }) => {
  if (!pathToTemplates) return false
  const defaultTemplate = fs.readFileSync(path.join(pathToTemplates, 'default.md'), 'utf8')

  const noteTemplate = extractTextFromAnchor({ text: defaultTemplate, startAnchor: '${START_NOTE}', endAnchor: '${END_NOTE}' })
  const peopleTemplate = extractTextFromAnchor({ text: defaultTemplate, startAnchor: '${START_PERSON}', endAnchor: '${END_PERSON}' })
  const sourceTemplate = extractTextFromAnchor({ text: defaultTemplate, startAnchor: '${START_SOURCE}', endAnchor: '${END_SOURCE}' })
  const journalTemplate = extractTextFromAnchor({ text: defaultTemplate, startAnchor: '${START_JOURNAL}', endAnchor: '${END_JOURNAL}' })

  const title = extractTitleFromMarkdown(markdown)
  const content = markdown

  const searchObj = {
    ...context,
    title,
    content
  }

  const regexIf = /\$\{IF.*?\}(.*)\$\{END_IF.*?\}/gm
  const regexIfStart = /\$\{IF ((.)*?)\}/gm
  const regexIfEnd = /\$\{END_IF ((.)*?)\}/gm

  const array = [noteTemplate,
    peopleTemplate,
    sourceTemplate,
    journalTemplate
  ]

  const ifArray = array.map(noteContent => {
    const matches = noteContent?.match(regexIf)
    console.log('ifArray', { matches })

    matches?.forEach(value => {
      const ifValue = value.match(regexIfStart)?.[0]
      if (!ifValue) return
      const key = (ifValue.replace('${IF ', '').replace('}', '')).toLowerCase()

      const keyValue = searchObject({ obj: searchObj, path: key })
      console.log({ ifValue, key, keyValue })

      if (!keyValue) {
        noteContent = noteContent?.replace(value, '')
      } else {
        let valueReplaced = value
        const endIfValue = value.match(regexIfEnd)?.[0]
        if (ifValue) valueReplaced = valueReplaced?.replace(ifValue, '')
        if (endIfValue) valueReplaced = valueReplaced?.replace(endIfValue, '')
        valueReplaced = turnKeyIntoContent({ content: valueReplaced, searchObj }) ?? ''
        noteContent = noteContent?.replace(value, valueReplaced)
      }
    })

    return noteContent
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
