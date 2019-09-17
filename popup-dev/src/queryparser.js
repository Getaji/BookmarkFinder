const QUERY_MATCHER = {
}

const BOOKMARK_ATTRIBUTES = ['title', 'url']
function getQueryAttrMatcher(attr, value, isNot, useRegExp) {
  if (BOOKMARK_ATTRIBUTES.includes(attr)) {
    if (useRegExp) {
      const pattern = new RegExp(value, 'i')
      return item => isNot ^ item[attr].match(pattern)
    }
    return item => isNot ^ item[attr].includes(value)
  }
  return null
}

function _parseQuery(query, isNot, useRegExp) {
  const kv = query.split(':', 2)
  if (kv.length === 2) {
    const [key, value] = kv
    const attrMatcher = getQueryAttrMatcher(key, value, isNot, useRegExp)
    if (attrMatcher) {
      return attrMatcher
    }
    const matcher = QUERY_MATCHER[key]
    if (matcher) {
      return matcher
    }
  }
  if (useRegExp) {
    const pattern = new RegExp(query, 'i')
    return isNot
      ? item => !item.title.match(pattern) && !item.url.match(pattern)
      : item => item.title.match(pattern) || item.url.match(pattern)
  } else {
    return isNot
      ? item => !item.title.includes(query) && !item.url.includes(query)
      : item => item.title.includes(query) || item.url.includes(query)
  }
}

/**
 * 分割された個別のクエリを変換し、否定検索などに対応した一致関数を返します。
 */
export function parseQuery(query, useRegExp) {
  const isNot = query.startsWith('-') && query.length > 1
  if (isNot) {
    query = query.substr(1)
  }
  return _parseQuery(query, isNot, useRegExp)
}