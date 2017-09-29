<template>
<div class="result-manager">
  <search-box @search="onSearch"></search-box>
  <div class="results">
    <search-result v-for="result in results" v-bind:result="result" v-bind:key="result.id" @addToQueue="onAddToQueue"></search-result>
  </div>
</div>
</template>

<script>
import SearchBox from './SearchBox'
import SearchResult from './SearchResult'
import axios from 'axios'

const URADJ_URL = window.location.origin
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
      this.results = []; // clear previous results.
      axios.get(URADJ_URL + '/api/searchMusic', {
        params: {
          q: searchQuery
        }
      }).then( (response) => {
          // go through each item
          for (var index in response.data) {
              // create a result object
              var item = response.data[index];
              var itemToAdd = {
                name: item.title,
                description: item.description,
                thumbnailURL: item.thumbnails.high.url,
                id: item.id
              }
              // add it to the set of results.
              this.results.push(itemToAdd);
            }
      });
      // get results back

    },
    onAddToQueue(info) {
      axios.post(URADJ_URL + '/api/addSong', info).then( (response) => {
        if(response.data.err) {
          this.$swal({
            title: "Oops...",
            text: "This song is already queued up!",
            type: "error",
          }).then();
        }
        else {
          this.$swal({
            title: "Song Added",
            text: "We've added your song to the queue!",
            type: "success",
          }).then();
        }
      });
    }
  }
}
</script>

<style scoped>
.results {
  padding-top: 10ch;
}
</style>
