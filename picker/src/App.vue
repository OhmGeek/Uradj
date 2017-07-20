<template>
  <div id="app">
    <div class="app-header">
      UraDJ Jukebox System
    </div>
    <div class="page-container">
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html {
  width: 100%;
  top: 0;
  display: block;
}
#app {

}

.app-header {
  width: 100%;
  background-color: blue;
  top: 0px;
  left: 0px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: white;
  font-size: 18pt;
  text-align: center;
  position: fixed;
}

.page-container {
  padding-top: 50px;
}
</style>
