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
    />
    <div id="options">
      <div id="searchOptions">
        <div id="selectSearchOrAnd">
          <input
            type="radio"
            id="selectSearchOrAnd-AND"
            value="AND"
            v-model="selectSearchOrAnd"
          />
          <label for="selectSearchOrAnd-AND">AND</label>
          <input
            type="radio"
            id="selectSearchOrAnd-OR"
            value="OR"
            v-model="selectSearchOrAnd"
          />
          <label for="selectSearchOrAnd-OR">OR</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="checkboxUseRegExpSearch"
            v-model="useRegExp"
          />
          <label for="checkboxUseRegExpSearch">正規表現</label>
        </div>
      </div>
      <div id="ctrlOptions">
        <!--div id="globalMenuOpener" @click="openGlobalMenu">
          <img src="./assets/menu-open.png">
        </div-->
        <div
          id="bkmTitleReplacerOpener"
          @click="showBkmTitleReplacer ^= true"
        >
          <img src="./assets/find-replace.png">
        </div>
      </div>
    </div>
    <div id="bkmTitleReplacer" v-show="showBkmTitleReplacer">
      <input
        class="pattern"
        placeholder="置換される文字列"
        v-model="bkmTitleReplacerPattern"
      >
      <input
        class="replacement"
        placeholder="置換する文字列"
        v-model="bkmTitleReplacerReplacement"
      >
      <button @click="replaceBkmTitle()" :disabled="invalidateReplacer"
        >置換</button
      >
    </div>
    <div id="bookmarkList" :class="{ empty: bookmarksEmpty }">
      <BookmarkItem
        v-for="(item, i) in bookmarks"
        :key="item.id"
        :item="item"
        :class="{ selected: i === selectedBookmarkIndex }"
        @openurl="onOpenUrlByBkm"
      />
      <div id="bookmarkListNotice">
        <span v-if="state === 'loading'">ブックマークを読み込んでいます…</span>
        <span v-else-if="bookmarksEmpty && state !== 'ready'"
          >一致するブックマークはありません</span
        >
      </div>
    </div>
    <!--vue-context ref="globalMenu">
      <li>
        <a href="#" @click.prevent="showBkmTitleReplacer ^= true">
          表示中のブックマークタイトルを一括置換
        </a>
      </li>
    </vue-context-->
  </div>
</template>

<script>
// import {VueContext} from 'vue-context'
import BookmarkItem from './components/BookmarkItem.vue'
import {parseBookmarkNode, flatBookmarksTree, findBookmarks} from './bookmarks'
import {Locker, exclusive} from './exclusive'
import asynchrome from './asynchrome'

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

const lockerReplaceBkmTitle = new Locker()

export default {
  name: 'app',
  components: {
    BookmarkItem,
//     VueContext,
  },
  data() {
    return {
      bookmarks: [],
      searchQuery: '',
      selectSearchOrAnd: 'AND',
      useRegExp: false,
      selectedBookmarkIndex: -1,
      state: 'loading',
      showBkmTitleReplacer: false,
      bkmTitleReplacerPattern: '',
      bkmTitleReplacerReplacement: '',
      isReplacing: false,
    }
  },
  computed: {
    bookmarksEmpty() {
      return this.bookmarks.length === 0
    },
    invalidateReplacer() {
      return this.bkmTitleReplacerPattern === ''
    },
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
    const result = await asynchrome.storage.sync.get([
      'searchUseRegExp',
      'searchOrAnd',
    ])
    const load = (key, defaultValue, vueKey) => {
      if (result[key] === undefined) {
        this[vueKey] = defaultValue
        this.saveSyncStorage(key, defaultValue)
      } else {
        this[vueKey] = result[key]
      }
    }
    load('searchUseRegExp', false, 'useRegExp')
    load('searchOrAnd', 'AND', 'selectSearchOrAnd')
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
      this.bookmarks = findBookmarks(
        bookmarks, q, this.selectSearchOrAnd, this.useRegExp
      )
      console.log(this.bookmarks)
      this.state = this.bookmarksEmpty ? 'empty' : 'result'
    },
    enterInputSearchQuery(ev) {
      if (this.selectedBookmarkIndex > -1) {
        openURL(
          this.bookmarks[this.selectedBookmarkIndex].url,
          ev.ctrlKey, // newTab
          !ev.shiftKey // activate
        )
        return
      }
      this.find()
    },
    openGlobalMenu(ev) {
      this.$refs.globalMenu.open(ev)
    },
    async replaceBkmTitle(pattern, replacement) {
      if (this.bookmarksEmpty || pattern === '') {
        return
      }
      if (!confirm('本当に表示中のブックマークの名前を置換しますか？')) {
        return
      }
      exclusive(lockerReplaceBkmTitle, () => {
        if (!pattern) pattern = this.bkmTitleReplacerPattern
        if (!replacement) replacement = this.bkmTitleReplacerReplacement
        return this.bookmarks.map((bookmark, i) => {
          return new Promise((resolve, reject) => {
            const replaced = bookmark.title.replace(pattern, replacement)
            if (replaced !== bookmark.title) {
              chrome.bookmarks.update(
                bookmark.id,
                {title: replaced},
                result => {
                  bookmark.title = replaced
                  resolve(true)
                }
              )
            } else {
              resolve(false)
            }
          })
        })
      }, [], {waitAll: true})
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

label {
  position: relative;
  top: -2px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
}

#inputSearchQuery {
  margin-bottom: 4px;
}

#options {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#searchOptions {
  display: flex;
}

#searchOptions > * {
  margin-right: 5px;
}

#globalMenuOpener img {
  margin: -4px 0;
}

#bkmTitleReplacer {
  display: flex;
  margin-bottom: 4px;
}

#bkmTitleReplacer input {
  flex: 1;
}

#bookmarkList:not(.empty) {
  border-top: 1px solid #DDD;
}

#bookmarkListNotice {
  text-align: center;
  color: 555;
}
</style>
