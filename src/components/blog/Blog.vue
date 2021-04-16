<!--
 * @Author: xujintai
 * @Date: 2021-04-15 14:42:59
 * @LastEditors: xujintai
 * @LastEditTime: 2021-04-16 17:18:20
 * @Description: file content
 * @FilePath: \music-user\src\components\Blog\blog.vue
-->
<template>
  <div id="blog">
    <h1>欢迎来到音乐评论区首页</h1>
    <!-- 搜索音乐 -->
    <el-input placeholder="搜索音乐" prefix-icon="el-icon-search" v-model="searchName" clearable></el-input>
    <el-button type="primary" @click="searchSong()">搜索</el-button>
    <el-button type="primary" @click="getAllSong()">查看全部歌曲</el-button>
    <!-- 歌曲数据表 -->
    <div style="width:100%;background-color:#f40;">
      <el-table :data="allSongs" class="song-table" border>
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
        <el-table-column label="进入评论页面" align="center">
          <template slot-scope="scope">
            <el-button @click="musicComments(scope.row)">{{scope.row.songName}}</el-button>
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
    //进入音乐评论页面
    musicComments(row) {
      const musicId = row._id;
      const songName = row.songName;
      const artist = row.artist;
      const poster = row.poster;
      const playcount = row.playcount;
      this.$router.push({
        path: `blog/${musicId}/${songName}/${artist}/${poster}/${playcount}`,
        params: {
          musicId,
        },
      });
    },
  },
};
</script>

<style>
</style>