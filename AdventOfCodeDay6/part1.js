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

const areaCounter = {}
const blacklist = [] // blacklist all coordinates which are closest to the border because they would expand infinitely

// loop through every coordinate in the grid
for (let xi = boundaries.leftBorder; xi < boundaries.rightBorder + 1; xi++) {
  for (let yi = boundaries.topBorder; yi < boundaries.bottomBorder + 1; yi++) {

    let closestCoordinate = { 
      index: -1,
      distance: Infinity
    }
    
    // find closest coordinates to current location on the grid
    for (let i = 0; i < coordinates.length; i++) {
      const [x, y] = coordinates[i]
      const mDist = Math.abs(xi - x) + Math.abs(yi - y)
      
      if (mDist < closestCoordinate.distance) {
        closestCoordinate.index = i
        closestCoordinate.distance = mDist
      } else if (mDist == closestCoordinate.distance) {
        closestCoordinate = undefined
        break
      }
    }

    // two or more coordinates have the same distance -> skip
    if (closestCoordinate == undefined) {
      continue
    }

    // blacklist coordinate index if it is closest to one of the borders because it would expand infinitely
    if (isOnBorder(xi, yi)) {
      if (!blacklist.includes(closestCoordinate.index)) {
        blacklist.push(closestCoordinate.index)
      }
      continue
    }

    // if closest coordinate is on the blacklist skip it
    if (blacklist.includes(closestCoordinate.index)) {
      continue
    }

    // count the area all other non-infinite coordinate cover
    if (areaCounter[closestCoordinate.index]) {
      areaCounter[closestCoordinate.index]++
    } else {
      areaCounter[closestCoordinate.index] = 1
    }
  } 
}

function isOnBorder(x, y) {
  return (
    x == boundaries.leftBorder || 
    x == boundaries.rightBorder ||
    y == boundaries.topBorder ||
    y == boundaries.bottomBorder
  )
}

const largestArea = Math.max(...Object.values(areaCounter))
console.log(largestArea)