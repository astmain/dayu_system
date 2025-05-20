<template>
  <Layout></Layout>
</template>

<script>
import {RouterView} from 'vue-router'
import {defineAsyncComponent} from "vue"

export default {
  components: {
    RouterView,
    Layout: defineAsyncComponent(() => import('./Layout.vue')),//
  },
  data() {
    return {}
  },
  methods: {},
  async mounted() {
  }, ////


}
</script>


<style>
html {
  height: 100vh;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  overflow-y: hidden;
}

body {
  height: 100vh;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  overflow-y: hidden;
}


h1,
h2,
h3,
h4,
h5 {
  padding: 0;
  margin: 0;
}
</style>
