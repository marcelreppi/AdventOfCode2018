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

const t1 = Date.now()

// Part 1
// const sum = calculateSumString(20)

// Part 2
// The sum repetitively increases by 23 after generation 162
// Solution = sum + (50000000000 - 162) * 23
const sum = calculateSumString(162) + (50000000000 - 162) * 23

const r1 = Date.now()-t1
console.log(sum)
console.log('String runtime: ' + r1 + 'ms')

function calculateSumString(generations) {
  let previousSum = 0
  const padding = 3
  let currentState = initialState
  for (let g = 0; g < generations; g++) {
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

    // let sum = 0
    // for (let i = 0; i < currentState.length; i++) {
    //   if (currentState[i] === '#') {
    //     sum += i - padding*g
    //   }
    // }

    // console.log('Generation ' + g)
    // console.log('Current sum ' + sum)
    // console.log('Difference to previous sum ' + (sum - previousSum))

    // previousSum = sum
  }
  
  // console.log(currentState)
  
  let sum = 0
  for (let i = 0; i < currentState.length; i++) {
    if (currentState[i] === '#') {
      sum += i - padding*generations
    }
  }
  
  return sum
}


////////////////////////////// DEQ approach ///////////////////////////////


const t2 = Date.now()

// Part 1
// const sumDEQ = calculateSumDEQ(2000)

// Part 2
// The sum repetitively increases by 23 after generation 162
// Solution = sum + (50000000000 - 162) * 23
const sumDEQ = calculateSumDEQ(162) + (50000000000 - 162) * 23

const r2 = Date.now()-t2
console.log(sumDEQ)
console.log('DEQ runtime: ' + r2 + 'ms')

function calculateSumDEQ(generations) {
  const DEQ = new DoubleEndedQueue(false)

  for (let i = 0; i < initialState.length; i++) {
    const pot = initialState[i];
    DEQ.push({
      content: pot,
      index: i
    })
  }

  const padding = 3
  let previousSum = 0
  for (let i = 0; i < generations; i++) {
    // add 5 empty pots to beginning of DEQ
    for (let i = 0; i < padding; i++) {
      const index = DEQ.first.value.index - 1
      DEQ.unshift({
        content: '.',
        index
      })
    }

    // add 5 empty pots to end of DEQ
    for (let i = 0; i < padding; i++) {
      const index = DEQ.last.value.index + 1
      DEQ.push({
        content: '.',
        index
      })
    } 
    
    const modifications = []
    for (let r = 0; r < rules.length; r++) {
      const rule = rules[r];
      
      for (let j = 0; j < DEQ.length - 2; j++) {
        const currentPot = DEQ.first.next.next
        let temp = ''

        temp += currentPot.pre.pre.value.content
        temp += currentPot.pre.value.content
        temp += currentPot.value.content
        temp += currentPot.next.value.content
        temp += currentPot.next.next.value.content

        if (temp === rule.predicate) {
          modifications.push({ index: currentPot.value.index, mod: rule.result })
        }
        
        DEQ.rotate(-1)
      }
      DEQ.rotate(-2) // get queue back to original order after every rule
    }

    for (let j = 0; j < DEQ.length; j++) {
      const m = modifications.find( m => m.index === DEQ.first.value.index )
      if (m) {
        DEQ.first.value.content = m.mod
      }
      DEQ.rotate(-1)
    }

    // let sum = 0
    // for (let i = 0; i < DEQ.length; i++) {
    //   if (DEQ.first.value.content === '#') {
    //     sum += DEQ.first.value.index
    //   }
    //   DEQ.rotate(-1)
    // }

    // console.log('Generation ' + i)
    // console.log('Current sum ' + sum)
    // console.log('Difference to previous sum ' + (sum - previousSum))

    // previousSum = sum
  }

  let sum = 0
  for (let i = 0; i < DEQ.length; i++) {
    if (DEQ.first.value.content === '#') {
      sum += DEQ.first.value.index
    }
    DEQ.rotate(-1)
  }

  return sum
}