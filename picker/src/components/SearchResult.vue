<template>
<div class="search-result">
  <div class="thumbnail-block">
    <img class="thumbnail" v-bind:src="thumbnailURL" />
  </div>
  <div class="song-details">
    <h2>{{name}}</h2>
    <p>
      {{description}}
    </p>
  </div>
</div>
</template>

<script>

export default {
  name: 'search-result',
  props: ['result'],
  data () {
    return {
      'name': this.result.name,
      'description': this.result.description,
      'thumbnailURL': this.result.thumbnailURL
    }
  }
}
</script>

<style scoped>
.search-result {
  width: 100%;
  display: block;
  clear: right;
  background-color: red;
  margin-top: 10px;
  margin-bottom: 10px;
}

.song-details {
  height: 100%;
  display: inline-block;
  padding-left: 10px;
}
.thumbnail-block {
  display: inline-block;
  width: auto;
  height: 100%;
  left: 0;
  top: 0;
}
.thumbnail {
  top: 0;
  height: 100px;

  vertical-align: middle;
}

p {
  display: none;
}
h2 {
  font-size: 1rem;

}
</style>
