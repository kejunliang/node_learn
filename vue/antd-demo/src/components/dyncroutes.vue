<template>
<div> 
    <div>我是动态</div>
    <div>{{user}}</div>
    <div>{{ $route.params.id }}{{ $route.params.value }}</div>
    <div>{{$route.query}}</div>
    <router-view></router-view>
</div>
 
</template>
<script>
export default {
  data() {
    return {
      user: "kejl",
    };
  },
   watch: {
    "$route.path": function(newVal, oldVal) {
        console.log(newVal)
      console.log(oldVal)
      if (newVal === "/sex") {
        console.log("欢迎进入登录页面");
      }
      if (newVal === "/user") {
        console.log("欢迎进入注册页面");
      }
    }
  }
};
</script>