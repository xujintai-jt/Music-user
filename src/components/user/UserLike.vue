<!--
 * @Author: xujintai
 * @Date: 2021-04-16 17:20:27
 * @LastEditors: xujintai
 * @LastEditTime: 2021-04-17 11:26:05
 * @Description: file content
 * @FilePath: \music-user\src\components\user\UserLike.vue
-->
<template>
  <div id="user-like">
    <h1>欢迎来到您的音乐收藏</h1>
    <!-- 歌曲数据表 -->
    <div style="width:100%;background-color:#f40;">
      <el-table :data="allTableData" class="song-table" border>
        <el-table-column label="序号" type="index" align="center"></el-table-column>
        <el-table-column label="音乐名" prop="songName" align="center"></el-table-column>
        <el-table-column label="歌手" prop="artist" align="center"></el-table-column>
        <el-table-column label="音乐封面" align="center">
          <template slot-scope="scope">
            <img
              :src="'http://localhost:8633/api/music/poster?img=' + scope.row.poster"
              style="width:35px;height:35px;"
            />
          </template>
        </el-table-column>
        <el-table-column align="center" prop="language" label="语种"></el-table-column>
        <el-table-column align="center" prop="style" label="风格"></el-table-column>
        <el-table-column align="center" prop="playcount" label="播放次数"></el-table-column>
        <el-table-column align="center" prop="date" label="收藏时间"></el-table-column>
        <el-table-column label="播放" align="center">
          <template slot-scope="scope">
            <el-button @click="playMusic(scope.row)">{{scope.row.songName}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="取消收藏" align="center">
          <template slot-scope="scope">
            <el-button icon="el-icon-star-off" @click="cancelCollection(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <el-pagination
      v-if="paginations.total > 0"
      :page-sizes="paginations.page_sizes"
      :page-size="paginations.page_size"
      :layout="paginations.layout"
      :total="paginations.total"
      :current-page.sync="paginations.page_index"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>

    <!-- 播放器 -->
    <div class="music-audio" v-if="audioIsShow">
      <div class="music-audio-right">
        <img :src="activePoster" class="audioPoster" />
        <!-- 歌手信息 -->
        <div>
          <i class="el-icon-service"></i>
          <span style="margin-left:8px">{{artist}} - {{songName}}</span>
        </div>
        <i class="el-icon-loading"></i>
      </div>
      <audio
        autoplay="autoplay"
        id="audio"
        controls="controls"
        loop="loop"
        preload="auto"
        :src="activeMusicSrc"
      ></audio>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userlikes: [],
      allTableData: [],
      paginations: {
        // 分页属性
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 8, // 1页显示多少条
        page_sizes: [8, 15, 20, 25], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper", // 翻页属性
      },
      //当前播放的音乐id
      activeMusicId: "",
      activePosterSrc: "",
      //音乐播放器是否显示
      audioIsShow: false,
      userid: "",
    };
  },
  created() {
    //获取用户信息
    this.userid = JSON.parse(localStorage.getItem("userInfo"))._id;
    this.getUserLike();
  },
  methods: {
    //获取用户收藏音乐
    getUserLike() {
      this.$axios
        .get(`http://localhost:8633/api/music/userlike?userid=${this.userid}`)
        .then((res) => {
          this.allTableData = res.data.result;
          //初始化页码的total数
          this.setPaginations();
        })
        .catch((err) => console.log(err));
    },
    //取消音乐收藏
    cancelCollection(row) {
      const musicid = row._id;
      this.$confirm("您确定要取消该音乐收藏吗", "取消音乐收藏提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //发起取消音乐收藏请求
          this.$axios
            .post(`http://localhost:8633/api/music/userlike/del`, {
              musicid,
              userid: this.userid,
            })
            .then((res) => {
              const { status, result } = res.data;
              if (status !== 200) {
                return this.$message({
                  message: "收藏音乐移除失败！",
                  type: "danger",
                });
              }
              //音乐收藏移除成功，刷新音乐收藏页面
              this.getUserLike();
              this.$message({
                message: result,
                type: "success",
              });
            })
            .catch((err) => console.log(err));
        })
        .catch(() => {});
    },
    //播放音乐
    playMusic(row) {
      //点击播放显示播放器
      this.audioIsShow = true;
      this.activeMusicId = row._id;
      this.activePosterSrc = row.poster;
      this.songName = row.songName;
      this.artist = row.artist;
      //将播放音乐信息保存进入vuex
      this.$store.commit("addPlayRecord", row);
      //刷新页面获取最新播放次数信息
      this.getUserLike();
    },
    // 设置当前页
    handleCurrentChange(page) {
      // 获取当前页
      let sortnum = this.paginations.page_size * (page - 1);
      let table = this.allTableData.filter((item, index) => {
        return index >= sortnum;
      });
      // 设置默认分页数据
      this.userLikes = table.filter((item, index) => {
        return index < this.paginations.page_size;
      });
      this.userLikes = table.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    // 改变每页条数
    handleSizeChange(page_size) {
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.userLikes = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    // 设置的分页
    setPaginations() {
      // 总页数
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 8;
      // 设置默认分页数据
      this.userLikes = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
  },
  computed: {
    activeMusicSrc() {
      return `http://localhost:8633/api/music/nowmusic?id=${this.activeMusicId}`;
    },
    activePoster() {
      return `http://localhost:8633/api/music/poster?img=${this.activePosterSrc}`;
    },
  },
};
</script>

<style scoped lang="scss">
.music-audio {
  display: flex;
  width: 60vw;
  margin: 0;
  margin: auto;
  margin-top: 100px;
  justify-content: space-around;
  color: #c20c0c;
  .music-audio-right {
    width: 20vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .audioPoster {
      width: 35px;
      height: 35px;
    }
  }
}
</style>
