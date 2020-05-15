

<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
   <a-button type="primary">Button</a-button>
    <router-link to="/home">Home</router-link>
      <router-link to="/todo">todo</router-link>
   <helloWorld msg="test"></helloWorld>
      <router-view/>
  </div> 
  
</template>

<script>
import HelloWorld  from './components/HelloWorld' 
export default {
  name: 'App',
  components: {
    HelloWorld
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
