import { extractContentBetweenAnchors } from "../extractText";

describe('extractContentBetweenAnchors', () => {
  it('extractContentBetweenAnchors', () => {
    const text = '{{START_NOTE}}1. This is the text {{SOURCE.TEXT}}{{END_NOTE}} some content after{{START_NOTE}}2. This is the text {{SOURCE.TEXT}}{{END_NOTE}} some content after'
    const result = extractContentBetweenAnchors({ text, startAnchor: '{{START_NOTE}}', endAnchor: '{{END_NOTE}}' })
    expect(result).toEqual(['1. This is the text {{SOURCE.TEXT}}', '2. This is the text {{SOURCE.TEXT}}' ])
   }
  )

  it('extractContentBetweenAnchors 1', () => {
    const text = `
    
{{START_NOTE}}
{{PATH}}
{{IF SOURCE.TITLE}}/Notes/{{SOURCE.TITLE}}.md{{END_IF SOURCE.TITLE}}
{{IF TITLE}}{{TITLE}}.md{{END_IF TITLE}}
{{END_PATH}}
---
{{IF SOURCE.DESCRIPTION}} description: {{SOURCE.DESCRIPTION}}{{END_IF SOURCE.DESCRIPTION}}
{{IF SOURCE.TIMESTAMP}} description: Youtube video timestamps captured {{SOURCE.TIMESTAMP}} {{END_IF SOURCE.TIMESTAMP}}
{{IF PERSON.NAME} author : {{PERSON.NAME}}{{END_IF PERSON.NAME}}
---

{{CONTENT}}


# Clip
{{SOURCE.TEXT}}

{{END_NOTE}}

{{START_NOTE}}
{{PATH}}/Journal/today.md{{END_PATH}}
- {{CONTENT}} [{{SOURCE.TITLE}}]({{SOURCE.URL}})
{{END_NOTE}}
    `
    const result = extractContentBetweenAnchors({ text, startAnchor: '{{START_NOTE}}', endAnchor: '{{END_NOTE}}' })
    expect(result.length).toEqual(2)
    expect(JSON.stringify(result)).toEqual("[\"{{PATH}}\\n{{IF SOURCE.TITLE}}/Notes/{{SOURCE.TITLE}}.md{{END_IF SOURCE.TITLE}}\\n{{IF TITLE}}{{TITLE}}.md{{END_IF TITLE}}\\n{{END_PATH}}\\n---\\n{{IF SOURCE.DESCRIPTION}} description: {{SOURCE.DESCRIPTION}}{{END_IF SOURCE.DESCRIPTION}}\\n{{IF SOURCE.TIMESTAMP}} description: Youtube video timestamps captured {{SOURCE.TIMESTAMP}} {{END_IF SOURCE.TIMESTAMP}}\\n{{IF PERSON.NAME} author : {{PERSON.NAME}}{{END_IF PERSON.NAME}}\\n---\\n\\n{{CONTENT}}\\n\\n\\n# Clip\\n{{SOURCE.TEXT}}\",\"{{PATH}}/Journal/today.md{{END_PATH}}\\n- {{CONTENT}} [{{SOURCE.TITLE}}]({{SOURCE.URL}})\"]")
   }
  )
})
