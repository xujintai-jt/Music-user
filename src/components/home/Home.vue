<!--
 * @Author: xujintai
 * @Date: 2021-04-15 13:39:06
 * @LastEditors: xujintai
 * @LastEditTime: 2021-04-15 14:07:12
 * @Description: file content
 * @FilePath: \music-user\src\components\home\Home.vue
-->
<template>
  <div id="home">
    <swiper />
    <RecommendMusic />
  </div>
</template>

<script>
import Swiper from "@/components/swiper/UserIndexSwiper.vue";
import RecommendMusic from "@/components/music/RecommendMusic.vue";
export default {
  components: {
    Swiper,
    RecommendMusic,
  },
};
</script>

<style>
</style>