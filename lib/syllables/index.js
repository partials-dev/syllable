'use babel'

import syllables from 'nlp-syllables-async'
import SyllableMap from './syllable-map'
import nlp from 'nlp_compromise'
nlp.plugin(syllables)

export default {
  activate (state) {
    if (!state) state = {}
    nlp.syllables.setCacheEntries(state.syllables)
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
