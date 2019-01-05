const fs = require('fs')

const polymer = fs.readFileSync('polymer.txt', 'utf8')

// Recursion ran into stack overflow problem
function reactRecursion(polymer, index) {
  if (index == polymer.length - 1) {
    return polymer
  }

  const unit = polymer.substring(index, index + 2)
  // console.log(unit)
  const c1 = unit[0].charCodeAt(0)
  const c2 = unit[1].charCodeAt(0)

  if (c1 + 32 == c2 || c1 - 32 == c2) {
    polymer = polymer.slice(0, index) + polymer.slice(index + 2)
    // console.log('Boom')
    // console.log(polymer)
    const nextIndex = index - 1 < 0 ? 0 : index - 1
    return reactRecursion(polymer, nextIndex)
  } 
  // console.log(polymer)
  return reactRecursion(polymer, index + 1)
}

function react(polymer) {
  let i = 0
  while (i < polymer.length - 1) {

    const unit = polymer.substring(i, i + 2)
    const c1 = unit[0].charCodeAt(0)
    const c2 = unit[1].charCodeAt(0)

    if (c1 + 32 == c2 || c1 - 32 == c2) {
      polymer = polymer.slice(0, i) + polymer.slice(i + 2)
      // console.log('Boom')
      // console.log(polymer)
      i = i - 1 < 0 ? 0 : i - 1
      continue
    }
    // console.log(polymer)
    i++
  }
  return polymer
}

// const remains = react(polymer)
// console.log(remains.length)

/////////// Part 2 ///////////

function optimalReact(polymer) {
  let bestPolymer = polymer
  let removedChars

  const originalPolymer = polymer

  for (let r1 = 65; r1 < 65 + 26; r1++) {
    const r2 = r1 + 32
    console.log('Removing ' + String.fromCharCode(r1, r2))

    let i = 0
    while (i < polymer.length - 1) {

      const unit = polymer.substring(i, i + 2)
      const c1 = unit[0].charCodeAt(0)
      const c2 = unit[1].charCodeAt(0)

      if (c1 == r1 || c1 == r2) {
        // Remove chars while iterating through string
        polymer = polymer.slice(0, i) + polymer.slice(i + 1)
        i = i - 1 < 0 ? 0 : i - 1
        continue
      }

      if (c1 + 32 == c2 || c1 - 32 == c2) {
        polymer = polymer.slice(0, i) + polymer.slice(i + 2)
        i = i - 1 < 0 ? 0 : i - 1
        continue
      }
      i++
    }

    // Check if last char should be removed
    const lastChar = polymer[polymer.length - 1].charCodeAt(0)
    if (lastChar == r1 || lastChar == r2) {
      polymer = polymer.slice(0, polymer.length - 1)
    }

    if (polymer.length < bestPolymer.length) {
      bestPolymer = polymer
      removedChars = String.fromCharCode(r1, r2)
      console.log('New best length: ' + bestPolymer.length)
    }

    polymer = originalPolymer
  }

  return [bestPolymer, removedChars]
}

const [bestPolymer, removedChars] = optimalReact(polymer)
console.log('Best polymer length: ' + bestPolymer.length)
console.log('Removed chars: ' + removedChars)

