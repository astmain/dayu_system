<template>
  <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
  <el-button @click="met1()">met1</el-button>

</template>

<script>


export default {
  data() {
    return {
      关键词111: "小米",
      参数111: "参数111",
    }


  },

  methods: {

    async met1() {
      let config = {method: 'get', url: 'ipc/app_restart', data: {name: "小许"}}
      let resp = await axios_api(config)
      console.log(`111---resp:`, resp)

    },//

  },

  async mounted() {


  },
}
</script>

<style scoped></style>



