<script setup="">
import {ref, watch} from 'vue'

function met1() {


  function promise1() {
      return new Promise(async (resolve, reject) => {
          //doing
           resolve("成功")
      })
  }

}


</script>

<template>
  <div @click="met1()">met1</div>

</template>

<style>
</style>
