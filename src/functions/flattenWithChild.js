function flattenWithChild (m, x){
  // menu is an array of the current items in the menu ;
  let rs = [] ;
  m.forEach(function(v){
    // children
    if(v && v[x] && v[x].length){
      rs.push(...flattenWithChild(v[x]))
      // delete v.children ;
      }
    rs.push(v)
  }) ;
  return rs
}

export default flattenWithChild ;
