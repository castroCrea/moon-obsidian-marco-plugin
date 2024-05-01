import { handleReplacingProperties } from "../handleAnchors";
import { SearchObject } from "../types";

describe('handleReplacingProperties', () => {
  it('handleReplacingProperties', () => {
    const content = 'Content Before --- {{IF SOURCE.TEXT}} some content in the condition {{SOURCE.TEXT}} - {{SOURCE.URL}} - {{SOURCE.TITLE}} {{END_IF SOURCE.TEXT}} --- Some content after --- {{IF TITLE}} some content in the condition the should show up {{SOURCE.URL}} {{END_IF TITLE}} ---  {{IF SOURCE.URL}} some content in the condition link to the url {{SOURCE.URL}} {{END_IF SOURCE.URL}}'
    const result = handleReplacingProperties({ content, searchObj: {source: {text: 'some text', url: 'https://moonjot.com'}} as SearchObject })
    expect(result).toEqual('Content Before --- {{IF SOURCE.TEXT}} some content in the condition some text - https://moonjot.com -  {{END_IF SOURCE.TEXT}} --- Some content after --- {{IF TITLE}} some content in the condition the should show up https://moonjot.com {{END_IF TITLE}} ---  {{IF SOURCE.URL}} some content in the condition link to the url https://moonjot.com {{END_IF SOURCE.URL}}')
   })
  it('handleReplacingProperties with condition', () => {
    const content = `
{{IF SOURCE.TEXT}}
content
{{IF SOURCE.URL}}
URL: {{SOURCE.URL}}
{{END_IF SOURCE.URL}}
{{END_IF SOURCE.TEXT}}`
    
    const result = handleReplacingProperties({ content, searchObj: { source: { text: 'some text', url: 'https://moonjot.com' } } as SearchObject })
    expect(result).toContain('URL: https://moonjot.com')
   })
})