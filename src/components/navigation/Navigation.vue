<!--
 * @Author: xujintai
 * @Date: 2021-04-08 16:44:39
 * @LastEditors: xujintai
 * @LastEditTime: 2021-04-15 14:46:18
 * @Description: file content
 * @FilePath: \music-user\src\components\navigation\Navigation.vue
-->
<template>
  <div id="navigation">
    <div class="line"></div>
    <el-menu class="el-menu-demo" mode="horizontal" background-color="#242424" text-color="#ffd04b">
      <el-menu-item index="1">
        <span @click="$router.push('/user-index/home')">首页</span>
      </el-menu-item>
      <el-menu-item index="1">
        <span @click="$router.push('/user-index/play-count-music')">发现音乐</span>
      </el-menu-item>
      <el-menu-item index="3">
        <span @click="$router.push('/user-index/blog')">发布评论</span>
      </el-menu-item>
      <el-menu-item index="3">
        <span @click="$router.push('/user-index/user-info')">个人信息</span>
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
