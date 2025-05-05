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
        <el-button type="primary" @click="open_dialog({ kind: 'add', item: {} })">添加</el-button>
      </ul>

      <el-tree ref="ElTree_ref" :data="tree.data" :show-checkbox="false" node-key="id" :props="tree" default-expand-all
        @node-click="tree_click" :expand-on-click-node="false" highlight-current />



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
        <el-button type="primary" @click="open_dialog({ kind: 'add', item: {} })">添加</el-button>
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
export default {
  data() {
    return {
      name: "数据1",
      form: { depart: "" ,depart_id:0},
      users: [],
      tree: {
        data: [{ menu: '111', children: [{ menu: '222' }] }],
        menus_chooseed: [],
        label: 'depart',
        children: 'children',
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
      this.tree.data = tree_data
    },//


    async tree_click(data) {
      console.log('tree_click---data:', JSON.parse(JSON.stringify(data)))
      this.form.depart_id = data.id
      let config = { method: 'post', url: '/depart/find_info', data: this.form }
      console.log('tree_click---config:', JSON.parse(JSON.stringify(config)))
      let res = await axios_api(config)
      console.log('tree_click---res:', res)
      this.users = res.result.users
    },

    async open_dialog({ kind, item }) {

    },
  },////

  async mounted() {

    await this.find_list_depart()

  },////

}
</script>

<style scoped></style>