const DoubleEndedQueue = require('./DEQ.js')

const players = 439
// const lastMarble = 71307
const lastMarble = 7130700

const scores = {}
let currentPlayer = 1

const deque = new DoubleEndedQueue()
deque.push(0)
for (let i = 1; i < lastMarble + 1; i++) {
  if (i % 23 == 0) {
    deque.rotate(7)
    if (scores[currentPlayer]) {
      scores[currentPlayer] += i + deque.pop()
    } else {
      scores[currentPlayer] = i + deque.pop()
    }
    deque.rotate(-1)
  } else {
    deque.rotate(-1)
    deque.push(i)
  }

  currentPlayer = currentPlayer == players ? 1 : currentPlayer + 1
}

const highscore = Math.max(...Object.values(scores))
console.log(highscore)