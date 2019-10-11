import {parseQuery} from './queryparser'


/**
 * Chromeのブックマークツリーのノードを扱いやすい形式に変換します。
 */
export function parseBookmarkNode(node, dirs) {
  if (!dirs) {
    dirs = []
  }
  const children = node.children
    ? node.children.map(child => {
        return parseBookmarkNode(child, [...dirs, node.title])
      })
    : null
  return {
    id: node.id,
    title: node.title,
    url: node.url,
    dirs,
    children,
  }
}

/**
 * Chromeのブックマークツリーを1つのリストにします。
 */
export function flatBookmarksTree(tree, size) {
  const list = []
  function each(nodes) {
    nodes.forEach(node => {
      if (node.children) {
        each(node.children)
      } else {
        list.push(node)
      }
    })
  }
  each(tree)
  return list
}

/**
 * 検索クエリを変換し、一致するブックマークのリストを返します。
 * クエリは空白文字で分割され、AND/OR検索にかけられます。
 * @param query - クエリ
 * @param andOr - AND/ORの指定(デフォルトでAND検索)
 * @return 一致するブックマークのリスト
 */
export function findBookmarks(bookmarks, query, andOr, useRegExp) {
  if (!query || query.length === 0) {
    return []
  }
  const queries = query
    .split(/[　 ㅤ]+/g)
    .filter(q => q.length > 0)
    .map(q => parseQuery(q, useRegExp))
    .filter(q => q !== null)
  if (queries.length === 0) {
    return []
  }
  const condAndOr =
    andOr === 'OR' ? queries.some.bind(queries) : queries.every.bind(queries)
  return bookmarks.filter(bkm => {
    return condAndOr(query => query(bkm))
  })
}
