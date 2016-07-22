'use babel'

import syllables from './syllables'
import SyllableMap from './syllable-map'

function compareSyllables (a, b) {
  if (a.syllables.length < b.syllables.length) return -1
  if (a.syllables.length > b.syllables.length) return 1
  return 0
}

export default {
  activate (state) {
    if (!state) state = {}
    syllables.activate(state.syllables)
  },
  sort (words) {
    return syllables.getSyllables(words).then(wordsWithSyllables => {
      const sortedWords = wordsWithSyllables.sort(compareSyllables)
      return sortedWords
    })
  },
  group (words) {
    return syllables.getSyllables(words).then(words => new SyllableMap(words))
  },
  clearCache () {
    syllables.clearCache()
  },
  serialize () {
    return {
      syllables: syllables.serialize()
    }
  },
  deactivate () {
  }
}
