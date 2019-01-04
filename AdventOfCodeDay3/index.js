const fs = require('fs')

let claims = fs.readFileSync('claims.txt', 'utf8')
claims = claims.split('\n')

// Create 2d array representing the fabric
const fields = []
for (let i = 0; i < 1000; i++) {
  fields.push(Array(1000))
}

let overlapCounter = {}

// Loop through list of claims 
for (let i = 0; i < claims.length; i++) {
  let claim = claims[i]
  claim = claim.split(' ')

  const id = claim[0].substring(1)
  overlapCounter[id] = 0

  const [x, y] = claim[2]
    .substring(0, claim[2].length - 1)
    .split(',')
    .map( n => parseInt(n) )
  const [width, height] = claim[3]
    .split('x')
    .map( n => parseInt(n) )

  // Calculate which coordinates each claim covers
  // Store claim id at coordinate in 2d array
  for (let xi = x; xi < (x + width); xi++) {
    for (let yi = y; yi < (y + height); yi++) {
      if (fields[xi][yi]) {
        fields[xi][yi].push(id)
      } else {
        fields[xi][yi] = [id]
      }   
    }
  }
}


// Count coordinates with two or more claim ids
let inchCounter = 0
for (let i = 0; i < fields.length; i++) {
  for (let j = 0; j < fields[i].length; j++) {
    if (fields[i][j] && fields[i][j].length >= 2) {
      inchCounter++
      fields[i][j].forEach( id => overlapCounter[id] += 1)
    }  
  }
}

console.log('Overlapping inches: ' + inchCounter)

const nonOverlap = Object.keys(overlapCounter)
  .filter( id => overlapCounter[id] == 0)

console.log('ID that does not overlap: ' + nonOverlap)






