<template>
  <div class="bookmarkItem" @click="onClickItem">
    <span class="icon"><img :src="favicon"/></span>
    <span class="title">{{ item.title }}</span>
    <div class="menuOpener">
      <img src="../assets/dots-vertical.png">
    </div>
  </div>
  <div v-if="showingMenu">
    <button></button>
  </div>
</template>

<script>
export default {
  name: 'BookmarkItem',
  props: {
    item: {
      type: null,
      required: true,
      showingMenu: false,
    },
  },
  computed: {
    favicon() {
      return 'chrome://favicon/' + this.item.url
    },
  },
  methods: {
    onClickItem(ev) {
      if (ev.target.classList.contains('menuOpener')) {
        return
      }
      this.$emit('openurl', {
        url: this.item.url,
        newTab: ev.ctrlKey,
        active: !ev.shiftKey,
      })
      return false
    },
  },
}
</script>

<style scoped>
.bookmarkItem {
  margin: 4px 0;
  display: flex;
}

.icon {
  margin-right: 2px;
}

.bookmarkItem.selected {
  background-color: #ddd;
}

.title {
  flex: 1;
}

.menuOpener img {
  width: 18px;
}
</style>
