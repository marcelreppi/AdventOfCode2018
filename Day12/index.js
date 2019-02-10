const fs = require('fs')
const DoubleEndedQueue = require('../helpers/DEQ.js')

const initialState = '##..#.#.#..##..#..##..##..#.#....#.....##.#########...#.#..#..#....#.###.###....#..........###.#.#..'

let rules = fs.readFileSync('rules.txt', 'utf8')

rules = rules.split('\r\n').map( r => {
  const rule = {}
  rule.predicate = r.substring(0,5)
  rule.result = r.substring(r.length-1)
  return rule
})

const DEQ = new DoubleEndedQueue()

for (let i = 0; i < initialState.length; i++) {
  const pot = initialState[i];
  DEQ.push({
    containsPlant: pot === '#',
    index: i
  })
}

// add 5 empty pots to beginning of DEQ
for (let i = 0; i < 5; i++) {
  const index = DEQ.first.value.index - 1
  DEQ.unshift({
    containsPlant: false,
    index
  })
}

// add 5 empty pots to end of DEQ
for (let i = 0; i < 5; i++) {
  const index = DEQ.last.value.index + 1
  DEQ.push({
    containsPlant: false,
    index
  })
}

// console.log(DEQ.first)
// console.log(DEQ.last)
// console.log(DEQ.length)


const generations = 50000000000
const padding = 50
let currentState = initialState
for (let i = 0; i < generations; i++) {
  currentState = '.'.repeat(padding) + currentState + '.'.repeat(padding)
  const modifications = []
  for (let r = 0; r < rules.length; r++) {
    const rule = rules[r];

    let ri = currentState.indexOf(rule.predicate)
    while (ri !== -1) {
      // console.log(rule.predicate, ri+2, rule.result)
      modifications.push({ index: ri + 2, mod: rule.result })
      ri = currentState.indexOf(rule.predicate, ri + 1)
    }
  }

  modifications.forEach( m => {
    currentState = currentState.substring(0, m.index) + m.mod + currentState.substring(m.index + 1)
  })
}

// console.log(currentState)

let sum = 0
for (let i = 0; i < currentState.length; i++) {
  if (currentState[i] === '#') {
    sum += i - padding*generations
  }
}

console.log(sum)