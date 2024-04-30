/* eslint-disable no-template-curly-in-string */
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

export const extractTextFromAnchor = ({
  text,
  startAnchor,
  endAnchor
}: { text: string } & StartEndAnchor): string | undefined => {
  return (text.split(endAnchor)[0].split(startAnchor)[1])?.trim() // faster than the regex x10
}

export const extractAllNotes = ({
  text,
  startAnchor,
  endAnchor
}: { text: string } & StartEndAnchor) => {
  const allBlocksSplitByEndAnchor = text.split(endAnchor)
  const keepBlocksWithTheStartAnchor = allBlocksSplitByEndAnchor.filter(text => text.includes(startAnchor))
  return keepBlocksWithTheStartAnchor.map(text => text.split(startAnchor)[1].trim())
}
