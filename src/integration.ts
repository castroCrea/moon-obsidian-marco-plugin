/* eslint-disable no-useless-escape */
import { type Context } from '@moonjot/moon'
import { extractTitleFromMarkdown } from './extractTitleFromMarkdown'
import fs from 'fs'
import path from 'path'
import { type SearchObject, type LOG, type File } from './types'
import { extractAllNotes } from './extractText'
import { getPath, handleConditions, handleReplacingProperties } from './handleAnchors'

export const doIntegration = ({ markdown, pathToTemplate, log, context }: { markdown: string, pathToTemplate?: string, log: LOG, context: Context }): File[] => {
  if (!pathToTemplate) return []
  const defaultTemplate = fs.readFileSync(path.join(pathToTemplate), 'utf8')

  // eslint-disable-next-line no-template-curly-in-string
  const allNotes = extractAllNotes({ text: defaultTemplate, startAnchor: '${START_NOTE}', endAnchor: '${END_NOTE}' }).filter((note): note is string => !!note)

  const title = extractTitleFromMarkdown(markdown)
  const content = markdown

  const searchObj: SearchObject = {
    ...context,
    title,
    content
  }

  const allNotesWithPath = allNotes.map(content => getPath({ content, log, searchObj })).filter((n): n is File => !!n.path && !!n.content)

  // CONTENT
  const replaceAnchor: File[] = allNotesWithPath.map(({ content, ...props }) => ({
    ...props,
    content: handleReplacingProperties({ content, searchObj }) ?? ''
  })).filter(n => !!n.path && !!n.content)

  log?.(JSON.stringify(allNotesWithPath).replaceAll('${', '\\\$\\\{').replaceAll('}', '\\\}').replaceAll(')', '\\\)'))

  // CONDITION
  const finalArray = replaceAnchor.map<File>(({ content, ...props }) => ({
    ...props,
    content: handleConditions({ content, searchObj }) ?? ''
  })).filter(n => !!n.path && !!n.content)

  log?.('----')
  log?.(JSON.stringify(finalArray).replaceAll('${', '\\\$\\\{').replaceAll('}', '\\\}').replaceAll(')', '\\\)'))

  return finalArray
}
