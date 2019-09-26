export function create(createProperties) {
  return new Promise((resolve, reject) => {
    chrome.tabs.create(createProperties, tab => {
      resolve(tab)
    })
  })
}

export function getCurrent() {
  return new Promise((resolve, reject) => {
    chrome.tabs.getCurrent(tab => {
      resolve(tab)
    })
  })
}

export function sendMessage(tabId, message, options) {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, message, options, response => {
      resolve(response)
    })
  })
}

export function query(queryInfo) {
  return new Promise((resolve, reject) => {
    chrome.tabs.query(queryInfo, result => {
      resolve(result)
    })
  })
}

export function update(tabId, updateProperties) {
  return new Promise((resolve, reject) => {
    chrome.tabs.update(tabId, updateProperties, tab => {
      resolve(tab)
    })
  })
}

export default {
  create,
  getCurrent,
  sendMessage,
  query,
  update,
}
