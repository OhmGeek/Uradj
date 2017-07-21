<template>
<a class="search-result" v-on:click="addToQueue">
  <div class="thumbnail-block">
    <img class="thumbnail" v-bind:src="thumbnailURL" />
  </div>
  <div class="song-details">
    <h2>{{name}}</h2>
    <p>
      {{description}}
    </p>
  </div>
</a>
</template>

<script>

export default {
  name: 'search-result',
  props: ['result'],
  data () {
    return {
      'name': this.result.name,
      'description': this.result.description,
      'thumbnailURL': this.result.thumbnailURL,
      'id': this.result.id
    }
  },
  methods: {
    addToQueue(event) {
      event.preventDefault();
      var infoToSend = {title: this.name, id: this.id}
      this.$emit('addToQueue',infoToSend);
    }
  }
}
</script>

<style scoped>
.search-result {
  width: 100%;
  display: block;
  clear: right;
  background-color: #0A88CF;
  margin-top: 10px;
  margin-bottom: 10px;
  color: black;
  padding-top: 20px;
  padding-bottom: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(1,1,1, 0.19);
  border-radius: 15px 50px 50px 15px;
}
.search-result:hover {
  background-color: #38A5CF;
  -o-transition:.3s;
 -ms-transition:.3s;
 -moz-transition:.3s;
 -webkit-transition:.3s;
 transition:.3s;
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
  padding-left: 20px;
  vertical-align: middle;
}

p {
  display: none;
}
h2 {
  font-size: 2.5rem;

}
</style>
