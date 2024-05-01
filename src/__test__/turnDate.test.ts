import { turnDate } from "../handleAnchors";

jest
  .useFakeTimers()
  .setSystemTime(new Date('2020-01-01'));

describe('turnDate', () => {
  it('turnDate', () => {
    const content = `
{{DATE}}YYYY-MM-DD{{END_DATE}}
{{DATE}}MM-YYYY-DD{{END_DATE}}
content
{{IF SOURCE.URL}}
URL: {{SOURCE.URL}}
{{END_IF SOURCE.URL}}
{{END_IF SOURCE.TEXT}}`
    
    const result = turnDate({ content })
    expect(JSON.stringify(result)).toEqual("\"\\n2020-01-01\\n01-2020-01\\ncontent\\n{{IF SOURCE.URL}}\\nURL: {{SOURCE.URL}}\\n{{END_IF SOURCE.URL}}\\n{{END_IF SOURCE.TEXT}}\"")
   })
})