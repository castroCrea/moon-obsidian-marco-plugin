export const DEFAULT_TEMPLATE =
`
# NOTE WITH TITLE

{{START_NOTE}}
{{PATH}}
{{IF TITLE}}/Notes/{{TITLE}}.md {{END_IF TITLE}}
{{END_PATH}}
---
{{IF SOURCE.DESCRIPTION}} description: 
{{IF SOURCE.published}} {{SOURCE.published}} - {{END_IF SOURCE.published}}
{{IF SOURCE.TIMESTAMP.0}} [{{SOURCE.TIMESTAMP.0.timestamp}}]({{SOURCE.TIMESTAMP.0.URL}} {{END_IF SOURCE.TIMESTAMP.0}})
{{SOURCE.DESCRIPTION}} 
{{END_IF SOURCE.DESCRIPTION}}
{{IF SOURCE.url}} Url: {{SOURCE.url}} {{END_IF SOURCE.url}}
{{IF PEOPLE.0.NAME}} author: 
- {{PEOPLE.0.NAME}} 
- {{IF PEOPLE.1.NAME}}{{PEOPLE.1.NAME}}{{END_IF PEOPLE.1.NAME}}
- {{IF PEOPLE.2.NAME}}{{PEOPLE.2.NAME}}{{END_IF PEOPLE.2.NAME}}
- {{IF PEOPLE.3.NAME}}{{PEOPLE.3.NAME}}{{END_IF PEOPLE.3.NAME}}
{{END_IF PEOPLE.0.NAME}}
{{IF SOURCE.TITLE}}Source: [[/Sources/{{SOURCE.TITLE}}.md]] {{END_IF SOURCE.TITLE}}
---
{{CONTENT}}

{{END_NOTE}}

# CLIP

{{START_NOTE}}
{{PATH}}
{{IF SOURCE.TEXT}}{{IF SOURCE.TITLE}}/Sources/{{SOURCE.TITLE}}.md {{END_IF SOURCE.TITLE}}{{END_IF SOURCE.TEXT}}
{{END_PATH}}
---
{{IF PEOPLE.0.NAME}} author : {{PEOPLE.0.NAME}} {{END_IF PEOPLE.0.NAME}}
---
{{IF PEOPLE.0.NAME}}[[/People/{{PEOPLE.0.NAME}}.md]]{{END_IF PEOPLE.0.NAME}}


{{IF SOURCE.TEXT}}
{{SOURCE.TEXT}}
{{END_IF SOURCE.TEXT}}

{{END_NOTE}}

# CLIP DM

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

# People

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

# JOURNAL

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
