<template>
    <div>
       <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
          <el-button @click="met1()">met1</el-button>
          1111
    
    </div>
    </template>
    
    <script>
    
    
    export default {
      data() {
        return {
          name: "数据1",
        }
    
    
      },
    
      methods: {
        async met1() {
          console.log('met1      :', 111)
    
    
        },//
    
      },////
    
      async mounted() {
    
      },////
    
    }
    </script>
    
    <style  scoped></style>
    
    
    
    