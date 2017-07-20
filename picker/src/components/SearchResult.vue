<template>
<div class="search-result">
  <img class="thumbnail" v-bind:src="thumbnailURL" />
  <h2>{{name}}</h2>
  <p>
    {{description}}
  </p>
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

</style>
