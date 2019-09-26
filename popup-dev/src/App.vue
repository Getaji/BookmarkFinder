<template>
  <div id="app">
    <input
      id="inputSearchQuery"
      ref="inputSearchQuery"
      v-model="searchQuery"
      placeholder="入力してEnterで検索"
      @keyup.enter="enterInputSearchQuery"
      @keydown.up="shiftSelectedItem(-1, $event)"
      @keydown.down="shiftSelectedItem(1, $event)"
      @change="selectedBookmarkIndex = -1"
    >
    <div id="searchOptions">
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
      <div>
        <input
          type="checkbox"
          id="checkboxUseRegExpSearch"
          v-model="useRegExp"
        >
        <label for="checkboxUseRegExpSearch">正規表現を使用</label>
      </div>
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
      >
        <span v-if="state === 'loading'"
        >ブックマークを読み込んでいます…</span>
        <span v-else-if="bookmarks.length === 0 && state !== 'ready'"
        >一致するブックマークはありません</span>
      </div>
    </div>
  </div>
</template>

<script>
import BookmarkItem from './components/BookmarkItem.vue'
import { parseQuery } from './queryparser'
import asynchrome from './asynchrome'

/**
 * Chromeのブックマークツリーのノードを扱いやすい形式に変換します。
 */
function parseBookmarkNode(node, dirs) {
  if (!dirs) {
    dirs = []
  }
  const children = node.children
    ? node.children.map(child => {
      return parseBookmarkNode(child, [...dirs, node.title])
    })
    : null
  return {
    id: node.id,
    title: node.title,
    url: node.url,
    dirs,
    children,
  }
}

/**
 * Chromeのブックマークツリーを1つのリストにします。
 */
function flatBookmarksTree(tree, size) {
  const list = []
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
function findBookmarks(query, andOr, useRegExp) {
  if (!query || query.length === 0) {
    return []
  }
  const queries = query.split(/[　 ㅤ]+/g)
    .filter(q => q.length > 0)
    .map(q => parseQuery(q, useRegExp))
    .filter(q => q !== null)
  if (queries.length === 0) {
    return []
  }
  const condAndOr = andOr === 'OR'
    ? queries.some.bind(queries)
    : queries.every.bind(queries)
  return bookmarks.filter(bkm => {
    return condAndOr(query => query(bkm))
  })
}

/**
 * Chromeのブックマークを読み込んでBookmark Finderで扱う形式に変換します。
 */
async function loadBookmarks() {
  let nodes = await asynchrome.bookmarks.getTree()
  if (nodes.length === 1 && nodes[0].title === '' && nodes[0].children) {
    nodes = nodes[0].children
  }
  const parsedTree = nodes.map(node => parseBookmarkNode(node, []))
  bookmarks = flatBookmarksTree(parsedTree)
  return bookmarks
}

/**
 * URLを現在のタブか新しいタブで開きます。
 * @param url - 開くURL
 * @param newTab - 新しいタブで開くか(デフォルトで現在のタブ)
 * @param active - 新しいタブをアクティブにするか(デフォルトでアクティブにする)
 */
async function openURL(url, newTab, active) {
  if (newTab) {
    return await asynchrome.tabs.create({url, active})
  } else {
    return await asynchrome.tabs.update(null, {url})
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
      useRegExp: false,
      selectedBookmarkIndex: -1,
      state: 'loading',
    }
  },
  watch: {
    useRegExp(newValue) {
      this.saveSyncStorage('searchUseRegExp', newValue)
    },
    selectSearchOrAnd(newValue) {
      this.saveSyncStorage('searchOrAnd', newValue)
    },
  },
  async mounted() {
    const result = await asynchrome.storage.sync.get(['searchUseRegExp', 'searchOrAnd'])
    if (result.searchUseRegExp === undefined) {
      this.useRegExp = false
      this.saveSyncStorage('searchUseRegExp', false)
    } else {
      this.useRegExp = result.searchUseRegExp
    }
    if (result.searchOrAnd === undefined) {
      this.selectSearchOrAnd = 'AND'
      this.saveSyncStorage('searchOrAnd', 'AND')
    } else {
      this.selectSearchOrAnd = result.searchOrAnd
    }
    await loadBookmarks()
    this.state = 'ready'
    this.$refs.inputSearchQuery.focus()
  },
  methods: {
    openURL,
    async saveSyncStorage(key, value) {
      return await asynchrome.storage.sync.set({[key]: value})
    },
    find(q) {
      if (!q) {
        q = this.searchQuery
      }
      this.selectedBookmarkIndex = -1
      this.bookmarks = findBookmarks(q, this.selectSearchOrAnd, this.useRegExp)
      console.log(this.bookmarks)
      this.state = this.bookmarks.length > 0 ? 'result' : 'empty'
    },
    enterInputSearchQuery(ev) {
      if (this.selectedBookmarkIndex > -1) {
        openURL(this.bookmarks[this.selectedBookmarkIndex].url, ev.ctrlKey, !ev.shiftKey)
        return
      }
      this.find()
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

#searchOptions {
  display: flex;
}

#searchOptions>* {
  margin-right: 5px;
}

#bookmarkListNotice {
  text-align: center;
  color: 555;
}
</style>
