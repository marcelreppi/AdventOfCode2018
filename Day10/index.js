const fs = require('fs')

let data = fs.readFileSync('./input.txt', 'utf8')

data = data
  .split('\n')
  .map( e => {
    const point = {}

    const p1 = e.indexOf('<')
    const p2 = e.indexOf('>')
    const pos = e.substring(p1+1, p2)
    const [x, y] = pos.split(',').map(parseFloat)
    point.x = x
    point.y = y
    
    const v1 = e.indexOf('<', p2+1)
    const v2 = e.indexOf('>', p2+1)
    const vel = e.substring(v1+1, v2)
    const [dx, dy] = vel.split(',').map(parseFloat)
    point.dx = dx
    point.dy = dy
    return point
  })

function draw() {
  const minX = Math.min(...data.map( p => p.x ))
  const maxX = Math.max(...data.map( p => p.x ))
  const minY = Math.min(...data.map( p => p.y ))
  const maxY = Math.max(...data.map( p => p.y ))

  let grid = ''
  for (let y = minY; y < maxY + 1; y++) {
    for (let x = minX; x < maxX + 1; x++) {
      if (data.find( p => p.x === x && p.y === y )) {
        grid += '#'
      } else {
        grid += '.'
      }
    }
    grid += '\n' 
  }
  console.log(grid)
}

let prevBoxSize = Infinity
for (let i = 0; i < Infinity; i++) {
  for (let j = 0; j < data.length; j++) {
    const point = data[j]
    point.x += point.dx
    point.y += point.dy
  }
  const minX = Math.min(...data.map( p => p.x ))
  const maxX = Math.max(...data.map( p => p.x ))
  const minY = Math.min(...data.map( p => p.y ))
  const maxY = Math.max(...data.map( p => p.y ))

  const boxSize = (maxX - minX) * (maxY - minY)

  // Looking for a minimum in box size
  if (boxSize > prevBoxSize) {
    // Box size has increased again
    // Reverse last movement and print
    for (let j = 0; j < data.length; j++) {
      const point = data[j]
      point.x -= point.dx
      point.y -= point.dy
    }
    console.log(i)
    draw()
    break
  }
  prevBoxSize = boxSize
}

