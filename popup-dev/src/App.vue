<template>
  <div id="app">
    <input
      id="inputSearchQuery"
      ref="inputSearchQuery"
      v-model="searchQuery"
      placeholder="入力してEnterで検索"
      @keyup="onKeyupInputSearchQuery"
      @keyup.enter="enterInputSearchQuery"
      @keyup.up="shiftSelectedItem(-1, $event)"
      @keyup.down="shiftSelectedItem(1, $event)"
      @keydown="onKeydown"
      @change="selectedBookmarkIndex = -1"
    >
    <div id="bookmarkList">
      <BookmarkItem
        v-for="(item, i) in bookmarks"
        :key="item.id"
        :item="item"
        :class="{selected: i === selectedBookmarkIndex}"
        @openurl="onOpenUrlByBkm"
      />
      <div
        id="bookmarkListNotice"
        v-if="bookmarks.length === 0 && state !== 'ready'"
      >一致するブックマークはありません</div>
    </div>
  </div>
</template>

<script>
import BookmarkItem from './components/BookmarkItem.vue'

function parseBookmarkNode(node) {
  return {
    id: node.id,
    title: node.title,
    url: node.url,
    children: node.children ? node.children.map(parseBookmarkNode) : null,
  }
}

function flatBookmarksTree(tree, size) {
  const list = []
  function add(node) {
  }
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

function findBookmarks(query) {
  return bookmarks.filter(bkm => {
    return bkm.title.includes(query) || bkm.url.includes(query)
  })
}

function openURL(url, newTab, active) {
  if (newTab) {
    chrome.tabs.create({url, active}, _ => null)
  } else {
    chrome.tabs.update(null, {url}, _ => null)
  }
}

let bookmarks = []

export default {
  name: 'app',
  components: {
    BookmarkItem
  },
  data() {
    return {
      bookmarks: [],
      searchQuery: '',
      selectedBookmarkIndex: -1,
      state: 'ready',
    }
  },
  mounted() {
    this.loadBookmarks()
    this.$refs.inputSearchQuery.focus()
  },
  methods: {
    openURL,
    onKeyupInputSearchQuery() {
      //this.state
    },
    enterInputSearchQuery(ev) {
      if (this.selectedBookmarkIndex > -1) {
        openURL(this.bookmarks[this.selectedBookmarkIndex].url, ev.ctrlKey, !ev.shiftKey)
        return
      }
      const q = this.searchQuery
      if (q.length === 0) {
        this.bookmarks = []
        this.state = 'empty'
        return
      }
      this.selectedBookmarkIndex = -1
      this.bookmarks = findBookmarks(q)
      this.state = 'result'
    },
    loadBookmarks() {
      chrome.bookmarks.getTree(nodes => {
        const parsedTree = nodes.map(parseBookmarkNode)
        bookmarks = flatBookmarksTree(parsedTree)
      })
    },
    shiftSelectedItem(value, ev) {
      if (!ev.ctrlKey) {
        return true
      }
      const shifted = this.selectedBookmarkIndex + value
      if (shifted > -1 && this.bookmarks.length > shifted) {
        this.selectedBookmarkIndex = shifted
      }
      ev.preventDefault()
      return false
    },
    onOpenUrlByBkm(ev) {
      openURL(ev.url, ev.newTab, ev.active)
    },
    onKeydown(ev) {
      if (ev.ctrlKey && (ev.key === 'ArrowUp' || ev.key === 'ArrowDown')) {
        ev.preventDefault()
        return false
      }
    },
  },
}
</script>

<style>
body {
  width: 400px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
}

#inputSearchQuery {
  margin-bottom: 4px;
}

#bookmarkListNotice {
  text-align: center;
  color: 555;
}
</style>
