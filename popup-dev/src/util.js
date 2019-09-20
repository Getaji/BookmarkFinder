/**
 * 2つの配列が同じ値の構造ならtrueを返します。
 *
 * 例:
 *   equalArray([0, 1, 2], [0, 1, 2]) // true
 *   equalArray([0, 1, 2], [0, 2, 2]) // false
 *   includeArray([0, 1, 2, 3, 4], [0, 1, 2]) // false
 *   includeArray([0, 1, 2], []) // true
 *
 * @param array1 配列1
 * @param array2 配列2
 * @param matcher 値の比較関数。省略すると===による比較
 * @return {Boolean}
 */
export function equalArray(array1, array2, matcher) {
  if (!target || !array) return false
  const targetLen = target.length
  const arrayLen = array.length
  if (targetLen !== arrayLen) return false
  if (!matcher) {
    matcher = (n, m) => n === m
  }
  for (let i = 0; i < arrayLen; i++) {
    if (!matcher(target[i], array[i])) {
      return false
    }
  }
  return true
}

/**
 * 配列targetのどこかがarrayと同じ値の構造ならtrueを返します。
 * arrayに空の配列が渡された場合、長さ0の並びがどこにでも存在するとしてtrueを返します。
 *
 * 例:
 *   includeArray([0, 1, 2, 3, 4], [1, 2, 3]) // true
 *   includeArray([0, 1, 2, 3, 4], [1, 3, 2]) // false
 *   includeArray([0, 1], [0, 0, 1]) // false
 *   includeArray([0, 1, 2, 3, 4], []) // true
 *
 * @param array1 配列1
 * @param array2 配列2
 * @param matcher 値の比較関数。省略すると===による比較
 * @return {Boolean}
 */
export function includeArray(target, array, matcher) {
  if (!target || !array) return false
  const targetLen = target.length
  const arrayLen = array.length
  const diff = targetLen - arrayLen
  if (diff < 0) return false
  if (!matcher) {
    matcher = (n, m) => n === m
  }
  for (let fix = 0; fix <= diff; fix++) {
    let y = true
    for (let i = 0; i < arrayLen; i++) {
      if (!matcher(target[i + fix], array[i])) {
        y = false
        break
      }
    }
    if (y) return true
  }
  return false
}

/**
 * 配列targetの先頭がarrayと同じ値の構造ならtrueを返します。
 * arrayに空の配列が渡された場合、長さ0の並びがどこにでも存在するとしてtrueを返します。
 *
 * 例:
 *   startArrayWith([0, 1, 2], [0, 1]) // true
 *   startArrayWith([0, 1, 2], [1, 2]) // false
 *   startArrayWith([0, 1, 2], [0, 1, 2]) // true
 *
 * @param array1 配列1
 * @param array2 配列2
 * @param matcher 値の比較関数。省略すると===による比較
 * @return {Boolean}
 */
export function startArrayWith(target, array, matcher) {
  if (!target || !array) return false
  const targetLen = target.length
  const arrayLen = array.length
  const diff = targetLen - arrayLen
  if (diff < 0) return false
  if (!matcher) {
    matcher = (n, m) => n === m
  }
  for (let i = 0; i < arrayLen; i++) {
    if (!matcher(target[i], array[i])) {
      return false
    }
  }
  return true
}

/**
 * 配列targetの末尾がarrayと同じ値の構造ならtrueを返します。
 * arrayに空の配列が渡された場合、長さ0の並びがどこにでも存在するとしてtrueを返します。
 *
 * 例:
 *   endArrayWith([0, 1, 2], [1, 2]) // true
 *   endArrayWith([0, 1, 2], [0, 1]) // false
 *   endArrayWith([0, 1, 2], [0, 1, 2]) // true
 *
 * @param array1 配列1
 * @param array2 配列2
 * @param matcher 値の比較関数。省略すると===による比較
 * @return {Boolean}
 */
export function endArrayWith(target, array, matcher) {
  if (!target || !array) return false
  const targetLen = target.length
  const arrayLen = array.length
  const diff = targetLen - arrayLen
  if (diff < 0) return false
  if (!matcher) {
    matcher = (n, m) => n === m
  }
  for (let i = 0; i < arrayLen; i++) {
    if (!matcher(target[i + diff], array[i])) {
      return false
    }
  }
  return true
}