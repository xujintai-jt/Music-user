<!--
 * @Author: xujintai
 * @Date: 2021-04-08 17:07:55
 * @LastEditors: xujintai
 * @LastEditTime: 2021-04-08 17:41:55
 * @Description: file content
 * @FilePath: \music-fontEnd\music-shop\src\components\music\Music.vue
-->
<template>
  <div id="music">
    <div>
      <div>
        <span>黄种人--谢霆锋</span>
        <el-button type="primary" icon="el-icon-star-on">收藏</el-button>
        <el-button type="primary" icon="el-icon-star-on">已收藏</el-button>
      </div>
      <audio
        autoplay="autoplay"
        controls="controls"
        loop="loop"
        preload="auto"
        src="@/assets/music/黄种人.mp3"
      ></audio>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
