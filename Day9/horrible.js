
const DoubleEndedQueue = require('./DEQ.js')

const deque = new DoubleEndedQueue()

require('./better.js')
return

const players = 439
// const lastMarble = 71307
const lastMarble = 7130700

// const players = 13
// const lastMarble = 7999

const scores = {}

const circle = [0]

let currentPlayer = 1
let currentMarble = 1
let currentIndex = 0

while(currentMarble < lastMarble + 1) {

  if (currentMarble % 10000 == 0) {
    console.log(lastMarble - currentMarble)
  }

  if (currentMarble % 23 == 0) {
    let removeIndex = currentIndex - 7
    
    if (removeIndex < 0) {
      removeIndex = circle.length - Math.abs(removeIndex)
    }

    const removedMarble = circle.splice(removeIndex, 1)[0]

    if (scores[currentPlayer]) {
      scores[currentPlayer] += currentMarble + removedMarble
    } else {
      scores[currentPlayer] = currentMarble + removedMarble
    }

    currentIndex = removeIndex
  } else {
    let insertionIndex = currentIndex + 2
    if (insertionIndex > circle.length) {
      insertionIndex = 1
    }

    currentIndex = insertionIndex
    circle.splice(insertionIndex, 0, currentMarble)
  }

  currentMarble++
  currentPlayer = currentPlayer == players ? 1 : currentPlayer + 1
  
}

const highscore = Math.max(...Object.values(scores))
console.log(highscore)

