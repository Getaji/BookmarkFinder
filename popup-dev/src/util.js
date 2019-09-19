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