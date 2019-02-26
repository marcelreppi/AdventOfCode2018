const fs = require('fs')

const instructions = fs.readFileSync('input.txt', 'utf8').split('\r\n')

const ipInstruction = instructions.shift()
const ipRegisterIndex = parseFloat(ipInstruction.substring(ipInstruction.length-2))

let registers = Array.from('0'.repeat(6)).map(parseFloat)

const operations = [addr, addi, mulr, muli, banr, bani, borr, bori, setr, seti, gtir, gtri, gtrr, eqir, eqri, eqrr]

const seenNumbers = []

while (true) {

  const nextInstruction = instructions[registers[ipRegisterIndex]]
  if (nextInstruction == undefined) {
    break
  }
  
  // Part 1
  // Register 0 is used only once for comparison with register 4 in operation 28
  // If register 0 is set to the value of register 4 when operation 28 is executed the first time
  // it leads to the quickest termination in the fewest steps

  // Part 2
  // For termination with the most steps we check when the number in register 4 repeats itself
  // The value for register 4 in the previous iteration would lead to termination in the most steps
  if (registers[ipRegisterIndex] == 28) {
    if (seenNumbers.includes(registers[4])) {
      console.log(seenNumbers[seenNumbers.length-1])
      break
    } else {
      seenNumbers.push(registers[4])
      console.log(seenNumbers.length)
      // console.log(registers[4])
      // break
    }
    
    
  }


  // console.log(registers[ipRegisterIndex], nextInstruction, registers)
  const [opcode, ...input] = nextInstruction.split(' ')
  const op = operations.find( op => op.name === opcode)
  
  op(registers, input.map(parseFloat))

  registers[ipRegisterIndex]++
}



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