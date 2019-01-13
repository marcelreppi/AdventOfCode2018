const fs = require('fs')

let instructions = fs.readFileSync('instructions.txt', 'utf8')

instructions = instructions
  .split('\n')
  .map( i => {
    return [
      i.substring(5,6),
      i.substring(36,37)
    ]
  })

const allSteps = []
const prerequisites = {}

for (let i = 0; i < instructions.length; i++) {
  const inst = instructions[i]
  if (prerequisites[inst[1]]) {
    prerequisites[inst[1]].push(inst[0])
  } else {
    prerequisites[inst[1]] = [inst[0]]
  }

  if (!allSteps.includes(inst[0])) {
    allSteps.push(inst[0])
  }
  if (!allSteps.includes(inst[1])) {
    allSteps.push(inst[1])
  }
}

function lexographicPush(queue, x) {
  const c = x.charCodeAt(0)
  const i = queue.findIndex( e => e.charCodeAt(0) > c)
  if (i == -1) {
    queue.push(x)
  } else {
    queue.splice(i, 0, x)
  }
}

const workers = []
const n = 5

for (let i = 0; i < n; i++) {
  workers.push({
    currentStep: '',
    t: 0
  })
}

let seconds = 0

const queue = []

// add all steps without prerequisites to queue
Object.values(prerequisites).forEach( preSteps => {
  preSteps.forEach( step => {
    if (!Object.keys(prerequisites).includes(step)) {
      if (!queue.includes(step)) {
        lexographicPush(queue, step)
      }
    } 
  })
})

const result = []

while (allSteps.length !== 0) {
  const freeWorkers = workers.filter( w => w.t == 0).length
  const nextSteps = queue.splice(0, freeWorkers)
  nextSteps.forEach( s => {
    const freeWorker = workers.findIndex( w => w.t == 0 )
    workers[freeWorker].currentStep = s
    workers[freeWorker].t = 60 + s.charCodeAt(0) - 64
  })

  seconds++

  workers.forEach( w => {
    if (w.t > 0) {
      w.t--
      if (w.t == 0) {
        result.push(w.currentStep)
        allSteps.pop()

        // update prerequisites storage
        Object.entries(prerequisites).forEach( ([step, preSteps]) => {
          const i = preSteps.indexOf(w.currentStep)
          if (i !== -1) {
            // remove the added step from every prerequisites array that contains it
            preSteps.splice(i,1)
            if (preSteps.length == 0) {
              // if we now have steps without prerequisites we add them to the queue in alphabetic order
              lexographicPush(queue, step)
              delete prerequisites[step]
            }
          }
        })
      }
    }
  })
}

console.log(result.join(''))
console.log(seconds)


