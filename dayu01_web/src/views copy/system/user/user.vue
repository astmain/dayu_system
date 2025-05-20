<template>
  <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
  <el-button @click="init_data()">init_data</el-button>



  <div>{{ tree_depart.node.depart }}</div>
  <div style="display: flex;">
    <div style="flex: 1;">
      <el-tree :data="tree_depart.data" :props="tree_depart.props" :node-key="tree_depart.id"
        @node-click="tree_left_click" @node-contextmenu="tree_ritht_click" :expand-on-click-node="false"
        highlight-current default-expand-all></el-tree>
    </div>
    <div style="flex: 3;">
      <el-table :data="tree_depart.user_list" style="width: 100%" size="default" border highlight-current-row>
        <el-table-column label="序号" type="index" width="60px" />
        <el-table-column label="username" prop="username" />
        <el-table-column label="tel" prop="tel" />
        <el-table-column label="Operations">
          <template #default="scope">
            <el-button type="primary" @click="depart_kind({ kind: 'info', item: scope.row })"> 详情</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      tree_depart: {
        props: {
          children: 'children',
          label: 'depart',
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



    }


  },

  methods: {
    async init_data() {
      console.log('met1      :', api)
      // 部门
      let { departs_tree } = await api.tb_depart.find_departs_tree()
      console.log('departs_tree:', departs_tree);
      this.tree_depart.data = departs_tree
      console.log('this.tree_depart.data:', JSON.parse(JSON.stringify(this.tree_depart.data, null, 2)));
      //用户
      let { user_list } = await api.tb_user.find_user_list({ depart_id: this.tree_depart.node.depart_id })
      console.log('user_list:', user_list);
      // this.tree_depart.user_list = user_list


    },//

    async tree_left_click(node) {
      this.tree_depart.node = node
      console.log('tree_left_click---this.tree_depart.node:', this.tree_depart.node)
      let depart_id = this.tree_depart.node.id
      let is_parent = this.tree_depart.node?.children?.length >= 1 ? true : false
      let { user_list } = await api.tb_depart.find_user_list_BY_depart_id({ depart_id: depart_id, is_parent: is_parent })
      this.tree_depart.user_list = user_list
    },

    tree_ritht_click(node) {
      console.log('met_tree_ritht_click:', node)
    },


    async depart_kind({kind,item}){
      console.log('kind:', kind)
      console.log('item:', item)
      if (kind == 'info'){
        let { menus_tree } = await api.tb_depart.find_depart_ref({}) 
        let form={username:item.username,tel:item.tel,password:item.password,menus_tree}
        require('./user_info_dialog.jsx')({ state: form, that: this, arg: { kind: "info", title: "部门-添加" } })
      }
      
    }

  },////

  async mounted() {
    this.init_data()
  },////

}
</script>

<style scoped></style>