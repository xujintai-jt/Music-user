<!--
 * @Author: xujintai
 * @Date: 2021-04-17 20:12:09
 * @LastEditors: xujintai
 * @LastEditTime: 2021-04-17 21:02:31
 * @Description: file content
 * @FilePath: \music-user\src\components\swiper\EudSwiper.vue
-->
<template>
  <div id="edu-swiper">
    <el-carousel :interval="4000" type="card" height="325px">
      <el-carousel-item v-for="item in imgs" :key="item.id">
        <img :src="item.url" alt />
      </el-carousel-item>
    </el-carousel>
    <div class="none">
      <img src="@/assets/imgs/教育图1.jpg" alt />
      <img src="@/assets/imgs/教育图2.jpg" alt />
      <img src="@/assets/imgs/教育图3.jpg" alt />
      <img src="@/assets/imgs/教育图4.jpg" alt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgs: [
        { id: 1, url: "/img/教育图1.850d7cec.jpg" },
        { id: 2, url: "/img/教育图2.0dae11a1.jpg" },
        { id: 3, url: "/img/教育图3.fd6be54e.jpg" },
        { id: 4, url: "/img/教育图4.9950c452.jpg" },
      ],
    };
  },
};
</script>

<style scoped="scoped" lang="scss">
.el-carousel__container {
  height: 730px !important;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
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

img {
  width: 100%;
  height: 100%;
}
</style>