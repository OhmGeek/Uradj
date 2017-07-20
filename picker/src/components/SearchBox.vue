<template>
<div id="search-box">
  <form action="/" @submit='search'>
    <input type="text" placeholder="Search for a song here..." v-model="query" />
    <input type="submit" value="Search" />
  </form>
</div>
</template>

<script>

export default {
  name: 'search-box',
  data() {
    return {
      query: ""
    }
  },
  methods: {
    search(event) {
      event.preventDefault()
      // this.query is the value we want to search for
      this.$emit('search', this.query) //emit a searching event.
      // on finish, clear the search box
      this.query = "";
    }
  }
}
</script>


<style scoped>

</style>
