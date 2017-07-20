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
import axios from 'axios'

const URADJ_URL = 'http://summerball.herokuapp.com';
export default {
  name: 'result-manager',
  components: {
    SearchBox, SearchResult
  },
  data () {
    return {
      results: []
    }
  },
  methods: {
    onSearch(searchQuery) {
      // make an ajax request to the server
      axios.get(URADJ_URL + '/api/searchMusic', {
        params: {
          q: searchQuery
        }
      }).then( (response) => {
        if(err) {
          // throw an error.
        } else {
          // go through each item
          for (var item in response) {
            if (object.hasOwnProperty(item)) {
              // create a result object
              var itemToAdd = {
                name: item.name,
                description: item.description,
                thumbnailURL: item.thumbnails.high.url
              }
              // add it to the set of results.
              this.results.push(itemToAdd);
            }
          }
        }
      });
      // get results back

    }
  }
}
</script>

<style scoped>

</style>
