/* eslint-disable no-useless-escape */
import { type Context } from '@moonjot/moon'
import { extractTitleFromMarkdown } from './extractTitleFromMarkdown'
import fs from 'fs'
import path from 'path'
import { type SearchObject, type LOG } from './types'
import { extractAllNotes } from './extractText'
import { getPath, handleConditions, handleReplacingProperties } from './handleAnchors'

export const doIntegration = ({ markdown, pathToTemplates, log, context }: { markdown: string, pathToTemplates?: string, log: LOG, context: Context }) => {
  if (!pathToTemplates) return false
  const defaultTemplate = fs.readFileSync(path.join(pathToTemplates, 'default.md'), 'utf8')

  // eslint-disable-next-line no-template-curly-in-string
  const allNotes = extractAllNotes({ text: defaultTemplate, startAnchor: '${START_NOTE}', endAnchor: '${END_NOTE}' })

  const allNotesWithPath = allNotes.map(noteContent => {
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    const notePath = getPath({ content: noteContent ?? '', log, searchObj })
    return ({
      noteContent,
      path: notePath
    })
  }).filter(n => !!n.path)

  const title = extractTitleFromMarkdown(markdown)
  const content = markdown

  const searchObj: SearchObject = {
    ...context,
    title,
    content
  }

  // CONTENT
  const replaceAnchor = allNotesWithPath.map(({ noteContent, ...props }) => ({
    ...props,
    noteContent: handleReplacingProperties({ content: noteContent, searchObj })
  }))
  log?.(JSON.stringify(allNotesWithPath).replaceAll('${', '\\\$\\\{').replaceAll('}', '\\\}').replaceAll(')', '\\\)'))

  const finalArray = replaceAnchor.map(({ noteContent, ...props }) => ({
    ...props,
    noteContent: handleConditions({ content: noteContent, searchObj })
  }))

  log?.('----')
  log?.(JSON.stringify(finalArray).replaceAll('${', '\\\$\\\{').replaceAll('}', '\\\}').replaceAll(')', '\\\)'))

  return true
}
