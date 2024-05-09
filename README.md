# Moon Jot Obsidian Integration Inspired by [Marco Serafini](mindstoneconsulting.net)

<span class="badge-npmversion"><a href="https://npmjs.org/package/@moonjot/moon-obsidian-marco-plugin" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@moonjot/moon-obsidian-marco-plugin.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/@moonjot/moon-obsidian-marco-plugin" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/@moonjot/moon-obsidian-marco-plugin.svg" alt="NPM downloads"/></a></span>

# Installation

1. Select your vault.
2. Choose an empty file that will serve as your template setup.
3. Use the following markdown template as a starter.

```md
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
- {{CONTENT}} [{{SOURCE.TITLE}}]({{SOURCE.URL}}) {{IF PEOPLE.0.NAME}}[[/People/{{PEOPLE.0.NAME}}.md]]{{END_IF PEOPLE.0.NAME}}
{{END_NOTE}}
```

## Explanation

`{{START_NOTE}}` and `{{END_NOTE}}` will define a note entity, encompassing everything that is placed inside. For a note to be created, there must be a pre-defined path within the `{{START_NOTE}}` and `{{END_NOTE}}`. To define this path, it can be inserted between `{{PATH}}` and `{{END_PATH}}`.

Example:
```md
{{START_NOTE}}
{{PATH}}/Note/title.md{{END_PATH}}
The following text has been capture with Moon Jot : {{CONTENT}}
{{END_NOTE}}
```

`{{CONTENT}` is the content of the Moon Jot Launcher at the moment you save it.

For more options, check the concept right afterwards.

# Concept

You can create a template in Obsidian that allows you to formulate your own note format, based on the data we have gathered with Moon Jot.

# List of the data and anchor for template

## Must have

### Create a note

All that is embedded inside will be checked out as a note to be created.
```
{{START_NOTE}}{{END_NOTE}}
```

### Add a path to your note
You must add a path to the `{{START_NOTE}}`; otherwise, your note will not be created.
```
{{PATH}}{{END_PATH}}
```

example:
```
{{PATH}}
{{IF TITLE}}/Notes/{{TITLE}}.md{{END_IF TITLE}}
{{IF SOURCE.TITLE}}/Notes/{{SOURCE. TITLE}}.md{{END_IF SOURCE.TITLE}}
/Notes/ideas.md
{{END_PATH}}
```
If you do that, it will check the first one. If it's not good, it will take the second one. 
If the second one isn't good either, it will take the last one. 
If the path is empty at the end, it will not create the note.

## Condition

### Is defined

You can insert content based on a condition.
Currently, the condition only checks if something exists or does not exist.
```
{{IF ...}}Write something{{END_IF ...}}

// Example:
{{PATH}}
{{IF TITLE}}{{TITLE}}.md{{END_IF TITLE}}
{{END_PATH}}
```

### You can also do some condition with equality

#### === undefined
```
{{IF SOURCE.RANDOM === undefined}}content{{END_IF SOURCE.RANDOM}}
```

#### === some text
```
{{IF SOURCE.TEXT === some text}}content{{END_IF SOURCE.TEXT}}
```

#### !== some text
```
{{IF SOURCE.TEXT !== some text}}content{{END_IF SOURCE.TEXT}}{{IF SOURCE.TEXT !== some text hey }}content different{{END_IF SOURCE.TEXT}}
```

#### .includes(something)
```
{{IF SOURCE.TEXT.includes(some t)}}content{{END_IF SOURCE.TEXT}}{{IF SOURCE.TEXT.includes(some text hey) }}content different{{END_IF SOURCE.TEXT}}
```

## Date

You can format the date as YYYY-MM-DD HH:mm:ss.
```
{{DATE}}YYYY-MM-DD{{END_DATE}}
{{DATE}}HH:mm{{END_DATE}}

// Example:
{{PATH}}/Journal/{{DATE}}YYYY-MM-DD{{END_DATE}}.md{{END_PATH}}
```

## Property

There are many properties that you can use.

### Basic for all devices

```
{{CONTENT}} // What you wrote in the text editor.
{{TITLE}}   // You add the title in the text editor on the first line with # Some title.
``` 

### From the context 

```
{{SOURCE.DESCRIPTION}} // The source description.

{{PEOPLE.0.NAME}} // The person captured names
{{PEOPLE.1.NAME}} // The person captured names
```

# TODO
r
- [x] Handle Journaling path
- [x] Make condition with "===" to embed note creation by type of source
- [x] Add default template that user can import to start
- [x] Add a Link to the docs
- [x] handle task creation if Text editor start with `- [ ]`
- [x] Fix `Error: Obsidian Marco => EISDIR: illegal operation on a directory, read` 
    ```
    {{PATH}}/Notes/{{IF TITLE}} {{TITLE}}.md{{END_IF TITLE}}{{END_PATH}} 
    // gives
    /Notes/.md
    ```

# Idea of improvement

- [ ] Handle person context in loops
- [ ] Use template from another file like `{{IF SOURCE.TYPE === 'tweet'}{{TEMPLATE='tweet_template.md'}{END_IF SOURCE.TYPE}`
- [ ] Make journal Path anchor `.obsidian/daily-notes.json` => `folder` (check if really worth it)

# Develop on Moon


Moon Jot is based on a plugin system that makes it easy to develop your own integrations and workflows.

Check the doc here (https://github.com/castroCrea/moon/blob/main/doc/Plugin_Development.md)[https://github.com/castroCrea/moon/blob/main/doc/Plugin_Development.md]


## Installation

```bash
yarn
```

## Build before publishing

```bash
yarn build
```

## For dev mode run 

```bash
yarn watch
```

## Publishing

First remove current git origin
```bash
git remote remove origin
```

Add you repo origin and change also **credential** iin `package.json`

Then
```bash
yarn pub
```