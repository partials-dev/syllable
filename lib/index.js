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
      const words = syllablePackage.getTerms()
      syllable.sort(words).then(sorted => {
        const sortedText = words.map(word => word.normal).join(', ').trim()
        syllablePackage.setText(sortedText)
      })
    },
    'syllable:group': () => {
      const words = syllablePackage.getTerms()
      syllable.group(words).then(syllableMap => {
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

  getTerms () {
    const editor = atom.workspace.getActiveTextEditor()
    const text = editor.getText()
    return nlp.text(text).terms()
  },

  setText (text) {
    const editor = atom.workspace.getActiveTextEditor()
    editor.setText(text)
  }
}

export default syllablePackage
