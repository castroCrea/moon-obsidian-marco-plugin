import { mergeMarkdownFiles } from '@moonjot/moon-utils'
import { type File } from './types'
import fs from 'fs'
import path from 'path'

export const mergeIfFileExist = (filePath: string, content: string) => {
  if (fs.existsSync(filePath)) {
    // File exists, merge the content
    const existingContent: string = fs.readFileSync(filePath, 'utf8')
    const mergedContent = mergeMarkdownFiles({ originalContent: existingContent, newContent: content })

    fs.writeFileSync(filePath, mergedContent as string)
  } else {
    // File doesn't exist, create it
    fs.writeFileSync(filePath, content)
  }
}

export const createDirectory = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

export const createFiles = ({
  files,
  vaultPath
}: {
  files: File[]
  vaultPath: string
}) => {
  files.forEach(({ content, path: absoluteFilePath }) => {
    const paths = absoluteFilePath.split('/')
    const fileName = paths.pop()
    const doc = paths.join('/')

    const fileDoc: string = path.join(vaultPath, doc)
    const filePath: string = path.join(fileDoc, `${fileName}`)
    createDirectory(fileDoc)
    mergeIfFileExist(filePath, content)
  })

  return true
}
