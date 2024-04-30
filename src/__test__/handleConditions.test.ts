import { getPath, handleConditions, handleReplacingProperties } from "../handleAnchors";
import { SearchObject } from "../types";

describe('handleConditions', () => {
  it('handleConditions', () => {
    const content = 'Content Before --- ${IF SOURCE.TEXT} some content in the condition ${SOURCE.TEXT} - ${SOURCE.URL} - ${SOURCE.TITLE} ${END_IF SOURCE.TEXT} --- Some content after --- ${IF TITLE} some content in the condition the should show up ${SOURCE.URL} ${END_IF TITLE} ---  ${IF SOURCE.URL} some content in the condition link to the url ${SOURCE.URL} ${END_IF SOURCE.URL}'
    const result = handleConditions({ content, searchObj: { source: { text: 'some text', url: 'https://moonjot.com' } } as SearchObject })
        expect(result).toEqual('Content Before ---  some content in the condition some text - https://moonjot.com -   --- Some content after ---  ---   some content in the condition link to the url https://moonjot.com ')
  })
  
  it('handleConditions recursive with good value', () => {
    const content = `
\${IF SOURCE.TEXT}
content
\${IF SOURCE.URL}
URL: \${SOURCE.URL}
\${END_IF SOURCE.URL}
\${END_IF SOURCE.TEXT}`
    
    const result = handleConditions({ content, searchObj: { source: { text: 'some text', url: 'https://moonjot.com' } } as SearchObject })
    expect(result).toEqual('\n\ncontent\n\nURL: https://moonjot.com\n\n')
  })
  

  it('handleConditions recursive with wrong value', () => {
    const content = `
\${IF SOURCE.TEXT}
content
\${IF SOURCE.BOOM}
URL: \${SOURCE.URL}
\${END_IF SOURCE.BOOM}
\${END_IF SOURCE.TEXT}`
    
    const result = handleConditions({ content, searchObj: { source: { text: 'some text', url: 'https://moonjot.com' } } as SearchObject })
    expect(result).toEqual('\n\ncontent\n\n')
   })
})

describe('handleReplacingProperties', () => {
  it('handleReplacingProperties', () => {
    const content = 'Content Before --- ${IF SOURCE.TEXT} some content in the condition ${SOURCE.TEXT} - ${SOURCE.URL} - ${SOURCE.TITLE} ${END_IF SOURCE.TEXT} --- Some content after --- ${IF TITLE} some content in the condition the should show up ${SOURCE.URL} ${END_IF TITLE} ---  ${IF SOURCE.URL} some content in the condition link to the url ${SOURCE.URL} ${END_IF SOURCE.URL}'
    const result = handleReplacingProperties({ content, searchObj: {source: {text: 'some text', url: 'https://moonjot.com'}} as SearchObject })
    expect(result).toEqual('Content Before --- ${IF SOURCE.TEXT} some content in the condition some text - https://moonjot.com -  ${END_IF SOURCE.TEXT} --- Some content after --- ${IF TITLE} some content in the condition the should show up https://moonjot.com ${END_IF TITLE} ---  ${IF SOURCE.URL} some content in the condition link to the url https://moonjot.com ${END_IF SOURCE.URL}')
   })
  it('handleReplacingProperties with condition', () => {
    const content = `
\${IF SOURCE.TEXT}
content
\${IF SOURCE.URL}
URL: \${SOURCE.URL}
\${END_IF SOURCE.URL}
\${END_IF SOURCE.TEXT}`
    
    const result = handleReplacingProperties({ content, searchObj: { source: { text: 'some text', url: 'https://moonjot.com' } } as SearchObject })
    expect(result).toContain('URL: https://moonjot.com')
   })
})
describe('getPath', () => {
  it('getPath not existing', () => {
    const content = 'Content Before --- ${IF SOURCE.TEXT} some content in the condition ${SOURCE.TEXT} - ${SOURCE.URL} - ${SOURCE.TITLE} ${END_IF SOURCE.TEXT} --- Some content after --- ${IF TITLE} some content in the condition the should show up ${SOURCE.URL} ${END_IF TITLE} ---  ${IF SOURCE.URL} some content in the condition link to the url ${SOURCE.URL} ${END_IF SOURCE.URL}'
    const result = getPath({ content, searchObj: {source: {text: 'some text', url: 'https://moonjot.com'}} as SearchObject, log: undefined })
    expect(result).toBeUndefined()
  })
  
  it('getPath', () => {
    const content = '${PATH}/Notes/${SOURCE.TEXT}.md${END_PATH}Content Before --- ${IF SOURCE.TEXT} some content in the condition ${SOURCE.TEXT} - ${SOURCE.URL} - ${SOURCE.TITLE} ${END_IF SOURCE.TEXT} --- Some content after --- ${IF TITLE} some content in the condition the should show up ${SOURCE.URL} ${END_IF TITLE} ---  ${IF SOURCE.URL} some content in the condition link to the url ${SOURCE.URL} ${END_IF SOURCE.URL}'
    const result = getPath({ content, searchObj: {source: {text: 'some text', url: 'https://moonjot.com'}} as SearchObject, log: undefined })
    expect(result).toEqual("/Notes/some text.md")
  })
  
  it('getPath with condition 1', () => {
    const content = `
    \${PATH}
    \${IF SOURCE.TEXT}/1/boom.md\${END_IF SOURCE.TEXT}
    \${IF SOURCE.URL}/1/\${SOURCE.URL}.md\${END_IF SOURCE.URL}
    \${END_PATH}
\${IF SOURCE.TEXT}
content
\${IF SOURCE.URL}
URL: \${SOURCE.URL}
\${END_IF SOURCE.URL}
\${END_IF SOURCE.TEXT}`
    const result = getPath({ content, searchObj: {source: {text: 'some text', url: 'https://moonjot.com'}} as SearchObject, log: undefined })
    expect(result.path).toEqual("/1/boom.md")
    expect(JSON.stringify(result.content)).toEqual("\"\\n    ${IF SOURCE.TEXT}\\ncontent\\n${IF SOURCE.URL}\\nURL: ${SOURCE.URL}\\n${END_IF SOURCE.URL}\\n${END_IF SOURCE.TEXT}\"")
  })
  
  it('getPath with condition 2', () => {
    const content = `
    \${PATH}
    \${IF SOURCE.BOOM}/1/boom.md\${END_IF SOURCE.BOOM}
    \${IF SOURCE.URL}/URL/\${SOURCE.URL}.md\${END_IF SOURCE.URL}
    \${END_PATH}
\${IF SOURCE.TEXT}
content
\${IF SOURCE.URL}
URL: \${SOURCE.URL}
\${END_IF SOURCE.URL}
\${END_IF SOURCE.TEXT}`
    const result = getPath({ content, searchObj: {source: {text: 'some text', url: 'https://moonjot.com'}} as SearchObject, log: undefined })
    expect(result.path).toEqual("/URL/https://moonjot.com.md")
    expect(JSON.stringify(result.content)).toEqual("\"\\n    ${IF SOURCE.TEXT}\\ncontent\\n${IF SOURCE.URL}\\nURL: ${SOURCE.URL}\\n${END_IF SOURCE.URL}\\n${END_IF SOURCE.TEXT}\"")
  })
  
  it('getPath with condition 3', () => {
    const content = `
    \${PATH}
    \${IF SOURCE.BOOM}/1/boom.md\${END_IF SOURCE.BOOM}
    \${IF SOURCE.BOOM2}/URL/\${SOURCE.URL}.md\${END_IF SOURCE.BOOM2}
    /not_condition/Journal.md
    \${END_PATH}
\${IF SOURCE.TEXT}
content
\${IF SOURCE.URL}
URL: \${SOURCE.URL}
\${END_IF SOURCE.URL}
\${END_IF SOURCE.TEXT}`
    const result = getPath({ content, searchObj: {source: {text: 'some text', url: 'https://moonjot.com'}} as SearchObject, log: undefined })
    expect(result.path).toEqual("/not_condition/Journal.md")
    expect(JSON.stringify(result.content)).toEqual("\"\\n    ${IF SOURCE.TEXT}\\ncontent\\n${IF SOURCE.URL}\\nURL: ${SOURCE.URL}\\n${END_IF SOURCE.URL}\\n${END_IF SOURCE.TEXT}\"")
  })
  
})
