const fs = require('fs')

const input = fs.readFileSync('input1.txt', 'utf8').split('\r\n')

const logs = []

for (let i = 0; i < input.length; i++) {
  const e1 = input[i];
  const e2 = input[i+1];
  const e3 = input[i+2];
  
  const log = {}
  if (e1.startsWith('Before')) {
    log.before = e1.substring(9,19).split(', ').map(parseFloat)
    log.operation = e2.split(' ').map(parseFloat)
    log.after = e3.substring(9,19).split(', ').map(parseFloat)
    logs.push(log)
    i += 3
  }
}

const operations = [addr, addi, mulr, muli, banr, bani, borr, bori, setr, seti, gtir, gtri, gtrr, eqir, eqri, eqrr]

const samples = []

for (let i = 0; i < logs.length; i++) {
  const log = logs[i];
  const possibleOps = []
  for (let j = 0; j < operations.length; j++) {
    const op = operations[j];
    const before = [...log.before]

    // Apply operation
    op(before, log.operation.slice(1))

    // Check if all values from before and after are now equal
    let equal = true
    for (let k = 0; k < before.length; k++) {
      if (before[k] != log.after[k]) {
        equal = false
      }
    }

    // If they are equal, add operation to the list of all possible operations
    if (equal) {
      possibleOps.push(op)
    }
  }

  log.possibleOps = possibleOps
  samples.push(log)

}

console.log(samples.filter( l => l.possibleOps.length >= 3).length)

const opcodes = {}
const possibilities = samples.map( l => [l.operation[0], l.possibleOps] )

while(Object.keys(opcodes).length !== 16) {
  const [n, ops] = possibilities.find( l => l[1].length == 1 )
  opcodes[n] = ops[0]
  
  possibilities.forEach( l => {
    if (l[1].length == 0) {
      return
    }

    const i = l[1].findIndex( op => op == ops[0])
    if (i !== -1) {
      l[1].splice(i, 1)
    }
  })
}

console.log(opcodes)

let testProgram = fs.readFileSync('input2.txt', 'utf8')
testProgram = testProgram
  .split('\r\n')
  .map( x => x.split(' ').map(parseFloat))

const registers = [0, 0, 0]

for (let i = 0; i < testProgram.length; i++) {
  const instruction = testProgram[i];
  opcodes[instruction[0]](registers, instruction.slice(1))
}

console.log(registers)


function addr(registers, input) {
  registers[input[2]] = registers[input[0]] + registers[input[1]]
}

function addi(registers, input) {
  registers[input[2]] = registers[input[0]] + input[1]
}

function mulr(registers, input) {
  registers[input[2]] = registers[input[0]] * registers[input[1]]
}

function muli(registers, input) {
  registers[input[2]] = registers[input[0]] * input[1]
}

function banr(registers, input) {
  registers[input[2]] = registers[input[0]] & registers[input[1]]
}

function bani(registers, input) {
  registers[input[2]] = registers[input[0]] & input[1]
}

function borr(registers, input) {
  registers[input[2]] = registers[input[0]] | registers[input[1]]
}

function bori(registers, input) {
  registers[input[2]] = registers[input[0]] | input[1]
}

function setr(registers, input) {
  registers[input[2]] = registers[input[0]]
}

function seti(registers, input) {
  registers[input[2]] = input[0]
}

function gtir(registers, input) {
  if (input[0] > registers[input[1]]) {
    registers[input[2]] = 1
  } else {
    registers[input[2]] = 0
  }
}

function gtri(registers, input) {
  if (registers[input[0]] > input[1]) {
    registers[input[2]] = 1
  } else {
    registers[input[2]] = 0
  }
}

function gtrr(registers, input) {
  if (registers[input[0]] > registers[input[1]]) {
    registers[input[2]] = 1
  } else {
    registers[input[2]] = 0
  }
}

function eqir(registers, input) {
  if (input[0] == registers[input[1]]) {
    registers[input[2]] = 1
  } else {
    registers[input[2]] = 0
  }
}

function eqri(registers, input) {
  if (registers[input[0]] == input[1]) {
    registers[input[2]] = 1
  } else {
    registers[input[2]] = 0
  }
}

function eqrr(registers, input) {
  if (registers[input[0]] == registers[input[1]]) {
    registers[input[2]] = 1
  } else {
    registers[input[2]] = 0
  }
}
