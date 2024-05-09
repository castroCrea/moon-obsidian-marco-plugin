/* eslint-disable no-template-curly-in-string */
type StartEndAnchor = {
  startAnchor: '{{START_NOTE}}'
  endAnchor: '{{END_NOTE}}'
} | {
  startAnchor: '{{DATE}}'
  endAnchor: '{{END_DATE}}'
}

export const extractContentBetweenAnchors = ({
  text,
  startAnchor,
  endAnchor
}: { text: string } & StartEndAnchor) => {
  const allBlocksSplitByEndAnchor = text.split(endAnchor)
  const keepBlocksWithTheStartAnchor = allBlocksSplitByEndAnchor.filter(text => text.includes(startAnchor))
  return keepBlocksWithTheStartAnchor.map(text => text.split(startAnchor).pop()?.trim())
}
