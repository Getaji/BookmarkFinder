<template>
  <div id="app">
    <input
      id="inputSearchQuery"
      ref="inputSearchQuery"
      v-model="searchQuery"
      placeholder="入力してEnterで検索"
      @keyup="onKeyupInputSearchQuery"
      @keyup.enter="enterInputSearchQuery"
      @keydown.up="shiftSelectedItem(-1, $event)"
      @keydown.down="shiftSelectedItem(1, $event)"
      @change="selectedBookmarkIndex = -1"
    >
    <div id="selectSearchOrAnd">
      <input
        type="radio"
        id="selectSearchOrAnd-AND"
        value="AND"
        v-model="selectSearchOrAnd"
      >
      <label for="selectSearchOrAnd-AND">AND</label>
      <input
        type="radio"
        id="selectSearchOrAnd-OR"
        value="OR"
        v-model="selectSearchOrAnd"
      >
      <label for="selectSearchOrAnd-OR">OR</label>
    </div>
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

/**
 * Chromeのブックマークツリーのノードを扱いやすい形式に変換します。
 */
function parseBookmarkNode(node) {
  return {
    id: node.id,
    title: node.title,
    url: node.url,
    children: node.children ? node.children.map(parseBookmarkNode) : null,
  }
}

/**
 * Chromeのブックマークツリーを1つのリストにします。
 */
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

/**
 * 検索クエリを変換し、一致するブックマークのリストを返します。
 * クエリは空白文字で分割され、AND/OR検索にかけられます。
 * @param query - クエリ
 * @param andOr - AND/ORの指定(デフォルトでAND検索)
 * @return 一致するブックマークのリスト
 */
function findBookmarks(query, andOr) {
  if (!query || query.length === 0) {
    return []
  }
  const queries = query.split(/[　 ㅤ]+/g).filter(q => q.length > 0)
  if (queries.length === 0) {
    return []
  }
  const condAndOr = andOr === 'OR'
    ? queries.some.bind(queries)
    : queries.every.bind(queries)
  return bookmarks.filter(bkm => {
    return condAndOr(q => {
      return bkm.title.includes(q) || bkm.url.includes(q)
    })
  })
}

/**
 * URLを現在のタブか新しいタブで開きます。
 * @param url - 開くURL
 * @param newTab - 新しいタブで開くか(デフォルトで現在のタブ)
 * @param active - 新しいタブをアクティブにするか(デフォルトでアクティブにする)
 */
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
      selectSearchOrAnd: 'AND',
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
    find(q) {
      if (!q) {
        q = this.searchQuery
      }
      this.selectedBookmarkIndex = -1
      this.bookmarks = findBookmarks(q, this.selectSearchOrAnd)
      this.state = this.bookmarks.length > 0 ? 'result' : 'empty'
    },
    enterInputSearchQuery(ev) {
      if (this.selectedBookmarkIndex > -1) {
        openURL(this.bookmarks[this.selectedBookmarkIndex].url, ev.ctrlKey, !ev.shiftKey)
        return
      }
      this.find()
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
