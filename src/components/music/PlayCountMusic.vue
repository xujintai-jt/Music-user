<!--
 * @Author: xujintai
 * @Date: 2021-04-08 17:07:55
 * @LastEditors: xujintai
 * @LastEditTime: 2021-04-17 19:49:10
 * @Description: file content
 * @FilePath: \music-user\src\components\music\PlayCountMusic.vue
-->
<template>
  <div id="play-count-music">
    <!-- 搜索音乐 -->
    <h1>欢迎来到热门音乐板块</h1>
    <el-input placeholder="搜索音乐" prefix-icon="el-icon-search" v-model="searchName" clearable></el-input>
    <el-button type="primary" @click="searchSong()">搜索</el-button>
    <el-button type="primary" @click="getAllSong()">查看全部歌曲</el-button>
    <!-- 选择音乐风格 -->
    <div style="margin-bottom:20px">
      <h3>根据类别筛选音乐</h3>
      <el-radio-group v-model="musicStyle" @change="currentStyle">
        <el-radio-button label="传统"></el-radio-button>
        <el-radio-button label="儿歌"></el-radio-button>
        <el-radio-button label="民谣"></el-radio-button>
        <el-radio-button label="摇滚"></el-radio-button>
        <el-radio-button label="古风"></el-radio-button>
        <el-radio-button label="流行"></el-radio-button>
      </el-radio-group>
    </div>

    <!-- 歌曲数据表 -->
    <div style="width:100%;background-color:#f40;">
      <el-table :data="allSongs" class="song-table" style="width: 100%" border>
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column label="音乐名" prop="songName" align="center"></el-table-column>
        <el-table-column prop="artist" label="歌手" align="center"></el-table-column>
        <el-table-column align="center" width="120" label="音乐封面">
          <template slot-scope="scope">
            <img
              :src="'http://localhost:8633/api/music/poster?img=' + scope.row.poster"
              style="width:35px;height:35px;"
            />
          </template>
        </el-table-column>
        <el-table-column align="center" prop="language" label="音乐语种"></el-table-column>
        <el-table-column align="center" prop="style" label="音乐风格"></el-table-column>
        <el-table-column align="center" prop="playcount" label="音乐播放次数"></el-table-column>
        <el-table-column align="center" prop="date" label="音乐最近更新时间"></el-table-column>
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
  data() {
    return {
      isfirst: false,
      firstEdit: true,
      isCheckPassword: false,
      inputPassword: "",
      searchName: "",
      flag: "", // 用来判断是 添加, 编辑或删除
      noChangeSongs: [],
      toListen: false,
      toListenSrc: "",
      toListenPoster: "",
      allSongs: [],
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
      musicStyle: "",
    };
  },
  created() {
    this.getAllSong();
  },
  methods: {
    // 获取所有歌曲
    getAllSong() {
      this.$axios
        .get("http://localhost:8633/api/music/all")
        .then((res) => {
          if (res.data.length) {
            this.allSongs = res.data;
            this.noChangeSongs = res.data;
            this.allTableData = res.data;
            this.setPaginations();
          } else {
            console.error(res);
          }
        })
        .catch((err) => console.log(err));
    },
    // 设置当前页
    handleCurrentChange(page) {
      // 获取当前页
      let sortnum = this.paginations.page_size * (page - 1);
      let table = this.allTableData.filter((item, index) => {
        return index >= sortnum;
      });
      // 设置默认分页数据
      this.allSongs = table.filter((item, index) => {
        return index < this.paginations.page_size;
      });
      this.allSongs = table.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    // 改变每页条数
    handleSizeChange(page_size) {
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.allSongs = this.allTableData.filter((item, index) => {
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
      this.allSongs = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
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
      this.getAllSong();
    },
    //收藏音乐
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
    //搜索音乐
    searchSong() {
      console.log(this.searchName.trim());
      if (this.searchName.trim().length) {
        this.$axios
          .post("http://localhost:8633/api/music/search/byname", {
            searchName: this.searchName,
          })
          .then((res) => {
            this.allSongs = res.data;
            this.allTableData = res.data;
            this.setPaginations();
          });
      } else {
        this.$message.warning("搜索内容不能为空..");
      }
    },
    //监听音乐风格改变
    currentStyle(style) {
      console.log(style);
      this.getStyleMusic(style);
    },
    //获取类型音乐
    getStyleMusic(style) {
      this.$axios
        .post("http://localhost:8633/api/music/style", {
          style,
        })
        .then((res) => {
          console.log(res);
          this.allTableData = res.data;
          this.setPaginations();
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
#play-count-music {
  height: 100vh;
  background-color: #fef0f0;
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
}
</style>
