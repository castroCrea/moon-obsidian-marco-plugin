import yaml from 'js-yaml'

const removeMDPropertiesFromContent = (content: string) => content.split('---').slice(2).join('---')

export const mergeMarkdownFiles = (
  originalContent: string,
  newContent: string
) => {
  if (originalContent === newContent) return originalContent
  // Parse the YAML front matter from both contents
  const frontMatter1 = originalContent.split('---')[1]?.trim() ?? ''
  const frontMatter2 = newContent.split('---')[1]?.trim() ?? ''

  // Convert YAML front matter to objects
  const data1 = (yaml.load(frontMatter1) || {}) as Record<string, any>
  const data2 = (yaml.load(frontMatter2) || {}) as Record<string, any>

  // Merge the front matter data while avoiding duplication
  const mergedData: Record<string, any> = {
    ...(data1 || {}),
    ...(data2 || {})
  }

  for (const topic in data1) {
    if (Array.isArray(mergedData[topic])) {
      mergedData[topic] = [
        ...new Set([...(data1[topic] || []), ...(data2[topic] || [])])
      ]
    } else {
      mergedData[topic] = data2[topic] || data1[topic]
    }
  }

  // Serialize the merged front matter back to YAML
  const mergedPropsMD = yaml.dump(mergedData)
  const mergedFrontMatter = Object.keys(mergedData).length > 0 && mergedPropsMD !== '{}' ? '---\n' + mergedPropsMD + '---' : ''

  // remove props if exist in the content
  const originalContentText = Object.keys(data1).length > 0 ? removeMDPropertiesFromContent(originalContent).trim() : originalContent.trim()
  const newContentText = Object.keys(data2).length > 0 ? removeMDPropertiesFromContent(newContent).trim() : newContent.trim()

  const originalContentTextStartWithTitle = originalContentText.startsWith('##')
  const newContentStartWithTitle = newContentText.startsWith('##')
  const originalContentGroupeByTitle = originalContentText.trim().split(/^##\s/gm).map((section, index) => {
    if (!!section && (index > 0 || originalContentTextStartWithTitle)) section = `## ${section}`
    return section.split('\n')
  })
  const newContentGroupeByTitle = newContentText.trim().split(/^##\s/gm).map((section, index) => {
    if (!!section && (index > 0 || newContentStartWithTitle)) section = `## ${section}`
    return section.split('\n')
  })

  let finalContent = `${mergedFrontMatter}\n`

  for (let i = 0; i < originalContentGroupeByTitle.length; i++) {
    const title = originalContentGroupeByTitle[i][0]
    finalContent += `${originalContentGroupeByTitle[i].join('\n')}`
    const thereIsGroupWithSameTitleIndex = newContentGroupeByTitle.findIndex(section => section[0] === title)
    if (thereIsGroupWithSameTitleIndex > -1) {
      const blockContentThatMatch = newContentGroupeByTitle[thereIsGroupWithSameTitleIndex]
      blockContentThatMatch.shift()
      const shouldAddContent = blockContentThatMatch.filter(b => !!b).length > 0
      if (!shouldAddContent) continue
      finalContent += `${blockContentThatMatch.join('\n')}`
      newContentGroupeByTitle.splice(thereIsGroupWithSameTitleIndex, 1)
    }
  }

  // Concatenate the merged front matter with the content
  return `${finalContent}\n${newContentGroupeByTitle.filter(b => !!b).map(section => section.join('\n')).join('\n')}`
}
