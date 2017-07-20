<template>
<div class="result-manager">
  <search-box @search="onSearch"></search-box>
  <div class="results">
    <search-result v-for="result in results" v-bind:result="result" v-bind:key="result.name"></search-result>
  </div>
</div>
</template>

<script>
import SearchBox from './SearchBox'
import SearchResult from './SearchResult'

export default {
  name: 'result-manager',
  components: {
    SearchBox, SearchResult
  },
  data () {
    return {
      results: [{name: "abc", description: "desc", "thumbnailURL": "asdf.jpg"}]
    }
  },
  methods: {
    onSearch(searchQuery) {
      // make an ajax request to the server

      // get results back
    }
  }
}
</script>

<style scoped>

</style>
