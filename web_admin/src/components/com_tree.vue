<template>
  <el-card v-show="tree.menu_show"
    :style="{ position: 'fixed', left: tree.menu_left + 'px', top: tree.menu_top + 'px' }"
    :body-style="{ padding: '10px' }">
    <div v-for="(item, i) in tree.menu_opt">
      <span @click="menu_opt_click(item)">{{ item.title }}</span>
    </div>
  </el-card>
</template>

<script>


export default {
  props: {
    show: { default: false },
    menu_opt: { default: [{ title: "编辑", kind: "edit" }, { title: "新增", kind: "add" }, { title: "删除", kind: "delete" },] },
    curr_data: { default: {} },
    curr_node: { default: {} },
  },
  data() {
    return {
      menu_left: 0,
      menu_top: 0,
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