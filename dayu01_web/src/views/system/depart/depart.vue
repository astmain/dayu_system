<template>
  <div>
    <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
    <el-button @click="init_data()">init_data</el-button>
    <div style="display: flex;">

      <el-tree style="width:300px" :data="tree.data" :props="tree.props" :node-key="tree.id"
        @node-click="tree_left_click" :expand-on-click-node="false" highlight-current default-expand-all>

      </el-tree>


      <div style="box-sizing: border-box;border: 1px solid red;">
        <div>更新-数据</div>
        <div> {{ tree.node.name }}</div>
        <el-button type="primary" @click="submit_update">保存</el-button>
        <el-input v-model="tree.node.name"></el-input>
      </div>

      <div v-show="add_position.show" style="box-sizing: border-box;border: 1px solid green;">
        <div>新增-职位</div>
        <div> {{ tree.node.name }}</div>
        <el-button type="primary" @click="submit_add">新增-职位</el-button>
        <el-input v-model="add_position.name"></el-input>
      </div>
    </div>


  </div>
</template>

<script>


export default {
  data() {
    return {
      tree: {
        props: {
          children: 'children',
          label: 'name',
          nodeKey: 'id'
        },
        data: [],
        node: {},
        user_list: [],
      },


      add_position: {
        show: false,
        name: "主管",
      }
    }


  },

  methods: {
    async init_data() {
      let res = await api.tb_depart.getAllDepartmentsWithPositions()
      console.log('res---:', res)
      this.tree.data = res.depart_position

    },//

    async tree_left_click(node) {
      console.log('tree_left_click---node:', JSON.parse(JSON.stringify(node)))
      this.tree.node = JSON.parse(JSON.stringify(node))


      let is_depart = this.tree.node?.depart ? true : false
      let is_children = this.tree.node?.children ? true : false
      if (is_depart && is_children) {
        this.add_position.show = true
      } else {
        this.add_position.show = false
      }

    },//

    async submit_update() {
      console.log('111---:', JSON.parse(JSON.stringify(this.tree.node)))
      let params = {
        is_position: this.tree.node?.position ? true : false,
        id: this.tree.node?.id,
        name: this.tree.node?.name
      }
      let res = await api.tb_depart.update_DepartmentsWithPositions(params)
      if (res) this.init_data()
    },//


    async submit_add() {
      console.log('111---:', JSON.parse(JSON.stringify(this.tree.node)))
      console.log('111---:', this.add_position.name)


      // add_Position:async({ id, name })=
      let params = { id: this.tree.node.id, name: this.add_position.name }

      let res = await api.tb_depart.add_Position(params)
      if (res) this.init_data()




    },//

  },////

  async mounted() {
    this.init_data()
  },////

}
</script>

<style scoped></style>