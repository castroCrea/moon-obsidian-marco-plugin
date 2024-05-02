import { DEFAULT_TOPICS, type Context } from '@moonjot/moon'
import { handleAnchorsFlow } from '../integration'

jest
  .useFakeTimers()
  .setSystemTime(new Date('2020-01-01'));

describe('handleAnchorsFlow', () => {
  it('handleAnchorsFlow 1', () => {
    const template = `
    
{{START_NOTE}}
{{PATH}}
{{IF SOURCE.TITLE}}/Notes/{{SOURCE.TITLE}}.md{{END_IF SOURCE.TITLE}}
{{IF TITLE}}{{TITLE}}.md{{END_IF TITLE}}
{{END_PATH}}
---
{{IF SOURCE.DESCRIPTION}} description: {{SOURCE.DESCRIPTION}}{{END_IF SOURCE.DESCRIPTION}}
{{IF SOURCE.TIMESTAMP}} description: Youtube video timestamps captured {{SOURCE.TIMESTAMP}} {{END_IF SOURCE.TIMESTAMP}}
{{IF PERSON.NAME}} author : {{PERSON.NAME}}{{END_IF PERSON.NAME}}
---

{{DATE}}YYYY-MM-DD{{END_DATE}}

{{CONTENT}}


# Clip
{{SOURCE.TEXT}}

{{END_NOTE}}

{{START_NOTE}}
{{PATH}}/Journal/{{DATE}}YYYY-MM-DD{{END_DATE}}.md{{END_PATH}}
- {{CONTENT}} [{{SOURCE.TITLE}}]({{SOURCE.URL}})
{{END_NOTE}}
    `
    const context: Context = { source: { description: 'a description source' }, people: [], keywords: DEFAULT_TOPICS }
    const result = handleAnchorsFlow({ markdown: '# some content', template, log: undefined, context })
    expect(result.length).toEqual(2)
    expect(JSON.stringify(result)).toEqual("[{\"path\":\"some content.md\",\"content\":\"---\\n description: a description source\\n\\n\\n---\\n\\n2020-01-01\\n\\n# some content\\n\\n\\n# Clip\\n\"},{\"path\":\"/Journal/2020-01-01.md\",\"content\":\"- # some content []()\"}]")
  })

  
  it('handleAnchorsFlow 2', () => {
    const template = `
# NOTE WITH TITLE

{{START_NOTE}}
{{PATH}}
{{IF TITLE}}/Notes/{{TITLE}}.md {{END_IF TITLE}}
{{END_PATH}}
---
{{IF SOURCE.DESCRIPTION}} description: {{SOURCE.DESCRIPTION}} {{END_IF SOURCE.DESCRIPTION}}
{{IF SOURCE.TIMESTAMP.0}} timestamp:  {{SOURCE.TIMESTAMP.0.timestamp}} - {{SOURCE.TIMESTAMP.0.URL}} {{END_IF SOURCE.TIMESTAMP.0}}
{{IF PEOPLE.0.NAME}} author : {{PEOPLE.0.NAME}} {{END_IF PEOPLE.0.NAME}}
---
{{CONTENT}}

{{END_NOTE}}

# CLIP

{{START_NOTE}}
{{PATH}}
{{IF SOURCE.TITLE}}/Sources/{{SOURCE.TITLE}}.md {{END_IF SOURCE.TITLE}}
{{END_PATH}}
---
{{IF PEOPLE.0.NAME}} author : {{PEOPLE.0.NAME}} {{END_IF PEOPLE.0.NAME}}
---

{{IF SOURCE.TEXT}}
{{SOURCE.TEXT}}
{{END_IF SOURCE.TEXT}}
{{END_NOTE}}

# PEOPLE

{{START_NOTE}}
{{PATH}}
{{IF PEOPLE.0.NAME}}/People/{{PEOPLE.0.NAME}}.md {{END_IF PEOPLE.0.NAME}}
{{END_PATH}}
{{END_NOTE}}

# JOURNAL

{{START_NOTE}}
{{PATH}}/Journal/01 - Daily/{{DATE}}YYYY-MM-DD{{END_DATE}}.md{{END_PATH}}
- {{CONTENT}} [{{SOURCE.TITLE}}]({{SOURCE.URL}})
{{END_NOTE}}
    `
    const context: Context = { source: { description: 'a description source' }, people: [{name: 'Henni'}], keywords: DEFAULT_TOPICS }
    const result = handleAnchorsFlow({ markdown: '# some content', template, log: undefined, context })
    expect(result.length).toEqual(3)
    expect(result).toEqual([
      {
        "content": `---
 description: a description source 

 author : Henni 
---
# some content`,
        "path": "/Notes/some content.md"
      },
      { "content": "", "path": "/People/Henni.md" },
      { "content": "- # some content []()", "path": "/Journal/01 - Daily/2020-01-01.md" }])
  })


  it('handleAnchorsFlow 3', () => {
    const template = `
    {{START_NOTE}}
{{PATH}}/Journal/01 - Daily/{{DATE}}YYYY-MM-DD{{END_DATE}}.md{{END_PATH}}
## Daily Tasks

{{IF TASK}}{{CONTENT}}{{END_IF TASK}}
## Notes
{{IF TASK === undefined }}
- {{CONTENT}} [{{SOURCE.TITLE}}]({{SOURCE.URL}}) {{IF PEOPLE.0.NAME}}[[/People/{{PEOPLE.0.NAME}}.md]]{{END_IF PEOPLE.0.NAME}}
{{END_IF TASK}}
{{END_NOTE}}
    `
    const context: Context = { source: { description: 'a description source' }, people: [], keywords: DEFAULT_TOPICS }
    const result = handleAnchorsFlow({ markdown: '- [ ] some content', template, log: undefined, context })
    expect(JSON.stringify(result)).toEqual("[{\"path\":\"/Journal/01 - Daily/2020-01-01.md\",\"content\":\"## Daily Tasks\\n\\n- [ ] some content\\n## Notes\\n\"}]")
  })
})
