const fs = require('fs');
 
let numbers = fs.readFileSync('numbers.txt', 'utf8');
numbers = numbers.split('\n')

const frequencyCounter = {}

let result = 0
let i = 0
let step = 0
while (true) {
  step++
  const sign = numbers[i].substring(0,1)
  const number = numbers[i].substring(1)
  const oldResult = result
  switch (sign) {
    case '+':
      result += parseInt(number)
      break
    case '-':
      result -= parseInt(number)
      break
  }
  console.log(oldResult + ' ' + sign + ' ' + number + ' = ' + result)

  if (frequencyCounter[result] == undefined) {
    frequencyCounter[result] = [step]
  } else {
    frequencyCounter[result].push(step)
    console.log('Repetion on result: ' + result)
    console.log(result + ' has been seen on step ' + frequencyCounter[result][0] + ' and ' + frequencyCounter[result][1])
    break
  }
  

  if (i == numbers.length - 1) {
    i = 0
  } else {
    i++
  }
  
}

console.log(result)

