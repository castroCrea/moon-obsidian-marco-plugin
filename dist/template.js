"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_TEMPLATE = void 0;
exports.DEFAULT_TEMPLATE = `
# Capture a note to a path using plugin obsidian mention anchor ">"

{{START_NOTE}}
{{PATH}}
{{IF pluginPlayground.obsidian.notePath}}{{pluginPlayground.obsidian.notePath}}/{{TITLE}}.md {{END_IF pluginPlayground.obsidian.notePath}}
{{IF TITLE}}/Notes/{{TITLE}}.md {{END_IF TITLE}}
{{END_PATH}}
---
{{IF SOURCE.DESCRIPTION}}Description: |-
  {{IF SOURCE.published}}{{SOURCE.published}} - {{END_IF SOURCE.published}}
  {{IF SOURCE.TIMESTAMP.0}}[{{SOURCE.TIMESTAMP.0.timestamp}}]({{SOURCE.TIMESTAMP.0.URL}}) - {{END_IF SOURCE.TIMESTAMP.0}}
  {{SOURCE.DESCRIPTION}} 
{{END_IF SOURCE.DESCRIPTION}}

{{IF SOURCE.url}}URL: {{SOURCE.url}} {{END_IF SOURCE.url}}

{{IF PEOPLE.0.NAME}}Author: 
- {{PEOPLE.0.NAME}} 
{{IF PEOPLE.1.NAME}}  - {{PEOPLE.1.NAME}}{{END_IF PEOPLE.1.NAME}}
{{IF PEOPLE.2.NAME}}  - {{PEOPLE.2.NAME}}{{END_IF PEOPLE.2.NAME}}
{{IF PEOPLE.3.NAME}}  - {{PEOPLE.3.NAME}}{{END_IF PEOPLE.3.NAME}}
{{END_IF PEOPLE.0.NAME}}
---
{{IF SOURCE.TEXT}}{{IF SOURCE.TITLE}}Source: [[/Sources/{{SOURCE.TITLE}}.md]] {{END_IF SOURCE.TITLE}}{{END_IF SOURCE.TEXT}}
{{CONTENT}}

{{END_NOTE}}

# Save the source over which you open Moon jot

{{START_NOTE}}
{{PATH}}
{{IF SOURCE.TEXT}}{{IF SOURCE.TITLE}}/Sources/{{SOURCE.TITLE}}.md {{END_IF SOURCE.TITLE}}{{END_IF SOURCE.TEXT}}
{{END_PATH}}
---
{{IF PEOPLE.0.NAME}} author : {{PEOPLE.0.NAME}} {{END_IF PEOPLE.0.NAME}}
{{IF SOURCE.DESCRIPTION}}Description: |-
  {{IF SOURCE.published}}{{SOURCE.published}} - {{END_IF SOURCE.published}}
  {{IF SOURCE.TIMESTAMP.0}}[{{SOURCE.TIMESTAMP.0.timestamp}}]({{SOURCE.TIMESTAMP.0.URL}}) - {{END_IF SOURCE.TIMESTAMP.0}}
  {{SOURCE.DESCRIPTION}} 
{{END_IF SOURCE.DESCRIPTION}}
---
{{IF PEOPLE.0.NAME}}[[/People/{{PEOPLE.0.NAME}}.md]]{{END_IF PEOPLE.0.NAME}}
{{IF PEOPLE.1.NAME}}[[/People/{{PEOPLE.1.NAME}}.md]]{{END_IF PEOPLE.1.NAME}}
{{IF PEOPLE.2.NAME}}[[/People/{{PEOPLE.2.NAME}}.md]]{{END_IF PEOPLE.2.NAME}}
{{IF PEOPLE.3.NAME}}[[/People/{{PEOPLE.3.NAME}}.md]]{{END_IF PEOPLE.3.NAME}}

{{IF SOURCE.TEXT}}
{{SOURCE.TEXT}}
{{END_IF SOURCE.TEXT}}

{{END_NOTE}}

# Save the source Direct message over which you open Moon jot

{{START_NOTE}}
{{PATH}}
{{IF SOURCE.dmContent}}{{IF SOURCE.TITLE}}/DM/{{SOURCE.TITLE}}.md{{END_IF SOURCE.TITLE}}{{END_IF SOURCE.dmContent}}
{{END_PATH}}
---
{{IF PEOPLE.0.NAME}} author : {{PEOPLE.0.NAME}} {{END_IF PEOPLE.0.NAME}}
---
{{IF PEOPLE.0.NAME}}[[/People/{{PEOPLE.0.NAME}}.md]]{{END_IF PEOPLE.0.NAME}}

{{IF SOURCE.dmContent}}
{{SOURCE.dmContent}}
{{END_IF SOURCE.dmContent}}

{{END_NOTE}}

# Save the People Direct message over which you open Moon jot

{{START_NOTE}}
{{PATH}}
{{IF PEOPLE.0.NAME}}/People/{{PEOPLE.0.NAME}}.md{{END_IF PEOPLE.0.NAME}}
{{END_PATH}}
---
{{IF PEOPLE.0.picture}}picture: {{PEOPLE.0.picture}}{{END_IF PEOPLE.0.picture}}
{{IF PEOPLE.0.job}}job: {{PEOPLE.0.job}}{{END_IF PEOPLE.0.job}}
{{IF PEOPLE.0.email}}email: {{PEOPLE.0.email}}{{END_IF PEOPLE.0.email}}
{{IF PEOPLE.0.about}}about: {{PEOPLE.0.about}}{{END_IF PEOPLE.0.about}}
{{IF PEOPLE.0.linkedin}}linkedin: {{PEOPLE.0.linkedin}}{{END_IF PEOPLE.0.linkedin}}
{{IF PEOPLE.0.twitter}}twitter: {{PEOPLE.0.twitter}}{{END_IF PEOPLE.0.twitter}}
{{IF PEOPLE.0.tiktok}}tiktok: {{PEOPLE.0.tiktok}}{{END_IF PEOPLE.0.tiktok}}
{{IF PEOPLE.0.instagram}}instagram: {{PEOPLE.0.instagram}}{{END_IF PEOPLE.0.instagram}}
{{IF PEOPLE.0.substack}}substack: {{PEOPLE.0.substack}}{{END_IF PEOPLE.0.substack}}
{{IF PEOPLE.0.github}}github: {{PEOPLE.0.github}}{{END_IF PEOPLE.0.github}}
{{IF PEOPLE.0.mastodon}}mastodon: {{PEOPLE.0.mastodon}}{{END_IF PEOPLE.0.mastodon}}
{{IF PEOPLE.0.youtube}}youtube: {{PEOPLE.0.youtube}}{{END_IF PEOPLE.0.youtube}}
{{IF PEOPLE.0.website}}website: {{PEOPLE.0.website}}{{END_IF PEOPLE.0.website}}
{{IF PEOPLE.0.names}}names: {{PEOPLE.0.names}}{{END_IF PEOPLE.0.names}}
{{IF PEOPLE.0.anchor}}anchor: {{PEOPLE.0.anchor}}{{END_IF PEOPLE.0.anchor}}
---
{{IF SOURCE.TITLE}}[[/Sources/{{SOURCE.TITLE}}.md]]{{END_IF SOURCE.TITLE}}

{{END_NOTE}}

# Create a canvas note

{{START_NOTE}}
{{PATH}}/inbox.canvas{{END_PATH}}

{{IF PEOPLE.0.NAME}}
- [[/People/{{PEOPLE.0.NAME}}.md]] 
{{END_IF PEOPLE.0.NAME}}
{{IF CONTENT}}
- {{DATE}}HH:mm:ss{{END_DATE}}: {{CONTENT}}
{{END_IF CONTENT}}
{{IF SOURCE.URL}}
- [{{SOURCE.TITLE}}]({{SOURCE.URL}}) 
{{END_IF SOURCE.URL}}
{{END_NOTE}}

# Create a journal note

{{START_NOTE}}
{{PATH}}/Journal/01 - Daily/{{DATE}}YYYY-MM-DD{{END_DATE}}.md{{END_PATH}}
## Daily Tasks
{{IF TASK}}{{CONTENT}}{{END_IF TASK}}
## Notes
{{IF TITLE}}
- {{DATE}}HH:mm:ss{{END_DATE}}: [[/Notes/{{TITLE}}.md]]
{{END_IF TITLE}}
{{IF TASK === undefined }}
{{IF TITLE === undefined }}
{{IF PEOPLE.0.NAME}}
- [[/People/{{PEOPLE.0.NAME}}.md]] 
{{END_IF PEOPLE.0.NAME}}
{{IF CONTENT}}
- {{DATE}}HH:mm:ss{{END_DATE}}: {{CONTENT}}
{{END_IF CONTENT}}
{{IF SOURCE.URL}}
- [{{SOURCE.TITLE}}]({{SOURCE.URL}}) 
{{END_IF SOURCE.URL}}
{{END_IF TASK}}
{{END_IF TITLE}}
{{END_NOTE}}

`;
//# sourceMappingURL=template.js.map