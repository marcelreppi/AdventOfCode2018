const fs = require('fs')

let records = fs.readFileSync('records.txt', 'utf8')

// format records
records = records
  .split('\n')
  .map( e => {
    const date = e.substring(1,11).split('-').map(parseFloat)
    const time = e.substring(12,17).split(':').map(parseFloat)
    const action = e.substring(19)
    let shortcut 
    // shortcut contains
    // id of guard if new guard starts shift
    // w if he wakes up
    // s if he falls asleep
    if (action.startsWith('Guard')) {
      shortcut = parseInt(action.split(' ')[1].substring(1))
    } else if (action.startsWith('falls')) {
      shortcut = 's'
    } else if (action.startsWith('wakes')) {
      shortcut = 'w'
    }

    return [date, time, shortcut]
  })

// Sort records chronologically
records.sort( (e1, e2) => {
  const month1 = e1[0][1]
  const day1 = e1[0][2]
  const hour1 = e1[1][0]
  const minute1 = e1[1][1]

  const month2 = e2[0][1]
  const day2 = e2[0][2]
  const hour2 = e2[1][0]
  const minute2 = e2[1][1]

  if (month1 < month2) {
    return -1
  } else if (month1 > month2) {
    return 1
  } else {
    if (day1 < day2) {
      return -1
    } else if (day1 > day2) {
      return 1
    } else {
      if (hour1 < hour2) {
        return -1
      } else if (hour1 > hour2) {
        return 1
      } else {
        if (minute1 < minute2) {
          return -1
        } else if (minute1 > minute2) {
          return 1
        } else {
          return 0
        }
      }
    }
  }
})

const guardCounter = {}
const sleepCounter = {}
let currentGuard
let sleepMinute
for (let i = 0; i < records.length; i++) {
  const record = records[i]
  // console.log(record)
  const shortcut = record[2]
  if (typeof shortcut == 'number') {
    currentGuard = shortcut
    // if its a new guard id add it to the sleep counter
    if (sleepCounter[currentGuard] == undefined) {
      sleepCounter[currentGuard] = { 
        minutesOfSleep: 0,
        sleepPerMinute: {} // keeps track of how often a minute has been spent asleep
      }
    }
  } else if (shortcut == 's') {
    // save minute the guard fell asleep
    sleepMinute = record[1][1]
  } else if (shortcut == 'w') {
    // calculate the minutes spent sleeping and add it to the sleep counter
    sleepCounter[currentGuard]['minutesOfSleep'] += record[1][1] - sleepMinute
    for (let i = sleepMinute; i < record[1][1]; i++) {
      if (sleepCounter[currentGuard]['sleepPerMinute'][i]) {
        sleepCounter[currentGuard]['sleepPerMinute'][i]++
      } else {
        sleepCounter[currentGuard]['sleepPerMinute'][i] = 1
      }

      if (guardCounter[i]) {
        if (guardCounter[i][currentGuard]) {
          guardCounter[i][currentGuard]++
        } else {
          guardCounter[i][currentGuard] = 1
        }
      } else {
        guardCounter[i] = {}
      }
    }
  }
}

// console.log(sleepCounter)

///////// Stategy 1 /////////

let topSleeper
let topMinutes = 0
Object.keys(sleepCounter).forEach( guardId => {
  if (sleepCounter[guardId]['minutesOfSleep'] > topMinutes) {
    topMinutes = sleepCounter[guardId]['minutesOfSleep']
    topSleeper = guardId
  }
})

let topMinuteSpentAsleep
let topAmountOfSleepOnMinute = 0
Object.keys(sleepCounter[topSleeper]['sleepPerMinute']).forEach( m => {
  if (sleepCounter[topSleeper]['sleepPerMinute'][m] > topAmountOfSleepOnMinute) {
    topAmountOfSleepOnMinute = sleepCounter[topSleeper]['sleepPerMinute'][m]
    topMinuteSpentAsleep = m
  }
})

///////// Strategy 2 /////////

let mostFrequentMinute
let topFrequentGuard
let topFrequency = 0

Object.keys(guardCounter).forEach( m => {
  const maxPerMinute = Object.entries(guardCounter[m]).reduce( (prev, curr) => {
    const [id, frequency] = curr
    if (frequency > prev.frequency) {
      return { id, frequency }
    } else {
      return prev
    }
  }, { id: 0, frequency: 0})

  if (maxPerMinute.frequency > topFrequency) {
    topFrequency = maxPerMinute.frequency
    topFrequentGuard = maxPerMinute.id
    mostFrequentMinute = m
  }
})

console.log('/////// Strategy 1 ///////')
console.log('ID of guard that slept the most: ' + topSleeper)
console.log('Time spent asleep: ' + topMinutes)
console.log('Minute that has been spent sleeping the most: ' + topMinuteSpentAsleep)
console.log('Amount of times minute ' + topMinuteSpentAsleep + ' was spent asleep: ' + topAmountOfSleepOnMinute)

const puzzleSolution1 = topSleeper*topMinuteSpentAsleep
console.log('Puzzle solution: ' + puzzleSolution1)

console.log()
console.log('/////// Strategy 2 ///////')
console.log('Most frequent minute spent asleep: ' + mostFrequentMinute)
console.log('ID of guard that spent most time asleep on that minute: ' + topFrequentGuard)
console.log('Amount of times that guard slept during minute ' + mostFrequentMinute + ': ' + topFrequency)

const puzzleSolution2 = topFrequentGuard*mostFrequentMinute
console.log('Puzzle solution: ' + puzzleSolution2)

// console.log(guardCounter)

