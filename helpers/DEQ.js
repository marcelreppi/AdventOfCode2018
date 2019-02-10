// Generic double linked list

function DoubleEndedQueue(circular) {
  this.first
  this.last
  this.length = 0
  this.circular = circular || false
}

// insert at back
DoubleEndedQueue.prototype.push = function (value) {
  const newNode = new Node(value)
  if (this.length == 0) {
    newNode.next = this.circular ? newNode : undefined
    newNode.pre = this.circular ? newNode : undefined
    this.first = newNode
    this.last = newNode
  } else {
    newNode.pre = this.last
    this.last.next = newNode
    this.last = newNode
    newNode.next = this.circular ? this.first : undefined
    this.first.pre = this.circular ? newNode : undefined
  }
  this.length++
  return newNode
}

// insert at front
DoubleEndedQueue.prototype.unshift = function(value) {
  const newNode = new Node(value)
  if (this.length == 0) {
    newNode.next = this.circular ? newNode : undefined
    newNode.pre = this.circular ? newNode : undefined
    this.first = newNode
    this.last = newNode
  } else {
    newNode.next = this.first
    this.first.pre = newNode
    this.first = newNode
    newNode.pre = this.circular ? this.last : undefined
    this.last.next = this.circular ? newNode : undefined
  }
  this.length++
  return newNode
}

// remove at back
DoubleEndedQueue.prototype.pop = function() {
  if (this.length === 0) return
  const newLast = this.last.pre
  newLast.next = this.circular ? this.first : undefined
  this.first.pre = this.circular ? newLast : undefined

  const temp = this.last
  this.last = newLast
  this.length--
  return temp.value
}

// remove at front
DoubleEndedQueue.prototype.shift = function() {
  if (this.length === 0) return
  const newFirst = this.first.next
  newFirst.pre = this.circular ? this.last : undefined
  this.last.next = this.circular ? newFirst : undefined

  const temp = this.first
  this.first = newFirst
  this.length--
  return temp.value
}

DoubleEndedQueue.prototype.rotate = function(n) {
  if (n < 0) {
    for (let i = 0; i < Math.abs(n); i++) {
      const temp = this.shift()
      this.push(temp)
    }
  } else if (n > 0) {
    for (let i = 0; i < n; i++) {
      const temp = this.pop()
      this.unshift(temp)
    }
  }
}

function Node(value) {
  this.value = value
  this.next
  this.pre
}

module.exports = DoubleEndedQueue