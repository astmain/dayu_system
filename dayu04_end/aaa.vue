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


      await new Promise((resolve) => setTimeout(resolve, 1000))

    },//

  },////

  async mounted() {

  },////

}
</script>

<style  scoped></style>



