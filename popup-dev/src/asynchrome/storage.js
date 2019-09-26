export function syncGet(keys) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(keys, items => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError)
      } else {
        resolve(items)
      }
    })
  })
}

export function syncSet(items) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.items(items, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError)
      } else {
        resolve()
      }
    })
  })
}

export default {
  sync: {
    get: syncGet,
    set: syncSet,
  },
}
