const fs = require('fs')

const instructions = fs.readFileSync('input.txt', 'utf8').split('\r\n')

const ipInstruction = instructions.shift()
const ipRegisterIndex = parseFloat(ipInstruction.substring(ipInstruction.length-2))

const registers = Array.from('0'.repeat(6)).map(parseFloat)

const operations = [addr, addi, mulr, muli, banr, bani, borr, bori, setr, seti, gtir, gtri, gtrr, eqir, eqri, eqrr]

while (true) {

  const nextInstruction = instructions[registers[ipRegisterIndex]]
  if (nextInstruction == undefined) {
    break
  }

  // console.log(registers[ipRegisterIndex], nextInstruction, registers)
  const [opcode, ...input] = nextInstruction.split(' ')
  const op = operations.find( op => op.name === opcode)
  
  op(registers, input.map(parseFloat))

  registers[ipRegisterIndex]++
}

console.log(registers)

// Part 2

// After very very long detailed inspection of opcode operations
// I figured out that the program sums up all integers which
// divide a target number (10551381) with a remainder of 0
let sum = 0
const target = 10551381
for (let i = 0; i < 10551381 + 1; i++) {
  if (target % i == 0) {
    sum+=i
  }
}
console.log(sum)


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