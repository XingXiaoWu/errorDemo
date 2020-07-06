<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div @click="click1">点击我触发错误1:undefined</div>
    <div @click="click2">点击我触发错误2:setTimeOut</div>
    <div @click="click3">点击我触发错误3:promise没有reject</div>
    <div @click="click4">点击我触发错误4:网络请求</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  components: {
  },
  methods:{
    click1(){
      let a = {}
      console.log(a.b.c)
    },
    click2(){
      setTimeout(()=>{
        let a = {}
        console.log(a.b.c)
      },2000)
    },
    click3(){
      this.testPromise()
    },
    click4(){
      axios.post('https://www.baidu.com')
    },
    testPromise(){
      let promise = new Promise(()=>{
        throw Error('promise')
      })
      return promise
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
