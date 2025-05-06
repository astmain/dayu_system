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

      <!-- <el-tree ref="ElTree_ref" :data="tree.data" :show-checkbox="false" node-key="id" :props="tree" default-expand-all
        @node-click="tree_click" :expand-on-click-node="false" highlight-current /> -->

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
        <el-button type="primary" @click="user_kind({ kind: 'user_add' })">添加</el-button>
      </ul>
      <el-table :data="users" style="width: 100%" size="default" border highlight-current-row>
        <el-table-column label="序号" type="index" width="60px" />
        <el-table-column label="username" prop="username" />
        <el-table-column label="tel" prop="tel" />
        <el-table-column label="Operations">
          <template #default="scope">
            <el-button type="primary" @click="open_dialog({ kind: 'edit', item: scope.row })"> 编辑</el-button>
            <el-button type="success" @click="open_dialog({ kind: 'info', item: scope.row })"> 详情</el-button>
            <el-button type="danger" @click="open_dialog({ kind: 'delete', item: scope.row })"> 删除</el-button>
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

      menu_config: {
        opt: [{ title: '编辑', kind: 'edit' }, { title: '新增', kind: 'add' }, { title: '删除', kind: 'delete' },],
        opt_click: async (item, curr_data) => {
          // console.log('item', item)
          // console.log('curr_data', curr_data)
          if (item.kind == 'add') require('./depart_add_dialog.jsx')({ state: curr_data, that: this, arg: { kind: "depart_add", title: "部门-添加" } })
          if (item.kind == 'edit') {
            // let aaa = require('./depart_edit_dialog.jsx')
            // console.log('aaa:', aaa)


            require('./depart_edit_dialog.jsx')({ title: "部门-编辑", state: curr_data, item, that: this, })
          }
          if (item.kind == 'delete') require('./depart_delete_dialog.jsx')({ state: curr_data, that: this, arg: { kind: "delete", title: "部门-删除" } })
        }
      },

      tree_config: {
        label: "depart",
        menus_chooseed: [],
        data: [{ menu: '111', children: [{ menu: '222' }] }],
        tree_left_click: async (data) => {
          // console.log('tree_left_click---data222:', JSON.parse(JSON.stringify(data)))
          this.form.depart_id = data.id
          let config = { method: 'post', url: '/depart/find_info', data: this.form }
          // console.log('tree_click---config:', JSON.parse(JSON.stringify(config)))
          let res = await axios_api(config)
          // console.log('tree_click---res:', res)
          this.users = res.result.users
        },
      }
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

    async user_kind({ kind }) {
      console.log('user_kind---kind:', kind)
      if (kind === "user_add") {
        require('./user_add_dialog.jsx')({ state: { tel: "", username: "" }, that: this, title: "用户-新增" })
      }
      if (kind === "user_update") {

      }

      if (kind === "user_delete") {

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

  },////

}
</script>

<style scoped></style>