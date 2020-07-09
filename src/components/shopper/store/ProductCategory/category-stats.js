import flattenWithChild from '@/functions/flattenWithChild.js' ;
import Core from '@/class.core.js' ;
import {uniqueBy} from 'lodash'

export function getQualifyingCategorys(x,asObj){
  // x is an object of form {name, id, image, children}
  let cats = flattenWithChild(x.children, 'children') ;
  let b = cats.map( cat=> {return {name:cat.name, id:cat.id} } )

  let c = [{name:x.name, id:x.id}].concat(b) ;
  return c ;
}

function getNumMatched(){
  return 0
}

export function searchMenuIndex (menu, x){

  // recursiveLoop that searches an item in menu down through the children ;
  // x is an object {id,name} , it is essentially the currentItem
  const m = JSON.parse(JSON.stringify(menu)) ;

  const searchIn = function(m, x){
    let rs = [] ;
    let found = false ;

    rs.push(m) ;
    if(m.id == x.id)
      {
      // rs.push(m)
      found = true ;
      }
    else
      {
      let n ;
      for(let i=0; i< m.children.length ; i ++)
        {
        n =  m.children[i] ;
        if(n.id == x.id)
          {
          found = true ;
          rs.push(n)
          // console.log('found', i+1)
          break ;
          }

        if(!found && n.children.length)
          {
          rs.push(n) ;
          let ns = searchIn(n, x) ;
          found =  ns.found ;
          // console.log('ns ', ns)

          rs.push(...ns.path) ;
          if(found){
            break
            }
          }
        }
      }

    rs = _.uniqBy(rs, 'id') ;
    return {path:rs, found:found}
    }
  // returns the path searched and boolean whether it was found or not {path:[{},{},{}], found:false|true} ;

  // menu is an array of the current items in the menu ;
  let cc = false ;
  let path = [] ;
  for(let i=0 ; i< m.length; i++){
    // children
    let s = searchIn(m[i], x) ;
    // console.log('s', s) ;
    if(s.found == true)
      {
      path =  s.path ;
      break ;
      }
    }

  return path
  }



function mapRoute(routes, route){
  // gets the index of the current menu in the menu passed ;
  // r
}

function getStats(x){
  let cats = getQualifyingCategorys(x) ;
  return {
    route:{
      name:'store-category',
      params:{
        category:cats.map(x=> x.name).join('|'),
        categories:cats.map(x=>x.name),
        }
    },
    count:getNumMatched(cats)
  }
}

export default getStats ;
