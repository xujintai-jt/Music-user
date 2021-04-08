<!--
 * @Author: xujintai
 * @Date: 2021-03-31 15:26:58
 * @LastEditors: xujintai
 * @LastEditTime: 2021-04-01 15:51:25
 * @Description: file content
 * @FilePath: \music-fontEnd\music-shop\src\App.vue
-->
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/login">登陆</router-link>|
      <router-link to="/registered">注册</router-link>
    </div>
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
