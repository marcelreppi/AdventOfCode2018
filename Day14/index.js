const DoubleEndedQueue = require('../helpers/DEQ.js')

const DEQ = new DoubleEndedQueue(true)

let recipies = '37'
const elves = []

for (let i = 0; i < recipies.length; i++) {
  const score = recipies[i];
  const node = DEQ.push(parseFloat(score))
  elves.push({ recipe: node })
}

function part1(input) {
  let result = ''

  while (DEQ.length < input + 10) {
    // Sum up the scores
    let sum = elves.reduce( (sum, e) => sum + e.recipe.value, 0)
  
    // Add new recipies to the queue (list of recipies)
    recipies += sum
    sum = String(sum)
    for (let i = 0; i < sum.length; i++) {
      DEQ.push(parseFloat(sum[i]));
  
      if (DEQ.length > input) {
        result += sum[i]
      }
    }
  
    // Update each elfs recipe
    for (let e = 0; e < elves.length; e++) {
      const elf = elves[e];
      for (let i = 0, score = elf.recipe.value + 1; i < score; i++) {
        elf.recipe = elf.recipe.next
      }
    }
  }
  console.log(result)
}

function part2(input) {
  let recipeCounter = recipies.length
  let temp = ''
  let found = false

  while (true) {
    // Sum up the scores
    let sum = elves.reduce( (sum, e) => sum + e.recipe.value, 0)
  
    // Add new recipies to the queue (list of recipies)
    sum = String(sum)
    for (let i = 0; i < sum.length; i++) {
      DEQ.push(parseFloat(sum[i]));
      recipeCounter++

      temp += sum[i]
      if (String(input).substring(0, temp.length) === temp) {
        // console.log('They match by length ' + temp.length)
        if (temp.length === String(input).length) {
          found = true
          console.log(recipeCounter - temp.length)
          console.log('Found it!!!')
          break
        }
      } else {
        // console.log(`Dammit... ${temp} does not match anymore...`)
        temp = temp.substring(1)
      }
    }
  
    // Update each elfs recipe
    for (let e = 0; e < elves.length; e++) {
      const elf = elves[e];
      for (let i = 0, score = elf.recipe.value + 1; i < score; i++) {
        elf.recipe = elf.recipe.next
      }
    }

    
    if (found) {
      break
    }
  }
}

// part1(846601)
part2('846601')
  



