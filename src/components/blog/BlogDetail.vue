<!--
 * @Author: xujintai
 * @Date: 2021-04-15 21:37:23
 * @LastEditors: xujintai
 * @LastEditTime: 2021-04-16 12:12:38
 * @Description: file content
 * @FilePath: \music-user\src\components\blog\BlogDetail.vue
-->
<template>
  <div id="blog-detail">
    <div class="musicInfo">
      <h1>音乐信息区域</h1>
    </div>
    <div class="remark">
      <h1>音乐评论区</h1>
      <div class="addremark">
        <header>
          <img src="@/assets/imgs/评论头像.jpg" alt style="{height:50px;width:50px;margin-right:10px;}" />
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="remarks"
          ></el-input>
        </header>
        <footer>
          <el-button type="primary">评论</el-button>
        </footer>
      </div>
      <h1>评论信息区</h1>
      <div class="remarkInfo">
        <div>
          <header>
            <span>用户名：</span>
            <span>评论信息</span>
            <el-button>删除</el-button>
          </header>
          <footer>
            <span>评论时间</span>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      remarks: "",
    };
  },
  created() {
    console.log(this.$route.params);
  },
};
</script>

<style scoped lang="scss">
#blog-detail {
  .remark {
    width: 50vw;
    margin: 0;
    margin: auto;
    background-color: rgb(228, 225, 225);

    .addremark {
      width: 50vw;
      header {
        margin: 25px 0;
        .el-textarea {
          width: 35vw;
          border: 2px;
        }
      }

      .el-button {
        margin-left: 550px;
      }
    }

    .remarkInfo {
      width: 50vw;
    }
  }
}

textarea.el-textarea__inner {
  height: 20vh !important;
}
</style>