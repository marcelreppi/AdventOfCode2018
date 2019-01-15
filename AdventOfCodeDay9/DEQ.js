// Generic double linked list

function DoubleEndedQueue() {
  this.first
  this.last
  this.length = 0
}

DoubleEndedQueue.prototype.push = function (value) {
  const newNode = new Node(value)
  if (this.length == 0) {
    newNode.next = newNode
    newNode.pre = newNode
    this.first = newNode
    this.last = newNode
  } else {
    newNode.pre = this.last
    this.last.next = newNode
    this.last = newNode
    newNode.next = this.first
    this.first.pre = newNode
  }
  this.length++
  return newNode
}

DoubleEndedQueue.prototype.unshift = function(value) {
  const newNode = new Node(value)
  if (this.length == 0) {
    newNode.next = newNode
    newNode.pre = newNode
    this.first = newNode
    this.last = newNode
  } else {
    newNode.next = this.first
    this.first.pre = newNode
    this.first = newNode
    newNode.pre = this.last
    this.last.next = newNode
  }
  this.length++
  return newNode
}

DoubleEndedQueue.prototype.pop = function() {
  if (this.length === 0) return
  const newLast = this.last.pre
  newLast.next = this.first
  this.first.pre = newLast

  const temp = this.last
  this.last = newLast
  this.length--
  return temp.value
}

DoubleEndedQueue.prototype.shift = function() {
  if (this.length === 0) return
  const newFirst = this.first.next
  newFirst.pre = this.last
  this.last.next = newFirst

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