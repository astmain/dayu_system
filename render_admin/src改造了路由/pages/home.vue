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
      var config = {method: 'get', url: '/admin_user/get_user_by_token',}
      let res = await axios_api(config)
      console.log(`111---res:`, res)
    },//

  },////

  async mounted() {

  },////

}
</script>

<style scoped></style>



