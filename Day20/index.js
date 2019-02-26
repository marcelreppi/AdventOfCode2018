const fs = require('fs')

let regex = fs.readFileSync('input.txt', 'utf8')
regex = regex.substring(1, regex.length-1)

const size = 5000
const grid = Array(size).fill({ sign: '#' }).map( () => Array(size).fill({ sign: '#' }) )

let x = size/2
let y = size/2

let minX = x
let maxX = x
let minY = y
let maxY = y

grid[y][x] = { sign: 'X' }

const deltas = {
  'N': [0, -1],
  'E': [1, 0],
  'S': [0, 1],
  'W': [-1, 0],
}

const doorSigns = {
  'N': '-',
  'E': '|',
  'S': '-',
  'W': '|',
}

const distances = {}

const checkpoints = []
let dist = 0
let maxDist = 0
for (let i = 0; i < regex.length; i++) {
  const dir = regex[i];

  if (dir == '(') {
    checkpoints.push({ i, x, y, dist })
  } else if (dir == '|') {
    const lastCheckpoint = checkpoints[checkpoints.length-1]
    x = lastCheckpoint.x
    y = lastCheckpoint.y
    dist = lastCheckpoint.dist
  } else if (dir == ')') {
    checkpoints.pop()
  } else {
    dist++
    const [dx, dy] = deltas[dir]
    x += dx
    y += dy
    grid[y][x] = { sign: doorSigns[dir] }
    x += dx
    y += dy
    grid[y][x] = { sign: '.' }
  }

  if (distances[`${x},${y}`]) {
    distances[`${x},${y}`] = Math.min(distances[`${x},${y}`], dist) 
  } else {
    distances[`${x},${y}`] = dist
  }

  if (distances[`${x},${y}`] > maxDist) maxDist = distances[`${x},${y}`]

  if (x > maxX) maxX = x
  else if (x < minX) minX = x

  if (y > maxY) maxY = y
  else if (y < minY) minY = y
}

// drawGrid()
console.log(maxDist)

console.log(Object.values(distances).filter( x => x > 999 ).length)


function drawGrid() {
  let s = ''
  for (let y = minY-1; y < maxY+2; y++) {
    for (let x = minX-1; x < maxX+2; x++) {
      s += grid[y][x].sign
    }
    s += '\n'
  }
  console.log(s)
}