'use babel'

import dictionary from './cached-dictionary'
import _ from 'lodash'

function getType (text) {
  if (Array.isArray(text)) return 'array'
  else if (text.normal.indexOf(' ') > -1) return 'phrase'
  else return 'word'
}

function splitPhrase (phrase) {
  return phrase.normal.split(' ').map(w => {
    return { normal: w }
  })
}

export default {
  activate () {

  },
  getSyllables (text) {
    switch (getType(text)) {
      case 'array': return this.getSyllablesForArray(text)
      case 'phrase': return this.getSyllablesForPhrase(text)
      case 'word': return this.getSyllablesForWord(text)
    }
  },
  getSyllablesForArray (array) {
    const syllablePromises = array.map(word => this.getSyllables(word))
    return Promise.all(syllablePromises)
  },
  getSyllablesForWord (word) {
    return dictionary.getSyllables(word.normal).then(syllables => {
      word.syllables = syllables
      return word
    })
  },
  getSyllablesForPhrase (phrase) {
    const array = splitPhrase(phrase)
    return this.getSyllables(array).then(words => {
      phrase.syllables = _(words).map('syllables').flatten().value()
      return phrase
    })
  },
  clearCache () {
    dictionary.clearCache()
  },
  serialize () {

  }
}
