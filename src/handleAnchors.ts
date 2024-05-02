import { type SearchObject, type LOG } from './types'
import { searchObject } from './searchObject'
import { extractAllNotes } from './extractText'

export const handleReplacingProperties = ({ content, searchObj }: { content?: string, searchObj: SearchObject }) => {
  const regex = /{{((\S)*?)}}/gm

  const matches = content?.match(regex)
  // console.log({ matches })

  matches?.forEach(value => {
    const key = (value.replace('{{', '').replace('}}', '')).toLowerCase()
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

interface ComparatorsSetUpProps { key: string, searchObj: SearchObject }

const comparatorsSetUp = {
  '=== undefined': {
    callback: ({ key, searchObj }: ComparatorsSetUpProps) => {
      const values = key.split('=== undefined').map(v => v.trim())
      const keyValues = searchObject({ obj: searchObj, path: values[0].toLowerCase() })
      return keyValues === undefined ? true : undefined
    }
  },
  '===': {
    callback: ({ key, searchObj }: ComparatorsSetUpProps) => {
      const values = key.split('===').map(v => v.trim())
      const keyValues = values.map(value => searchObject({ obj: searchObj, path: value.toLowerCase() }) ?? value)
      return keyValues[0] === keyValues[1] ? keyValues[1] : undefined
    }
  },
  '!==': {
    callback: ({ key, searchObj }: ComparatorsSetUpProps) => {
      const values = key.split('!==').map(v => v.trim())
      const keyValues = values.map(value => searchObject({ obj: searchObj, path: value.toLowerCase() }) ?? value)
      return keyValues[0] !== keyValues[1] ? keyValues[1] : undefined
    }
  },
  '.includes': {
    callback: ({ key, searchObj }: ComparatorsSetUpProps) => {
      const values = key.split('.includes(').map(v => v.trim())
      const checkForMatchValue = values[1].slice(0, -1)
      const currentValue = searchObject({ obj: searchObj, path: values[0].toLowerCase() })
      return currentValue?.includes(checkForMatchValue) ? checkForMatchValue : undefined
    }
  }
}

export const handleConditions = ({ content, searchObj }: { content?: string, searchObj: SearchObject }): string | undefined => {
  const regexIf = /{{IF.*?}}(?:[^{}])*?{{END_IF.*?}}/gm
  const regexIfStart = /{{IF (.*?)}}/gm
  const regexIfEnd = /{{END_IF (.*?)}}/gm
  content = handleReplacingProperties({ content, searchObj }) ?? ''
  const matches = content?.match(regexIf)

  matches?.forEach(value => {
    const ifValue = value.match(regexIfStart)?.[0]
    if (!ifValue) return
    const key = (ifValue.replace('{{IF ', '').replace('}}', '')).toLowerCase()

    const comparator = (Object.keys(comparatorsSetUp) as Array<keyof typeof comparatorsSetUp>).find(element => key.includes(element))

    const keyValue = comparator ? comparatorsSetUp[comparator]?.callback({ key, searchObj }) : searchObject({ obj: searchObj, path: key })

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
  const pathContent = (content.split('{{END_PATH}}')[0].split('{{PATH}}')[1])?.trim()

  if (!pathContent) return { path: undefined, content }

  const lines = pathContent.split('\n')

  let notePath: string | undefined

  for (const line of lines) {
    notePath = handleConditions({ content: line ?? '', searchObj })?.trim().replaceAll('|', '')
    if (notePath) break
  }

  const regexRemovePath = /{{PATH}}((.|\s)*?){{END_PATH}}/gm
  const replacedContent = content.replaceAll(regexRemovePath, '')

  return { path: notePath?.trim(), content: replacedContent.trim() }
}

export const turnDate = ({ content }: { content: string }): string => {
  // eslint-disable-next-line no-template-curly-in-string
  const datesFormat = extractAllNotes({ text: content, endAnchor: '{{END_DATE}}', startAnchor: '{{DATE}}' }).filter((date): date is string => !!date)

  if (!datesFormat.length) return content

  const date = new Date()
  const year = date.getFullYear().toString()
  const month = `0${date.getMonth() + 1}`.slice(-2)
  const day = `0${date.getDate()}`.slice(-2)

  datesFormat.forEach((dateFormat) => {
    const dateFormatted = dateFormat.replace('YYYY', year).replace('MM', month).replace('DD', day)
    const regexRemoveDate = new RegExp(`{{DATE}}${dateFormat}{{END_DATE}}`, 'gm')

    content = content.replace(regexRemoveDate, dateFormatted)
  })

  return content
}
