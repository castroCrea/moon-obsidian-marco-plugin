import { mergeMarkdownFiles } from '@moonjot/moon-utils'
import { type File } from './types'
import fs from 'fs'
import path from 'path'

function generateRandomId () {
  return Math.floor((1 + Math.random()) * 0x10000000000000000)
    .toString(16)
    .substring(1)
}

// 30px per lines
export const handleCanvas = ({
  filePath,
  content
}: { filePath: string, content: string }) => {
  const canvasContentString = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '{}'
  const canvas = JSON.parse(canvasContentString)
  const height = content.split('\n').length * 30
  const width = ((content.split('\n').map(line => line.length).sort((a, b) => b - a)[0] ?? 1) * 4) + 50
  const y = (canvas.nodes as Array<{ x: number, y: number, height: number }>)?.filter((node) => node.x === 0).map(node => node.y + height).sort((a, b) => b - a)[0]

  const canvasContent = { id: generateRandomId(), type: 'text', text: content, x: 0, y: y ? y + 8 : 0, width: width ?? 250, height: height ?? 60 }
  canvas.nodes = [...canvas.nodes, canvasContent]

  fs.writeFileSync(filePath, JSON.stringify(canvas))
}

export const mergeIfFileExist = (filePath: string, content: string) => {
  if (filePath.endsWith('.canvas')) {
    handleCanvas({ filePath, content })
    return
  }
  if (fs.existsSync(filePath)) {
    // File exists, merge the content
    const existingContent: string = fs.readFileSync(filePath, 'utf8')

    const mergedContent = mergeMarkdownFiles({ originalContent: existingContent, newContent: content })

    fs.writeFileSync(filePath, mergedContent)
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
