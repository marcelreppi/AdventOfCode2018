const fs = require('fs')

let data = fs.readFileSync('data.txt', 'utf8')
// let data = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2'
data = data.split(' ').map(parseFloat)

let sumAllMetadata = 0

const root = {
  children: []
}

function processData(i, node) {
  const [nChildren, nMetadata] = data.slice(i, i+2)

  if (nChildren == 0) {
    if (node.parent) {
      node.parent.children.push(node)
    }

    node.metadata = data.splice(i+2, nMetadata)
    data.splice(i, 2)

    sumAllMetadata += node.metadata.reduce( (s, x) => s+x, 0 )

    if (node.children.length == 0) {
      node.value = node.metadata.reduce( (s, x) => s+x, 0 )
    } else {
      node.value = node.metadata.reduce( (s, x) => {
        if (x > 0 && x < node.children.length+1) {
          return s + node.children[x-1].value
        }
        return s
      }, 0)
    }

    if (data.length !== 0) {
      data[i-2]--
      processData(i-2, node.parent)
    } 
    return
  }

  const nextNode = {
    children: [],
    parent: node,
  }
  processData(i+2, nextNode)
}

processData(0, root)

console.log(sumAllMetadata)
console.log(root.value)

