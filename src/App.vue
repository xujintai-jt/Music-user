<!--
 * @Author: xujintai
 * @Date: 2021-03-31 15:26:58
 * @LastEditors: xujintai
 * @LastEditTime: 2021-04-08 16:59:27
 * @Description: file content
 * @FilePath: \music-fontEnd\music-shop\src\App.vue
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #409eff;
    }
  }
}
</style>
