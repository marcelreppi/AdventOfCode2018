const fs = require('fs')

let idList = fs.readFileSync('ids.txt', 'utf8')
idList = idList.split('\n')

let twoOfAnyLetter = 0
let threeOfAnyLetter = 0

for (let i = 0; i < idList.length; i++) {
  let id = idList[i]
  const frequencyCounter = {}
  for (let j = 0; j < id.length; j++) {
    const letter = id[j]
    if (frequencyCounter[letter]) {
      frequencyCounter[letter] += 1
    } else {
      frequencyCounter[letter] = 1
    }
  }

  const frequencies = Object.values(frequencyCounter)
  if (frequencies.includes(2)) {
    twoOfAnyLetter++
  }

  if (frequencies.includes(3)) {
    threeOfAnyLetter++
  }
}

const checksum = twoOfAnyLetter * threeOfAnyLetter

console.log('Checksum: ' + twoOfAnyLetter + ' * ' + threeOfAnyLetter + ' = ' + checksum)