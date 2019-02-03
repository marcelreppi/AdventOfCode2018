const fs = require('fs');
 
let numbers = fs.readFileSync('numbers.txt', 'utf8');
numbers = numbers.split('\n')

let result = 0
for (let i = 0; i < numbers.length; i++) {
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
}

console.log(result)

