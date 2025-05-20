<template>
  <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
  <nav style="display: flex;  width: 100%;">
    <div style="flex: 3;">
      <!-- 搜索工具栏 -->
      <ul class="css_toolbar1">
        <li>
          <title style="width: 50px;">部门</title>
          <el-input style="width: 120px;" v-model="form.role" />
        </li>
        <el-button type='primary' @click='find_list_depart()'>搜索</el-button>
        <el-button type='' @click="; (form = { menu: '', path: '' }), find_list()">清空</el-button>
        <el-button type="primary" @click="open_dialog({ kind: 'depart_add', item: {} })">添加</el-button>
      </ul>
      <com_tree1 :tree_config="tree_config" :menu_config="menu_config"></com_tree1>


    </div>


    <!-- 表格 -->
    <div style="flex: 7;">
      <!-- 搜索工具栏 -->
      <ul class="css_toolbar1">
        <li>
          <title style="width: 50px;">角色</title>
          <el-input style="width: 120px;" v-model="form.role" />
        </li>
        <el-button type='primary' @click='find_list()'>搜索</el-button>
        <el-button type='' @click="; (form = { menu: '', path: '' }), find_list()">清空</el-button>
        <el-button type="primary" @click="user_kind({ kind: 'user_add'  ,item:{}})">添加</el-button>
      </ul>
      <el-table :data="BUS_depart.users" style="width: 100%" size="default" border highlight-current-row>
        <el-table-column label="序号" type="index" width="60px" />
        <el-table-column label="username" prop="username" />
        <el-table-column label="tel" prop="tel" />
        <el-table-column label="Operations">
          <template #default="scope">
            <el-button type="primary" @click="user_kind({ kind: 'user_update', item: scope.row })"> 编辑</el-button>
            <el-button type="danger" @click="user_kind({ kind: 'user_delete', item: scope.row })"> 删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </nav>
</template>
<script>
import com_tree1 from '@src/components/com_tree1.vue'
export default {

  components: {
    com_tree1
  },
  data() {
    return {
      name: "数据1",
      form: { depart: "", depart_id: 0 },
      users: [],

      tree_config: {
        label: "depart",
        menus_chooseed: [],
        data: [{ menu: '111', children: [{ menu: '222' }] }],
        tree_left_click: async (data) => {
          BUS_depart.departs_id = data.id
          BUS_depart.find_user_info_list()
          // let { users } = await BUS.api.tb_depart.find_user_info_list({ depart_id: BUS_depart.departs_id })
          // console.log('users:', users)
          // BUS_depart.users = users
        },
      },

      menu_config: {
        opt: [{ title: '编辑', kind: 'edit' }, { title: '新增', kind: 'add' }, { title: '删除', kind: 'delete' },],
        opt_click: async (item, curr_data) => {
          // console.log('item', item)
          // console.log('curr_data', curr_data)
          if (item.kind == 'add') require('./depart_add_dialog.jsx')({ state: curr_data, that: this, arg: { kind: "depart_add", title: "部门-添加" } })
          if (item.kind == 'edit') require('./depart_edit_dialog.jsx')({ title: "部门-编辑", state: curr_data, item, that: this, })
          if (item.kind == 'delete') require('./depart_delete_dialog.jsx')({ state: curr_data, that: this, arg: { kind: "delete", title: "部门-删除" } })
        }
      },


    }
  },

  methods: {
    async find_list_depart() {
      let config = { method: 'post', url: '/depart/find_list', data: this.form }
      let res = await axios_api(config)
      console.log('res:', res)
      res.result.departs
      let tree_data = utils.build_depart_tree(res.result.departs)
      console.log('tree_data:', tree_data)
      this.tree_config.data = tree_data
    },//

    async user_kind({ kind, item }) {
      console.log('user_kind---kind:', kind ,  JSON .parse( JSON.stringify(item)))
      if (kind === "user_add") {
        require('./user_add_dialog.jsx')({ state: { tel: "", username: "" }, that: this, title: "用户-新增" })
      }
      if (kind === "user_update") {
        // require('./user_update_dialog.jsx')({ state: { tel: item.tel, username: item.username, id: item.id, depart_id: BUS_depart.departs_id }, that: this, title: "用户-编辑" })
        require('./user_update_dialog2.jsx')({ state: { tel: item.tel, username: item.username, id: item.id, depart_id: BUS_depart.departs_id }, that: this, title: "用户-编辑" })
    
    
      }

      if (kind === "user_delete") {
        console.log('user_kind---item:', item)
        require('./user_delete_dialog.jsx')({ id: item.id })
      }

      if (kind === "user_find_list") {

      }

    },//





    async open_dialog({ kind, item }) {
      if (kind == 'depart_add') require('./depart_add_dialog.jsx')({ item: item, that: this, arg: { kind: "depart_add", title: "部门-添加" } })
    },
  },////

  async mounted() {
    await this.find_list_depart()
    require('./BUS_depart.js')

  },////

}
</script>

<style scoped></style>