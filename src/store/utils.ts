/**
 *   生成树形结构数据
 */
export function generateTree(array, rootId, idName = 'menuId', parentIdName = 'parentId', childrenName = 'children') {
  const data = JSON.parse(JSON.stringify(array))
  var result = []
  for (const item of data) {
    if (item[parentIdName] === rootId) {
      // 判断是否为顶层节点
      item.children = getchilds(item[idName], data, idName, parentIdName, childrenName) // 获取子节点
      result.push(item)
    }
  }
  return result
}

function getchilds(id, array, idName = 'menuId', parentIdName = 'parentId', childrenName = 'children') {
  const childs = []
  for (const item of array) {
    if (item[parentIdName] === id) {
      childs.push(item)
    }
  }
  for (const child of childs) {
    // 获取子节点的子节点
    const childscopy = getchilds(child[idName], array) // 递归获取子节点
    if (childscopy.length > 0) {
      child.children = childscopy
    }
  }
  return childs
}
