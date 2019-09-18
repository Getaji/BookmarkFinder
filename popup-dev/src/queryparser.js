/**
 * ブックマークの一致関数を管理する連想配列です。
 * クエリがkey:value形式の場合に文字列keyをキーとして参照されます。
 *
 * 値はクエリ、否定フラグ、正規表現フラグを引数に取って一致関数を生成する関数もしくはそのリストです。
 * 値が関数もしくは長さ1の配列の場合、値もしくは0番目の値をファクトリ関数とします。
 * 値が長さ2の配列の場合、[正規表現あり, 正規表現なし]のファクトリ関数が入っているものとします。
 * 値が長さ4の配列の場合は[正規表現あり, 正規表現あり否定, 正規表現なし, 正規表現なし否定]とします。
 */
const QUERY_MATCHER = {
}

/** ブックマークの属性参照の対象とする属性の文字列のリストです。 */
const BOOKMARK_ATTRIBUTES = ['title', 'url']

/**
 * ブックマークの属性参照を用いた一致関数を生成して返します。
 * @param attr - 属性名
 * @param value - 一致させる値
 * @param isNot - 否定フラグ
 * @param useRegExp - 正規表現フラグ
 * @return 一致関数
 */
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

/**
 * 分割された個別のクエリを変換し、否定検索などに対応した一致関数を返します。
 * 否定表現の処理を行った関数parseQuery()から呼び出される関数です。
 */
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