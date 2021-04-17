import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playRecord:[]
  },
  mutations: {
    addPlayRecord(state, payload) {
     //获取本地储存记录
      const { mobile } = JSON.parse(localStorage.getItem("userInfo"))
      const localRecord = JSON.parse(window.localStorage.getItem(`${mobile}playRecord`))
      let { playRecord } = state
      const { _id } = payload
      //本地已有播放记录则将播放记录传给vuex
       if (localRecord) {
         playRecord = localRecord
      }
       else {}
     
      //若是第一次添加音乐信息，设置音乐信息count为1，加入playRecord
      if (playRecord.length === 0) {
        payload.count = 1
        playRecord.push(payload)
      }
      //否则则判断音乐是否存在：1.存在则count++;2.不存在则添加一条记录
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
      window.localStorage.setItem(`${mobile}playRecord`,data)
    },
  },
  actions: {
  },
  modules: {
  }
})
