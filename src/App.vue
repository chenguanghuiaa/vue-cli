<template>
  <div id="app">
<<<<<<< HEAD
    <!-- 路由占位符 -->
    <router-view></router-view>
=======
    <img src="./assets/logo.png">
    <div>
      <p>
        If Element is successfully added to this project, you'll see an
        <code v-text="'<el-button>'"></code>
        below
      </p>
      <el-button>el-button</el-button>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
>>>>>>> ee554a30f85392ffa90db8474520992147aa4ada
  </div>
</template>

<script>
<<<<<<< HEAD
export default {
  name: 'app'
=======
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
>>>>>>> ee554a30f85392ffa90db8474520992147aa4ada
}
</script>

<style>
<<<<<<< HEAD
=======
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
>>>>>>> ee554a30f85392ffa90db8474520992147aa4ada
</style>
