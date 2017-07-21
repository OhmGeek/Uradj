<template>
  <div id="app">
    <div class="app-header">
      UraDJ Jukebox System
    </div>
    <div class="page-container">
      <result-manager></result-manager>
    </div>
  </div>
</template>

<script>
import ResultManager from './components/ResultManager'
export default {
  name: 'app',
  components: {
    ResultManager
  }
}
</script>

<style>
html {
  width: 100%;
  top: 0;
  display: block;
}
body {
  background: #FEAC5E;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #4BC0C8, #C779D0, #FEAC5E);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #4BC0C8, #C779D0, #FEAC5E); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */




}
#app {

}

.app-header {
  width: 100%;
  background-color: #B243FF;
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
