<template>
  <a
    class="outer"
    :href="item.url"
    @click="onClickLink($event)"
  >
    <div class="bookmarkItem" :id="'bkm-' + item.id">
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
      this.$emit('openurl', {
        url: item.url,
        newTab: ev.ctrlKey,
        active: !ev.shiftKey,
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
