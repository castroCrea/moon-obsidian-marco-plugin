# Moon Jot Obsidian Integration Inspired by [Marco Serafini](mindstoneconsulting.net)

<span class="badge-npmversion"><a href="https://npmjs.org/package/@moonjot/moon-obsidian-marco-plugin" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@moonjot/moon-obsidian-marco-plugin.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/@moonjot/moon-obsidian-marco-plugin" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/@moonjot/moon-obsidian-marco-plugin.svg" alt="NPM downloads"/></a></span>

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

${PERSON.NAME} // the person captured names (TODO)
```

# TODO

- [ ] Handle Journaling path
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