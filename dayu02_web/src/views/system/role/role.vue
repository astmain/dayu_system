<template>
  <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
  <el-button @click="init_data()">init_data</el-button>


  <el-table :data="role_list" style="width: 100%" height="200" size="default" border highlight-current-row>
    <el-table-column label="序号" type="index" width="60px" />
    <el-table-column label="role" prop="role" />
    <el-table-column label="tel" prop="tel" />
    <el-table-column label="Operations">
      <template #default="scope">
        <el-button type="" @click="select_kind({ kind: 'info', item: scope.row })"> 详情</el-button>
        <el-button type="primary" @click="select_kind({ kind: 'edit', item: scope.row })"> 编辑</el-button>
      </template>
    </el-table-column>
  </el-table>



  <div style="height: 50px">{{ tree.node }}</div>
  <div style="height: 50px"> <el-button type="primary" v-show="is_edit" @click="submit"> 保存</el-button></div>
  <div style="display: flex;">
    <div style="flex: 1;">
      <el-tree style="width:600px" :data="tree.data" :props="tree.props" :node-key="tree.id"
        @node-click="tree_left_click" 
        @node-contextmenu="tree_ritht_click" 
        :expand-on-click-node="false"
        highlight-current default-expand-all>
        <template #default="{ node, data }">
          <div class="custom-tree-node ">
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
import com_tree1 from '@src/components/com_tree1.vue'

export default {
  components: {
    com_tree1
  },
  data() {
    return {
      role_list: [],
      tree: {
        props: {
          children: 'children',
          label: 'menu',
          nodeKey: 'depart_id'
        },
        data: [],
        node: {},
        user_list: [],
      },
      menu_config: {
        opt: [{ title: '编辑', kind: 'edit' }, { title: '新增', kind: 'add' }, { title: '删除', kind: 'delete' },],
        opt_click: async (item, curr_data) => {
          // console.log('item', item)
          // console.log('curr_data', curr_data)
          // if (item.kind == 'add') require('./depart_add_dialog.jsx')({ state: curr_data, that: this, arg: { kind: "depart_add", title: "部门-添加" } })
          // if (item.kind == 'edit') require('./depart_edit_dialog.jsx')({ title: "部门-编辑", state: curr_data, item, that: this, })
          // if (item.kind == 'delete') require('./depart_delete_dialog.jsx')({ state: curr_data, that: this, arg: { kind: "delete", title: "部门-删除" } })
        }
      },

      is_edit: false,



    }


  },

  methods: {
    async init_data() {
      let { role_list } = await api.tb_role.find_role_list()
      this.role_list = role_list
      console.log('role_list:', role_list)


    },//

    async tree_left_click(node) {

    },

    tree_ritht_click(node) {
      console.log('met_tree_ritht_click:', node)
    },

    async select_kind({ kind, item }) {
      this.is_edit = false
      console.log('select_kind:', kind, item)
      if (kind == 'info') {
        // let { menu_tree } = await api.tb_menu.find_menu_tree()
        let result = await api.tb_menu.find_menu_tree_match_role_id({ role_id: item.id })
        console.error('result:', result)
        this.tree.data = result.menu_tree
      }
      if (kind == 'edit') {
        this.is_edit = true
        let result = await api.tb_menu.find_menu_tree_match_role_id({ role_id: item.id })
        console.error('result:', result)
        this.tree.data = result.menu_tree_match_role
      }
    },


    async submit() {
      console.error('submit:', this.tree.data)

      let result = await api.tb_menu.update_ref_menu_permiss({ role_id: this.tree.node.id, tree_data: this.tree.data })
      // let result = await api.tb_menu.update_ref_menu_permiss({ role_id: this.tree.node.id, tree_data: [] })
      console.error('result:', result)
    },

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
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.btn_isactive {
  color: green;
}
</style>