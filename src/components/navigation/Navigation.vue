<!--
 * @Author: xujintai
 * @Date: 2021-04-08 16:44:39
 * @LastEditors: xujintai
 * @LastEditTime: 2021-04-16 14:59:46
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
        <span @click="$router.push('/user-index/play-count-music')">热门音乐</span>
      </el-menu-item>
      <el-menu-item index="3">
        <span @click="$router.push('/user-index/blog')">音乐评论区</span>
      </el-menu-item>
      <el-menu-item index="3">
        <span @click="$router.push('/user-index/user-info')">个人信息</span>
      </el-menu-item>
      <el-menu-item index="3">
        <span @click="$router.push('/user-index/user-info')">个人收藏</span>
      </el-menu-item>
      <el-menu-item index="4">
        <span @click="logout()">注销</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$confirm("您确定要退出登录吗", "退出提示", {
        confirmButtonText: "退出",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          window.localStorage.removeItem("userInfo");
          this.$router.push("/login");
        })
        .catch(() => {});
    },
  },
};
</script>

<style>
</style>
