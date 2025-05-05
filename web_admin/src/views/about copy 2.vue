<template>
  <div>
    <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
    <el-button @click="met1()">met1</el-button>
    <div class="tree-container">
      <el-tree :data="treeData" node-key="id" default-expand-all @node-click="handleLeftclick"
        @node-contextmenu="rightClick" ref="tree" class="tree-line">
      </el-tree>
      <div class="box-menu" v-show="menuVisible" :style="{ left: menu_left + 'px', top: menu_top + 'px' }">
        <div @click="addSameLevelNode(0)" v-show="firstLevel">
          <i class="el-icon-circle-plus-outline"></i>&nbsp;&nbsp;同级增加
        </div>
        <div class="add" @click="addChildNode()">
          <i class="el-icon-circle-plus-outline"></i>&nbsp;&nbsp;子级增加
        </div>
        <div class="delete" @click="deleteNode()">
          <i class="el-icon-remove-outline"></i>&nbsp;&nbsp;删除节点
        </div>
        <div class="edit" @click="editNode()">
          <i class="el-icon-edit"></i>&nbsp;&nbsp;修改节点
        </div>
      </div>
    </div>

  </div>
</template>

<script>


export default {
  data() {
    return {
      name: "数据1",

      obj: {
        aaa: [],
        fun1: () => {
          console.log(`111---222:`, this.aaa)
        }
      },
      clazz: {

      }
    }


  },

  methods: {
    async met1() {
      console.log('met1      :', 111)
      let config = { method: 'get', url: 'http://103.119.2.223:9999/index', data: { aaa: 111 } }
      let res = await axios(config)

      console.log('res.data---', res.data)

    },//

  },////

  async mounted() {

  },////

}
</script>

<style scoped></style>
