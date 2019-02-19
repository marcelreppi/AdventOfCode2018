const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')

const grid = []

input.split('\r\n').forEach( line => {
  grid.push(line.split(''))
})

const aLotOfMinutes = 1000000000
const minutes = 1000
for (let m = 1; m < minutes; m++) {
  const changes = []
  for (let y = 0; y < grid.length; y++) {
    const line = grid[y];
    for (let x = 0; x < line.length; x++) {
      const field = line[x];
      const adjacentContent = getAdjacentContent(x, y)
      if (field == '.') {
        const nTrees = adjacentContent.filter( x => x == '|').length
        if (nTrees >= 3) {
          changes.push({ x, y, newContent: '|'})
        }
      } else if (field == '|') {
        const nLumberyard = adjacentContent.filter( x => x == '#').length
        if (nLumberyard >= 3) {
          changes.push({ x, y, newContent: '#'})
        }
      } else if (field == '#') {
        if (!(adjacentContent.includes('#') && adjacentContent.includes('|'))) {
          changes.push({ x, y, newContent: '.'})
        }
      }
    }
  }

  for (let change of changes) {
    grid[change.y][change.x] = change.newContent
  }

  if (m == 10) {
    sumUpTreesAndLumberyard()
  }

  // After a while there is a cycle of 28 steps
  if (m > 500 && (aLotOfMinutes-m) % 28 == 0) {
    sumUpTreesAndLumberyard()
    break
  }

}

function getAdjacentContent(x, y) {
  const content = []

  for (let i = y-1; i < y+2; i++) {
    for (let j = x-1; j < x+2; j++) {
      if (i < 0 || j < 0 || i > grid.length-1 || j > grid[0].length-1 || (i == y && j == x) ) {
        continue
      }  
      content.push(grid[i][j])
    }
  }
  return content
}

function drawGrid() {
  let s = ''
  for (let y = 0; y < grid.length; y++) {
    const line = grid[y];
    for (let x = 0; x < line.length; x++) {
      s += line[x]
    }
    s += '\n'
  }
  console.log(s)
}

function sumUpTreesAndLumberyard() {
  let nTrees = 0
  let nLumberyard = 0
  
  for (let y = 0; y < grid.length; y++) {
    const line = grid[y];
    for (let x = 0; x < line.length; x++) {
      const field = line[x];
      if (field == '|') nTrees++
      else if (field == '#') nLumberyard++
    }
  }
  console.log(`${nTrees} * ${nLumberyard} = ${nTrees*nLumberyard}`)
}

