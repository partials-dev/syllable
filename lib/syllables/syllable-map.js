'use babel'

function syllables (n) {
  if (n > 1) return 'syllables'
  else return 'syllable'
}

function heading (numberOfSyllables) {
  var headingText = `${numberOfSyllables} ${syllables(numberOfSyllables)}`
  headingText += '\n----------'
  return headingText
}

function groupToString ([syllableNumber, words]) {
  var text = heading(syllableNumber)
  text += '\n'
  text += words.map(w => w.normal).join(', ').trim()
  return text
}

function compareGroups ([syllablesInA], [syllablesInB]) {
  if (syllablesInA > syllablesInB) return 1
  if (syllablesInA < syllablesInB) return -1
  return 0
}

export default class SyllableMap {
  constructor (words) {
    this.map = new Map()
    words.forEach(word => this.insert(word))
  }
  insert (word) {
    const syllables = word.syllables.length
    var words = this.get(syllables) || []
    words.push(word)
    this.set(syllables, words)
  }
  toString () {
    return this.sortedGroups().map(group => groupToString(group)).join('\n\n')
  }
  mostSyllables () {
    var mostSyllablesSoFar = 0
    for (var syllables of this.map.keys()) {
      if (syllables > mostSyllablesSoFar) mostSyllablesSoFar = syllables
    }
    return mostSyllablesSoFar
  }
  sortedGroups () {
    var groups = []
    for (var group of this.map.entries()) {
      groups.push(group)
    }
    return groups.sort(compareGroups)
  }
  get (...args) {
    return this.map.get(...args)
  }
  set (...args) {
    return this.map.set(...args)
  }
}
