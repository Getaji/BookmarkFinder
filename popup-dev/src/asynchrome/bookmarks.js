export function getTree() {
  return new Promise((resolve, reject) => {
    chrome.bookmarks.getTree(results => {
      resolve(results)
    })
  })
}

export function update(id, changes) {
  return new Promise((resolve, reject) => {
    chrome.bookmarks.update(id, changes, result => {
      resolve(result)
    })
  })
}

export default {
  getTree,
  update,
}
