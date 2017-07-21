<template>
<div id="search-box">
  <form action="/" @submit='search'>
    <input class="text-input" type="text" placeholder="Search for a song here..." v-model="query" />
    <input class="btn-submit" type="submit" value="Search" />
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
#search-box {
  position: fixed;
  background-color: #C06430;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: -10px;
  width: 102%;
  margin-right: -10px;
  margin-top: -11px;
}
form {
  text-align: center;
}
.text-input {
  font-size: 16pt;

}
.btn-submit {
  font-size: 16pt;
  border: 0;
  background-color: #49E83E;
  color: black;
  font-weight: bolder;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}

</style>
