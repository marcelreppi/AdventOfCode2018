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

const prerequisites = {}
for (let i = 0; i < instructions.length; i++) {
  const inst = instructions[i]
  if (prerequisites[inst[1]]) {
    prerequisites[inst[1]].push(inst[0])
  } else {
    prerequisites[inst[1]] = [inst[0]]
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

let result = []

while (queue.length != 0) {
  // add next element from queue to result
  const currentStep = queue.splice(0,1)[0]
  result.push(currentStep)

  // update prerequisites storage
  Object.entries(prerequisites).forEach( ([step, preSteps]) => {
    const i = preSteps.indexOf(currentStep)
    if (i != -1) {
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

console.log(result.join(''))


