/* eslint-disable no-useless-escape */
import { type Context } from '@moonjot/moon'
import { extractTaskFromMarkdown, extractTitleFromMarkdown, extractContentBetweenAnchors, getPath, handleConditions, handleReplacingProperties, turnDate } from '@moonjot/moon-utils'
import fs from 'fs'
import path from 'path'
import { type SearchObject, type LOG, type File } from './types'

export const doIntegration = ({ markdown, pathToTemplate, log, context }: { markdown: string, pathToTemplate?: string, log: LOG, context: Context }): File[] => {
  if (!pathToTemplate) return []
  const defaultTemplate = fs.readFileSync(path.join(pathToTemplate), 'utf8')

  return handleAnchorsFlow({ markdown, template: defaultTemplate ?? '', log, context })
}

export const handleAnchorsFlow = ({ markdown, template, log, context }: { markdown: string, template: string, log: LOG, context: Context }): File[] => {
  const handleDateContent = turnDate({ content: template })

  // eslint-disable-next-line no-template-curly-in-string
  const allNotes = extractContentBetweenAnchors({ text: handleDateContent, startAnchor: '{{START_NOTE}}', endAnchor: '{{END_NOTE}}' }).filter((note): note is string => !!note)

  const title = extractTitleFromMarkdown(markdown)
  const task = extractTaskFromMarkdown(markdown)
  const content = title ? markdown.split('\n').slice(1).join('\n') : markdown

  const searchObj: SearchObject = {
    ...context,
    title,
    content,
    task
  }

  const allNotesWithPath = allNotes.map(content => getPath({ content, log, searchObj })).filter((n): n is File => !!n.path)

  // CONTENT
  const replaceAnchor: File[] = allNotesWithPath.map(({ content, ...props }) => ({
    ...props,
    content: handleReplacingProperties({ content, searchObj }) ?? ''
  }))

  // log?.(JSON.stringify(allNotesWithPath))

  // CONDITION
  const finalArray = replaceAnchor.map<File>(({ content, ...props }) => ({
    ...props,
    content: handleConditions({ content, searchObj })?.trim() ?? ''
  }))

  // log?.('----')
  // log?.(JSON.stringify(finalArray))

  return finalArray
}
