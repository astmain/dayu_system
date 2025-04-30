<template>
  <div>
    <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
    <el-button @click="met1()">met1</el-button>
<!--    <img src="https://gitee.com/astmain/static/raw/master/background/1.jpg" style="width: 100px ;height:100px: 1px solid red" alt="">-->
    <img src="https://gitee.com/astmain/static/raw/master/background/1.jpg" style="width: 100px ;height:100px ;border: 1px solid red" alt="">
    <img src="https://gitee.com/astmain/static/raw/master/background/1.jpg" style="width: 100px ;height:100px ;border: 1px solid red" alt="">
    <img src="https://gitee.com/astmain/static/raw/master/background/platform.png" style="width: 100px ;height:100px ;border: 1px solid red" alt="">
    <img src="https://gitee.com/astmain/static/raw/master/avatar/pikaqiu_01.jpg" style="width: 100px ;height:100px ;border: 1px solid red" alt="">
    <img src="https://gitee.com/astmain/static/raw/master/avatar/pikaqiu_02.jpg" style="width: 100px ;height:100px ;border: 1px solid red" alt="">
    <img src="https://gitee.com/astmain/static/raw/master/logo/line_broken.png" style="width: 100px ;height:100px ;border: 1px solid red" alt="">
    <img src="https://gitee.com/astmain/static/raw/master/food/1.webp" style="width: 100px ;height:100px ;border: 1px solid red" alt="">

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

<style scoped></style>



