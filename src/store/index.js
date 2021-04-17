import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playRecord:[]
  },
  mutations: {
    addPlayRecord(state, payload) {
      const { _id } = payload
      const { playRecord } = state
      //第一次添加音乐信息，设置音乐信息count为1，加入playRecord
      if (playRecord.length === 0) {
        payload.count = 1
        playRecord.push(payload)
      }
      else {
          const index =  playRecord.findIndex((item, index) => {
          //判断playRecord是否已存在此音乐信息,若存在返回index、否则返回-1
            return item._id === _id
          })
        
         if (index!==-1) {
           playRecord[index].count++
         }
         else {
           payload.count = 1
           playRecord.push(payload)
         }
      }
      console.log(playRecord);
      //本地持久化储存播放记录
      const data = JSON.stringify(playRecord)
      const {mobile} = JSON.parse(localStorage.getItem("userInfo"))
      window.localStorage.setItem(`${mobile}playRecord`,data)
    }
  },
  actions: {
  },
  modules: {
  }
})
