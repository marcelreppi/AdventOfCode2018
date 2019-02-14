function Cart(x, y, direction) {
  this.x = x
  this.y = y
  this.direction = direction
  this.nextTurn = 'L'
  this.dead = false
}

Cart.prototype.move = function() {
  if (this.direction === '^') this.y--
  else if (this.direction === '>') this.x++
  else if (this.direction === 'v') this.y++
  else if (this.direction === '<') this.x--

  // Turn the cart if it is on a corner or intersection after moving
  const newField = fields[`${this.x},${this.y}`]
  if (newField === '/') {
    if (this.direction === '^') this.direction = '>'
    else if (this.direction === '>') this.direction = '^'
    else if (this.direction === 'v') this.direction = '<'
    else if (this.direction === '<') this.direction = 'v'
  } else if (newField === '\\') {
    if (this.direction === '^') this.direction = '<'
    else if (this.direction === '>') this.direction = 'v'
    else if (this.direction === 'v') this.direction = '>'
    else if (this.direction === '<') this.direction = '^'
  } else if (newField === '+') {
    if (this.nextTurn === 'L') {
      if (this.direction === '^') this.direction = '<'
      else if (this.direction === '>') this.direction = '^'
      else if (this.direction === 'v') this.direction = '>'
      else if (this.direction === '<') this.direction = 'v'
      this.nextTurn = 'S'
    } else if (this.nextTurn === 'R') {
      if (this.direction === '^') this.direction = '>'
      else if (this.direction === '>') this.direction = 'v'
      else if (this.direction === 'v') this.direction = '<'
      else if (this.direction === '<') this.direction = '^'
      this.nextTurn = 'L'
    } else if (this.nextTurn === 'S') {
      this.nextTurn = 'R'
    }
  }
}

const fs = require('fs')

let grid = fs.readFileSync('tracks.txt', 'utf8')

const carts = []
const fields = {}

grid.split('\r\n').forEach( (line, y) => {
  for (let x = 0; x < line.length; x++) {
    const fieldType = line[x];
    
    if (fieldType === ' ') {
      continue
    }

    if ('^>v<'.includes(fieldType)) {
      const cart = new Cart(x, y, fieldType)
      carts.push(cart)
      fields[`${x},${y}`] = fieldType === '<' || fieldType === '>' ? '-' : '|'
    } else {
      fields[`${x},${y}`] = fieldType
    }
  }
})

let collision = false

while (true) {
  carts.sort( (c1, c2) => {
    if (c1.y > c2.y) {
      return 1
    } else if (c1.y < c2.y) {
      return -1
    } else {
      if (c1.x > c2.x) {
        return 1
      } else if (c1.x < c2.x) {
        return -1
      } else {
        return 0
      }
    }
  })

  for (let i = 0; i < carts.length; i++) {
    const cart = carts[i];

    if (cart.dead) {
      continue
    }

    cart.move()

    // Check for collision
    for (let j = 0; j < carts.length; j++) {
      const cart2 = carts[j];
      if (i !== j && cart.x === cart2.x && cart.y === cart2.y && !cart2.dead) {
        cart.dead = true
        cart2.dead = true
        console.log(`COLLISION AT ${cart.x},${cart.y}`)
        break
      }
    }
  }

  const aliveCarts = carts.filter( c => !c.dead )
  if (aliveCarts.length === 1) {
    const lastCart = aliveCarts[0]
    console.log(`Last cart is at ${lastCart.x},${lastCart.y}`)
    break
  }
}

