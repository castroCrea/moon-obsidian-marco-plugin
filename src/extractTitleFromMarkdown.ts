export const extractTitleFromMarkdown = (markdown: string) => {
  const lines = markdown.trim().split('\n')
  const firstLine = lines[0].trim()

  if (firstLine.startsWith('# ')) return firstLine.substring(1).trim()

  return undefined
}

export const extractTaskFromMarkdown = (markdown: string) => {
  const lines = markdown.trim().split('\n')
  const firstLine = lines[0].trim()

  if (firstLine.startsWith('- [ ]')) return firstLine

  return undefined
}
