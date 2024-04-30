import { DEFAULT_TOPICS, type Context } from '@moonjot/moon'
import { handleAnchorsFlow } from '../integration'

jest
  .useFakeTimers()
  .setSystemTime(new Date('2020-01-01'));

describe('handleAnchorsFlow', () => {
  it('handleAnchorsFlow 1', () => {
    const template = `
    
\${START_NOTE}
\${PATH}
\${IF SOURCE.TITLE}/Notes/\${SOURCE.TITLE}.md\${END_IF SOURCE.TITLE}
\${IF TITLE}\${TITLE}.md\${END_IF TITLE}
\${END_PATH}
---
\${IF SOURCE.DESCRIPTION} description: \${SOURCE.DESCRIPTION}\${END_IF SOURCE.DESCRIPTION}
\${IF SOURCE.TIMESTAMP} description: Youtube video timestamps captured \${SOURCE.TIMESTAMP} \${END_IF SOURCE.TIMESTAMP}
\${IF PERSON.NAME} author : \${PERSON.NAME}}\${END_IF PERSON.NAME}
---

\${DATE}YYYY-MM-DD\${END_DATE}

\${CONTENT}


# Clip
\${SOURCE.TEXT}

\${END_NOTE}

\${START_NOTE}
\${PATH}/Journal/\${DATE}YYYY-MM-DD\${END_DATE}.md\${END_PATH}
- \${CONTENT} [\${SOURCE.TITLE}](\${SOURCE.URL})
\${END_NOTE}
    `
    const context: Context = { source: { description: 'a description source' }, people: [], keywords: DEFAULT_TOPICS }
    const result = handleAnchorsFlow({ markdown: '# some content', template, log: undefined, context })
    expect(result.length).toEqual(2)
    expect(JSON.stringify(result)).toEqual("[{\"path\":\"some content.md\",\"content\":\"\\n---\\n description: a description source\\n\\n\\n---\\n\\n2020-01-01\\n\\n# some content\\n\\n\\n# Clip\\n\"},{\"path\":\"/Journal/2020-01-01.md\",\"content\":\"\\n- # some content []()\"}]")
  }
  )
})
