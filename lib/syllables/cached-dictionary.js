'use babel'

import getSyllables from './dictionary'
import Cache from './persistent-cache'

function setIfDoesNotExist (cache, key, value) {
  const cached = cache.get(key)
  if (!cached) {
    cache.set(key, value)
  }
}

export default {
  cache: new Cache(),
  getSyllables (word) {
    const syllables = this.cache.get(word) || getSyllables(word)
    setIfDoesNotExist(this.cache, word, syllables)
    return syllables
  },
  clearCache () {
    this.cache = null
    this.cache = new Cache()
  }
}
