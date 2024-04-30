# Moon Jot Obsidian Integration Inspired by [Marco Serafini](mindstoneconsulting.net)

<span class="badge-npmversion"><a href="https://npmjs.org/package/@moonjot/moon-obsidian-marco-plugin" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@moonjot/moon-obsidian-marco-plugin.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/@moonjot/moon-obsidian-marco-plugin" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/@moonjot/moon-obsidian-marco-plugin.svg" alt="NPM downloads"/></a></span>

# Installation

1. Choose your vault
2. Choose an empty file that will be your template set up.
3. Use the following md template as starter

```md
${START_NOTE}
${PATH}
${IF TITLE} ${TITLE}.md ${END_IF TITLE}
${END_PATH}
---
${IF SOURCE.DESCRIPTION} description: ${SOURCE.DESCRIPTION} ${END_IF SOURCE.DESCRIPTION}
${IF SOURCE.TIMESTAMP} description: Youtube video timestamps captured ${SOURCE.TIMESTAMP} ${END_IF SOURCE.TIMESTAMP}
${IF PEOPLE.0.NAME} author : ${PEOPLE.0.NAME} ${END_IF PEOPLE.0.NAME}
---

${CONTENT}

${IF SOURCE.TEXT}
# Clip
${SOURCE.TEXT}
${END_IF SOURCE.TEXT}
${END_NOTE}

${START_NOTE}
${PATH}/Journal/${DATE}YYYY-MM-DD${END_DATE}.md${END_PATH}
- ${CONTENT} [${SOURCE.TITLE}](${SOURCE.URL})
${END_NOTE}
```

## Explanation

`${START_NOTE}` and `${END_NOTE}` will be a note entity, all what will be inside a note.
In between the `${START_NOTE}` and `${END_NOTE}` you must have a path that is define in order for the note to be created.
To define a path you can add it between `${PATH}` and `${END_PATH}`.

Example:
```md
${START_NOTE}
${PATH}/Note/title.md${END_PATH}
The following text has been capture with Moon Jot : ${CONTENT}
${END_NOTE}
```

`${CONTENT}` is the content of the Moon jot Launcher at the moment you save.

For more option check concept right after

# Concept

You can map a template that allows you to create your own format of note in Obsidian, base on the data we gather with Moon Jot


# List of the data and anchor for template

## Must have

ALL that is embedded inside will be checked out as a note to be created
```
${START_NOTE}${END_NOTE}
```
You must add a path to the ${START_NOTE} otherwise your note will be not created
```
${PATH}${END_PATH}
```

## Condition

You can insert content with condition.
So far condition is only do exist or not exist
```
${IF ...}Write something${END_IF ...}

// example:
${PATH}
${IF TITLE}${TITLE}.md${END_IF TITLE}
${END_PATH}
```

## Date

you can format date like YYYY-MM-DD

```
${DATE}YYYY-MM-DD${END_DATE}

// example:
${PATH}/Journal/${DATE}YYYY-MM-DD${END_DATE}.md${END_PATH}
```

## Property

There is many properties that you can user

### Basic for all devices

```
${CONTENT} // what you wrote inside the text editor
${TITLE}   // the title you add in the text editor on the first line with `# Some title`
``` 

### From the context 

```
${SOURCE.DESCRIPTION} // the source description

${PEOPLE.0.NAME} // the person captured names (TODO)
${PEOPLE.1.NAME} // the person captured names (TODO)
```

# TODO

- [x] Handle Journaling path
- [ ] Make condition with "===" to embed note creation by type of source
- [ ] Handle person context
- [ ] Use template from another file like `${IF SOURCE.TYPE === 'tweet'}${TEMPLATE='tweet_template.md'}{END_IF SOURCE.TYPE}`
- [ ] Add default template that user can import to start
- [ ] Add a Link to the docs
- [ ] handle task creation if Text editor start with `- [ ]`


# Develop on Moon


Moon Jot is base on a plugin system that make easy to develop your own integration and workflows

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