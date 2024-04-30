import { extractAllNotes, extractTextFromAnchor } from "../extractText";

describe('extractTextFromAnchor', () => {
  it('extractTextFromAnchor', () => {
    const text = '${START_NOTE}This is the text ${SOURCE.TEXT}${END_NOTE} some content after'
    const result = extractTextFromAnchor({ text, startAnchor: '${START_NOTE}', endAnchor: '${END_NOTE}' })
    expect(result).toEqual('This is the text ${SOURCE.TEXT}')
   }
  )
})

describe('extractAllNotes', () => {
  it('extractAllNotes', () => {
    const text = '${START_NOTE}1. This is the text ${SOURCE.TEXT}${END_NOTE} some content after${START_NOTE}2. This is the text ${SOURCE.TEXT}${END_NOTE} some content after'
    const result = extractAllNotes({ text, startAnchor: '${START_NOTE}', endAnchor: '${END_NOTE}' })
    expect(result).toEqual(['1. This is the text ${SOURCE.TEXT}', '2. This is the text ${SOURCE.TEXT}' ])
   }
  )
})
