<template>
<div>
   <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
      <el-button @click="met1()">met1</el-button>

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
let config = {method: 'get', url: 'http://103.119.2.223:9999/index', data: {aaa: 111}}
let res = await axios(config)

console.log('res.data---', res.data)

    },//

  },////

  async mounted() {

  },////

}
</script>

<style  scoped></style>



