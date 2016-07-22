'use babel'

import syllables from './syllables-async-plugin'
import SyllableMap from './syllable-map'
import nlp from 'nlp_compromise'
nlp.plugin(syllables)

function compareSyllables (a, b) {
  if (a.syllables.length < b.syllables.length) return -1
  if (a.syllables.length > b.syllables.length) return 1
  return 0
}

export default {
  activate (state) {
    if (!state) state = {}
    nlp.syllables.setCacheEntries(state.syllables)
  },
  sort (text) {
    return nlp.text(text).termsWithSyllables().then(termsWithSyllables => {
      const sortedTerms = termsWithSyllables.sort(compareSyllables)
      return sortedTerms.map(t => t.normal)
    })
  },
  group (text) {
    return nlp.text(text).termsWithSyllables().then(terms => new SyllableMap(terms))
  },
  clearCache () {
    nlp.syllables.clearCache()
  },
  serialize () {
    return {
      syllables: nlp.syllables.serializeCache()
    }
  },
  deactivate () {
  }
}
