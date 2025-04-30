<template>
  <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
  <h3 style="padding:0;margin: 0">home测试专用</h3>
  <el-button @click="get_user_by_token()">get_user_by_token</el-button>
</template>

<script>
export default {
  data() {
    return {
      name: "数据1",
    }
  },

  methods: {
    async get_user_by_token() {
      var config = { method: 'get', url: '/admin_user/get_user_by_token', }
      let res = await axios_api(config)
      console.log(`111---res:`, res)
    },//

  },////

  async mounted() {

  },////

}
</script>

<style scoped></style>