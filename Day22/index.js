const depth = 7305    
const targetX = 13
const targetY = 734

// const depth = 510
// const targetX = 10
// const targetY = 10

const grid = []

let riskLevel = 0
for (let y = 0; y < targetY+1; y++) {
  const line = []
  for (let x = 0; x < targetX+1; x++) {
    const p = { x, y }
    if (x == 0 && y == 0) p.geologicIndex = 0
    else if (x == targetX && y == targetY) p.geologicIndex = 0
    else if (y == 0) p.geologicIndex = x*16807
    else if (x == 0) p.geologicIndex = y*48271
    else p.geologicIndex = line[line.length-1].erosionLevel * grid[y-1][x].erosionLevel

    p.erosionLevel = (p.geologicIndex + depth) % 20183
    p.type = p.erosionLevel % 3
    riskLevel += p.type
    line.push(p)
  }
  grid.push(line)
}

console.log(riskLevel)