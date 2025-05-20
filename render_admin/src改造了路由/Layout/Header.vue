<template>
  <div>

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
      let view = this.$router.options.routes.find(o => o.name==='main').children
      console.log(`111---view:`, view)

    },//

  },////

  async mounted() {

  },////

}
</script>

<style scoped></style>



