import { type SearchObject, type LOG } from './types'
import { searchObject } from './searchObject'

export const handleReplacingProperties = ({ content, searchObj }: { content?: string, searchObj: SearchObject }) => {
  const regex = /\$\{((\S)*?)\}/gm

  const matches = content?.match(regex)
  // console.log({ matches })

  matches?.forEach(value => {
    const key = (value.replace('${', '').replace('}', '')).toLowerCase()
    const keyValue = searchObject({ obj: searchObj, path: key })
    const stringKeyValue = !keyValue ? undefined : typeof keyValue === 'string' ? keyValue : JSON.stringify(keyValue)
    if (!stringKeyValue) {
      content = content?.replace(value, '')
      return
    }
    content = content?.replace(value, stringKeyValue)
  })

  return content
}

export const handleConditions = ({ content, searchObj }: { content?: string, searchObj: SearchObject }): string | undefined => {
  const regexIf = /\$\{IF.*?\}(?:[^{}])*?\{END_IF.*?\}/gm
  const regexIfStart = /\$\{IF (.*?)\}/gm
  const regexIfEnd = /\$\{END_IF (.*?)\}/gm
  const matches = content?.match(regexIf)

  content = handleReplacingProperties({ content, searchObj }) ?? ''

  matches?.forEach(value => {
    const ifValue = value.match(regexIfStart)?.[0]
    if (!ifValue) return
    const key = (ifValue.replace('${IF ', '').replace('}', '')).toLowerCase()

    const keyValue = searchObject({ obj: searchObj, path: key })

    if (!keyValue) {
      content = content?.replace(value, '')
    } else {
      let valueReplaced = value
      const endIfValue = value.match(regexIfEnd)?.[0]
      if (ifValue) valueReplaced = valueReplaced?.replace(ifValue, '')
      if (endIfValue) valueReplaced = valueReplaced?.replace(endIfValue, '')
      content = content?.replace(value, valueReplaced)
    }
  })

  if (!content?.match(regexIf)?.length) { return content }

  // Handle recursive
  return handleConditions({ content, searchObj })
}

export const getPath = ({ content, searchObj }: { content: string, log: LOG, searchObj: SearchObject }): { path: string | undefined, content: string } => {
  // eslint-disable-next-line no-template-curly-in-string
  const pathContent = (content.split('${END_PATH}')[0].split('${PATH}')[1])?.trim()

  if (!pathContent) return { path: undefined, content }

  const lines = pathContent.split('\n')

  let notePath: string | undefined

  for (const line of lines) {
    notePath = handleConditions({ content: line ?? '', searchObj })?.trim()
    if (notePath) break
  }

  const regexRemovePath = /\${PATH}(\s|.)*\${END_PATH}\n/gm

  return { path: notePath?.trim(), content: content.replace(regexRemovePath, '') }
}
