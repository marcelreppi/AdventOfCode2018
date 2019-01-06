const fs = require('fs')

let coordinates = fs.readFileSync('coordinates.txt', 'utf8')
coordinates = coordinates.split('\n').map( s => {
  return s.split(',').map(parseFloat)
})

const boundaries = coordinates.reduce( (prev, curr) => {
  const [x, y] = curr
  if (x < prev.leftBorder) {
    prev.leftBorder = x
  }
  if (x > prev.rightBorder) {
    prev.rightBorder = x
  }
  if (y < prev.topBorder) {
    prev.topBorder = y
  }
  if (y > prev.bottomBorder) {
    prev.bottomBorder = y
  }
  return prev
}, { 
  leftBorder: Infinity, 
  rightBorder: -Infinity,
  topBorder: Infinity,
  bottomBorder: -Infinity
})

let areaCounter = 0

// loop through every coordinate in the grid
for (let xi = boundaries.leftBorder; xi < boundaries.rightBorder + 1; xi++) {
  for (let yi = boundaries.topBorder; yi < boundaries.bottomBorder + 1; yi++) {
    
    let distanceSum = 0
    // loop through coordinates and sum distances
    for (let i = 0; i < coordinates.length; i++) {
      const [x, y] = coordinates[i]
      const mDist = Math.abs(xi - x) + Math.abs(yi - y)
      distanceSum += mDist
    }

    const threshold = 10000
    if (distanceSum < threshold) {
      areaCounter++
    }

  } 
}

console.log(areaCounter)