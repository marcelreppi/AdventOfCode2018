const fs = require('fs')

let idList = fs.readFileSync('ids.txt', 'utf8')
idList = idList.split('\n')

let correctBoxes
let commonLetters
let removedIndex

let found = false

const idLength = idList[0].length
for (let i = 0; i < idLength; i++) {
  const moddedList = idList.map( id => id.substring(0,i) + id.substring(i+1))

  const frequencyCounter = {}
  for (let j = 0; j < moddedList.length; j++) {
    const id = moddedList[j]

    if (frequencyCounter[id]) {
      // found a duplicate
      frequencyCounter[id].push(idList[j]) 
      correctBoxes = frequencyCounter[id]
      commonLetters = id
      removedIndex = i
      found = true
      break
    } else {
      frequencyCounter[id] = [idList[j]]
    }
  }

  if (found) break
}

console.log('Correct boxes: ' + correctBoxes)
console.log('Common letters: ' + commonLetters)
console.log('Removed index: ' + removedIndex)
