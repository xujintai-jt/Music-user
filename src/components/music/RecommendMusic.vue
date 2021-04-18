<!--
 * @Author: xujintai
 * @Date: 2021-04-15 14:05:53
 * @LastEditors: xujintai
 * @LastEditTime: 2021-04-18 19:17:37
 * @Description: file content
 * @FilePath: \music-user\src\components\music\RecommendMusic.vue
-->
<template>
  <div class="adminlikes">
    <h1>欢迎来到平台推荐音乐板块</h1>
    <!-- 搜索音乐 -->
    <el-input placeholder="搜索音乐" prefix-icon="el-icon-search" v-model="searchName" clearable></el-input>
    <el-button type="primary" @click="searchSong()">搜索</el-button>
    <el-button type="primary" @click="getAdminLikes()">查看全部歌曲</el-button>

    <!-- 歌曲数据表 -->
    <div style="width:100%;background-color:#f40;">
      <el-table :data="adminLikes" class="song-table" border style="width:99%">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <!-- <el-table-column prop="_id" label="音乐 ID" align="center" width="240"></el-table-column> -->
        <el-table-column label="音乐名" prop="songName" align="center"></el-table-column>
        <el-table-column prop="artist" label="歌手" align="center"></el-table-column>
        <!-- <el-table-column prop="src" align="center" label="音乐文件"></el-table-column> -->
        <el-table-column align="center" label="音乐封面">
          <template slot-scope="scope">
            <img
              :src="'http://localhost:8633/api/music/poster?img=' + scope.row.poster"
              style="width:35px;height:35px;"
            />
          </template>
        </el-table-column>
        <el-table-column align="center" prop="language" label="语种"></el-table-column>
        <el-table-column align="center" prop="style" label="风格"></el-table-column>
        <!-- <el-table-column align="center" prop="playcount" label="播放次数"></el-table-column> -->
        <el-table-column align="center" prop="date" label="最近更新时间"></el-table-column>
        <el-table-column label="播放" align="center">
          <template slot-scope="scope">
            <el-button @click="playMusic(scope.row)">{{scope.row.songName}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="收藏" align="center">
          <template slot-scope="scope">
            <el-button icon="el-icon-star-off" @click="collectionMusic(scope.row)"></el-button>
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
  name: "adminlikes",
  data() {
    return {
      audioIsShow: "",
      activeMusicId: "",
      activePosterSrc: "",
      songName: "",
      artist: "",
      isCheckPassword: false,
      inputPassword: "",
      searchName: "",
      adminLikes: [],
      allTableData: [],
      paginations: {
        // 分页属性
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 8, // 1页显示多少条
        page_sizes: [8, 15, 20, 25], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper", // 翻页属性
      },
      delRow: "",
      //当前播放的音乐id
      activeMusicId: "",
      activePosterSrc: "",
      //音乐播放器是否显示
      audioIsShow: false,
    };
  },
  created() {
    this.getAdminLikes();
  },
  methods: {
    //搜索音乐
    searchSong() {
      if (this.searchName.trim().length) {
        console.log(this.searchName);
        this.$axios
          .post("http://localhost:8633/api/admin/adminlike/search", {
            searchName: this.searchName,
          })
          .then((res) => {
            this.adminLikes = res.data;
            this.allTableData = res.data;
            this.setPaginations();
          });
      } else {
        this.$Message.warning("搜索内容不能为空");
      }
    },
    //获取所有喜欢音乐
    getAdminLikes() {
      this.$axios
        .get("http://localhost:8633/api/admin/adminlike/all")
        .then((res) => {
          this.adminLikes = res.data;
          this.allTableData = res.data;
          this.setPaginations();
        });
    },
    //添加音乐收藏
    async collectionMusic(row) {
      const { _id, mobile } = JSON.parse(localStorage.getItem("userInfo"));
      const musicid = row._id;
      const res = await this.$axios.post(
        "http://localhost:8633/api/music/userlike",
        {
          userid: _id,
          mobile,
          musicid,
          date: new Date(),
        }
      );
      const { data, status } = res;
      const { result } = data;
      if (status === 200) {
        //刷新表单数据,隐藏表单;刷新页面上的用户数据
        return this.$message({
          message: result,
          type: "success",
        });
      }

      this.$message({
        message: result,
        type: "warning",
      });
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
      this.getAdminLikes();
    },
    // 设置当前页
    handleCurrentChange(page) {
      // 获取当前页
      let sortnum = this.paginations.page_size * (page - 1);
      let table = this.allTableData.filter((item, index) => {
        return index >= sortnum;
      });
      // 设置默认分页数据
      this.adminLikes = table.filter((item, index) => {
        return index < this.paginations.page_size;
      });
      this.adminLikes = table.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    // 改变每页条数
    handleSizeChange(page_size) {
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.adminLikes = this.allTableData.filter((item, index) => {
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
      this.adminLikes = this.allTableData.filter((item, index) => {
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
<style lang="scss" scoped>
.adminlikes {
  width: 100%;
  height: 100%;
  .el-table {
    margin: 0;
    margin: auto;
    margin-top: 20px;
  }
}
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