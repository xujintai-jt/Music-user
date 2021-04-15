<!--
 * @Author: xujintai
 * @Date: 2021-04-08 16:17:44
 * @LastEditors: xujintai
 * @LastEditTime: 2021-04-15 13:28:54
 * @Description: file content
 * @FilePath: \music-user\src\components\user-index\UserIndex.vue
-->
<template>
  <div id="user-index">
    <Navigation />
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "@/components/navigation/Navigation.vue";
export default {
  data() {
    return {
      imgs: [
        { id: 1, url: "/img/轮播图1.fee3ddec.jpg" },
        { id: 2, url: "/img/轮播图2.d4d1c428.jpg" },
        { id: 3, url: "/img/轮播图3.9296d787.jpg" },
        { id: 4, url: "/img/轮播图4.76aa3321.jpg" },
      ],
    };
  },
  components: {
    Navigation,
  },
};
</script>

<style scoped="scoped" lang="scss">
.el-carousel__item {
  h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  img {
    width: 100%;
    height: 100%;
  }
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.hidden {
  visibility: hidden;
}
</style>
