const serialNr = 4455

let maxX, maxY, maxGridSize
let maxPowerLevel = -Infinity

// Used this https://en.wikipedia.org/wiki/Summed-area_table

const summedAreaTable = {}

for (let x = 1; x < 301; x++) {
  for (let y = 1; y < 301; y++) {
    const a = summedAreaTable[`${x},${y-1}`] || 0
    const b = summedAreaTable[`${x-1},${y}`] || 0
    const c = summedAreaTable[`${x-1},${y-1}`] || 0
    const val = calcPowerLevel(x,y) + a + b - c
    summedAreaTable[`${x},${y}`] = val
  }
}

for (let size = 1; size < 301; size++) {
  for (let x = 1; x < 301; x++) {
    for (let y = 1; y < 301; y++) {
      const currentPowerLevel = 
        summedAreaTable[`${x+size},${y+size}`] +
        summedAreaTable[`${x},${y}`] -
        summedAreaTable[`${x+size},${y}`] -
        summedAreaTable[`${x},${y+size}`]

      if (currentPowerLevel > maxPowerLevel) {
        maxPowerLevel = currentPowerLevel
        maxX = x + 1
        maxY = y + 1
        maxGridSize = size
        console.log(maxX, maxY, maxGridSize, maxPowerLevel)
      }
    }
  }
}

function calcPowerLevel(x, y) {
  const rackId = x + 10
  const a = String(((rackId * y) + serialNr) * rackId)
  return parseFloat(a.substring(a.length - 3, a.length - 2)) - 5
}