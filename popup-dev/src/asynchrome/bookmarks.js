export function getTree() {
  return new Promise((resolve, reject) => {
    chrome.bookmarks.getTree(results => {
      resolve(results)
    })
  })
}

export default {
  getTree,
}
