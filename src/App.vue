<template>
  <div id="app" >

    <router-view/>

  </div>
</template>

<script>

  export default {
    name: 'App',
  }
</script>

<style>
  *{padding: 0;margin: 0;box-sizing: border-box;-webkit-overflow-scrolling : touch;-webkit-appearance:none; }
  [data-dpr="1"] * {
    font-size: 14px;/*no*/
  }

  [data-dpr="2"] * {
    font-size: 28px;/*no*/
  }

  [data-dpr="3"] * {
    font-size: 42px;/*no*/
  }
  html,body,#app{width: 100%;height: 100%;overflow-x: hidden;}
  html,body{}
  ul li{list-style: none;}
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
</style>
