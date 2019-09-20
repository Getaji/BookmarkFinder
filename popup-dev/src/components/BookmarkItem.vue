<template>
  <a
    class="outer"
    :href="item.url"
    @click="onClickLink"
  >
    <div class="bookmarkItem">
      <span class="icon"><img :src="favicon"></span>
      <span class="title">{{ item.title }}</span>
    </div>
  </a>
</template>

<script>
export default {
  name: 'BookmarkItem',
  props: {
    item: null,
    required: true
  },
  computed: {
    favicon() { return 'chrome://favicon/' + this.item.url }
  },
  methods: {
    onClickLink(ev) {
      ev.preventDefault()
      this.$emit('openurl', {
        url: this.item.url,
        newTab: ev.ctrlKey,
        active: !ev.shiftKey,
      })
      return false
    }
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
}

.bookmarkItem {
  margin: 4px 0;
}

.icon {
  margin-right: 2px;
}

.outer.selected .bookmarkItem {
  background-color: #DDD;
}
</style>
