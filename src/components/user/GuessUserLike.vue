<!--
 * @Author: xujintai
 * @Date: 2021-04-17 10:34:23
 * @LastEditors: xujintai
 * @LastEditTime: 2021-04-18 19:20:30
 * @Description: file content
 * @FilePath: \music-user\src\components\user\GuessUserLike.vue
-->
<template>
  <div id="guess-userlike">
    <div v-if="allTableData.length>0">
      <h1>欢迎您来到猜您喜欢板块</h1>
      <!-- 歌曲数据表 -->
      <div style="width:100%;background-color:#f40;">
        <el-table :data="allTableData" class="song-table" style="width: 99%" border>
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
          <el-table-column align="center" prop="count" label="您此次登录播放的音乐次数"></el-table-column>
          <el-table-column label="收藏" align="center">
            <template slot-scope="scope">
              <el-button icon="el-icon-star-off" @click="collectionMusic(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div v-else style="color:red">
      <h1>您此次登录还未播放过音乐，请尝试播放音乐后再来哦！</h1>
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

    <!-- 页面跳转 -->
    <footer v-if="allTableData.length>0">
      <h2>根据您此次登录的播放记录，我们猜测您可能喜欢{{activeStyle}}类的歌曲，因此我们向您推荐这些歌曲</h2>
      <el-button class="el-button el-button--success is-plain" @click="userRecommend">推荐入口</el-button>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allTableData: [],
      //播放记录中记录数最多的音乐类型
      activeStyle: "",
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
    this.handleUserLikes();
  },
  methods: {
    //获取音乐播放记录
    handleUserLikes() {
      const { mobile } = JSON.parse(localStorage.getItem("userInfo"));
      const playRecord = JSON.parse(
        localStorage.getItem(`${mobile}playRecord`)
      );
      if (playRecord) {
        this.compareHandle(playRecord);
        this.allTableData = playRecord;
        this.activeStyle = this.allTableData[0].style;
        console.log(this.activeStyle);
      }
      this.setPaginations();
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
    //复杂对象数组比较函数
    compareHandle(targetArr) {
      //设置比较函数(降序)
      const compare = (prop) => {
        return (obj1, obj2) => {
          var val1 = obj1[prop];
          var val2 = obj2[prop];
          if (val1 < val2) {
            return 1;
          } else if (val1 > val2) {
            return -1;
          } else {
            return 0;
          }
        };
      };
      targetArr.sort(compare("count"));
    },
    userRecommend() {
      this.$router.push({
        name: "user-recommend",
        params: { style: this.activeStyle },
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
#guess-userlike {
  height: 100vh;
  background-color: rgb(246, 240, 224);
  .el-table {
    margin: 0;
    margin: auto;
    margin-top: 20px;
  }
}
</style>>
</style>