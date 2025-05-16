<template>

  <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
  <el-button @click="init_data()">init_data</el-button>
  <div style="display: flex;">

    <el-tree style="width:300px" :data="tree.data" :props="tree.props" :node-key="tree.id" @node-click="tree_left_click"
      :expand-on-click-node="false" highlight-current default-expand-all>

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


    <div v-show="tree_permiss.show" style="box-sizing: border-box;border: 1px solid blue;">
      <div>权限明显</div>
      <el-button type="primary" @click="data_init_btn_permiss({ role_id: tree_permiss.node.id })">保存</el-button>
      <el-tree style="width:500px" :data="tree_permiss.data" :props="tree_permiss.props"
        :node-key="tree_permiss.props.id" :expand-on-click-node="false" highlight-current default-expand-all>
        <template #default="{ node, data }">
          <div
            style="  flex: 1;  display: flex;  align-items: center;  justify-content: space-between;  font-size: 14px;  padding-right: 8px;">
            <span style="margin-right: 20px">{{ node.label }}</span>
            <div style="display: flex;gap:20px">
              <div :class="{ btn_isactive: data.view }" @click="btn_click(data, 'view')">显示</div>
              <div :class="{ btn_isactive: data.add }" @click="btn_click(data, 'add')">添加</div>
              <div :class="{ btn_isactive: data.del }" @click="btn_click(data, 'del')">删除</div>
              <div :class="{ btn_isactive: data.update }" @click="btn_click(data, 'update')">修改</div>
              <div :class="{ btn_isactive: data.find }" @click="btn_click(data, 'find')">查询</div>
            </div>
          </div>
        </template>
      </el-tree>
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


      tree_permiss: {
        show: false,
        props: {
          children: 'children',
          label: 'name',
          nodeKey: 'id'
        },
        data: [],
        node: {},
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

    async data_init_btn_permiss({ role_id }) {
      let result = await api.tb_menu.find_menu_tree_match_role_id({ role_id: role_id })
      console.error('result:', result)
    },//

    async tree_left_click(node) {
      console.log('tree_left_click---node:', JSON.parse(JSON.stringify(node)))
      this.tree.node = JSON.parse(JSON.stringify(node))


      // 判断是不是部门
      let is_depart = this.tree.node?.depart ? true : false
      let is_children = this.tree.node?.children ? true : false
      if (is_depart && is_children) {
        this.add_position.show = true
      } else {
        this.add_position.show = false
      }

      // 判断是不是职位
      let is_position = this.tree.node?.position ? true : false
      if (is_position) {
        this.tree_permiss.show = true
        console.log('tree_permiss.show---:', this.tree.node.id)
        let role_id = this.tree.node.id
        let result = await api.tb_menu.find_menu_tree_match_role_id({ role_id: role_id })
        console.error('result:', result)
        this.tree_permiss.data = result.menu_tree_match_role
      } else {
        this.tree_permiss.show = false
      }
    },//

    async submit_update() {
      // 更新部门职位
      console.log('111---:', JSON.parse(JSON.stringify(this.tree.node)))
      let params = {
        is_position: this.tree.node?.position ? true : false,
        id: this.tree.node?.id,
        name: this.tree.node?.name
      }
      let res = await api.tb_depart.update_DepartmentsWithPositions(params)
      if (res) this.init_data()

      // 更新职位权限
      let params_permiss = {
        role_id: this.tree.node?.id,
        tree_data: this.tree_permiss.data
      }
      console.log('params_permiss:', params_permiss)
      debugger
      let result = await api.tb_menu.update_ref_menu_permiss(params_permiss)
      console.error('result:', result)



    },//


    async submit_add() {
      console.log('111---:', JSON.parse(JSON.stringify(this.tree.node)))
      console.log('111---:', this.add_position.name)
      // add_Position:async({ id, name })=
      let params = { id: this.tree.node.id, name: this.add_position.name }
      let res = await api.tb_depart.add_Position(params)
      if (res) this.init_data()
    },//

    async btn_click(data, kind) {
      console.log('btn_click:', data, kind)
      if (data[kind]) {
        data[kind] = !data[kind]
      } else {
        data[kind] = true
      }
    },

  },////

  async mounted() {
    this.init_data()
  },////

}
</script>

<style scoped>
.btn_isactive {
  color: green;
}
</style>