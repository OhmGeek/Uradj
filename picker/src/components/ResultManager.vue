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
import swal from 'sweetalert2'

const URADJ_URL = window.location.origin
export default {
  name: 'result-manager',
  components: {
    SearchBox, SearchResult
  },
  data () {
    return {
      results: [{name: 'Name 1', description: 'Description 1', thumbnailURL: 'https://i.ytimg.com/vi/olit-B5Yldc/hqdefault.jpg'},
    {name: 'Name 1', description: 'Description 1', thumbnailURL: 'https://i.ytimg.com/vi/olit-B5Yldc/hqdefault.jpg'}]
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
        if(response.err && resp.err === "Song already queued") {
          swal({
            title: "Oops...",
            text: "This song is already queued up!",
            type: "error",
            timer: 2000
          });
        }
        else {
          swal({
            title: "Song Added",
            text: "We've added your song to the queue!",
            type: "success",
            timer: 2000
          })
        }
      });
    }
  }
}
</script>

<style scoped>
.results {
  padding-top: 45px;
}
</style>
