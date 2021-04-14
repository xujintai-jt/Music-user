<!--
 * @Author: xujintai
 * @Date: 2021-04-08 16:44:39
 * @LastEditors: xujintai
 * @LastEditTime: 2021-04-14 21:15:22
 * @Description: file content
 * @FilePath: \music-shop\src\components\navigation\Navigation.vue
-->
<template>
  <div id="navigation">
    <div class="line"></div>
    <el-menu class="el-menu-demo" mode="horizontal" background-color="#242424" text-color="#ffd04b">
      <el-menu-item index="1">
        <span @click="$router.push('/music')">发现音乐</span>
      </el-menu-item>
      <el-menu-item index="2" disabled>消息中心</el-menu-item>
      <el-menu-item index="3">
        <span @click="$router.push('/musician')">音乐人</span>
      </el-menu-item>
      <el-menu-item index="4">
        <span @click="$router.push('/login')">注销</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
