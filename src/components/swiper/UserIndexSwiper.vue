<!--
 * @Author: xujintai
 * @Date: 2021-04-15 13:32:55
 * @LastEditors: xujintai
 * @LastEditTime: 2021-04-15 14:08:50
 * @Description: file content
 * @FilePath: \music-user\src\components\swiper\UserIndexSwiper.vue
-->
<template>
  <div id="userIndex-swiper">
    <el-carousel :interval="4000" type="card" height="325px">
      <el-carousel-item v-for="item in imgs" :key="item.id">
        <img :src="item.url" alt />
      </el-carousel-item>
    </el-carousel>
    <div class="none">
      <img src="@/assets/imgs/轮播图1.jpg" alt />
      <img src="@/assets/imgs/轮播图2.jpg" alt />
      <img src="@/assets/imgs/轮播图3.jpg" alt />
      <img src="@/assets/imgs/轮播图4.jpg" alt />
    </div>
  </div>
</template>

<script>
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
.none {
  display: none;
}
</style>