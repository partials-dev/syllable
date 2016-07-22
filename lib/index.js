'use babel'

import { CompositeDisposable } from 'atom'
import syllable from './syllables'
import nlp from 'nlp_compromise'

const syllablePackage = {
  subscriptions: null,
  target: 'atom-workspace',
  commands: {
    'syllable:clear-cache': () => {
      syllable.clearCache()
    },
    'syllable:sort': () => {
      const text = syllablePackage.getText()
      syllable.sort(text).then(sortedWords => {
        const sortedText = sortedWords.join(', ').trim()
        syllablePackage.setText(sortedText)
      })
    },
    'syllable:group': () => {
      const text = syllablePackage.getText()
      syllable.group(text).then(syllableMap => {
        const groupedText = syllableMap.toString()
        syllablePackage.setText(groupedText)
      })
    }
  },

  activate (state) {
    if (!state) state = {}
    syllable.activate(state.syllable)
    this.subscriptions = new CompositeDisposable()
    const commandsSubscription = atom.commands.add(this.target, this.commands)
    this.subscriptions.add(commandsSubscription)
  },

  deactivate () {
    this.subscriptions.dispose()
  },

  serialize () {
    return {
      syllable: syllable.serialize()
    }
  },

  getText () {
    const editor = atom.workspace.getActiveTextEditor()
    return editor.getText()
  },

  setText (text) {
    const editor = atom.workspace.getActiveTextEditor()
    editor.setText(text)
  }
}

export default syllablePackage
