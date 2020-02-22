/*
* Expecting parent array and child array with items string or number ;
*/
function loop_and_delete (parent, child, id) {
  let found
  child.forEach(function (item) {
    for (let i = 0; i < parent.length; i++) {
      if (item == parent[i][id]) {
        parent.splice(i, 1)
        break
      }
    }
  })
  return parent
}

export default loop_and_delete
