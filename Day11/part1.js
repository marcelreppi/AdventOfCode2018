const serialNr = 4455

let maxX, maxY
let maxPowerLevel = -Infinity
for (let x = 1; x < 298; x++) {
  for (let y = 1; y < 298; y++) {

    let currentPowerLevel = 0
    for (let i = x; i < x + 3; i++) {
      for (let j = y; j < y + 3; j++) {
        currentPowerLevel += calcPowerLevel(i, j)
      }
    }

    if (currentPowerLevel > maxPowerLevel) {
      maxPowerLevel = currentPowerLevel
      maxX = x
      maxY = y
    }
  
  }
}

console.log(maxX, maxY, maxPowerLevel)

function calcPowerLevel(x, y) {
  const rackId = x + 10
  const a = String(((rackId * y) + serialNr) * rackId)
  const b = parseFloat(a.substring(a.length - 3, a.length - 2))
  return b - 5
}