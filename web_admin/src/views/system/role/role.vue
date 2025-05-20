<template>
  <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
  <!-- 搜索工具栏 -->
  <ul class="css_toolbar1">
    <li>
      <title style="width: 50px;">角色</title>
      <el-input style="width: 120px;" v-model="form.role" />
    </li>
    <el-button type='primary' @click='find_list()'>搜索</el-button>
    <el-button type='' @click="; (form = { menu: '', path: '' }), find_list()">清空</el-button>

  </ul>

  <!-- 表格 -->
  <el-button type="primary" @click="open_dialog({ kind: 'add', item: {} })">添加</el-button>
  <el-table :data="tableData" style="width: 100%" size="default" border>
    <el-table-column label="序号" type="index" width="60px" />
    <el-table-column label="role" prop="role" />
    <el-table-column label="remark" prop="remark" />
    <el-table-column label="Operations">
      <template #default="scope">
        <el-button type="primary" @click="open_dialog({ kind: 'edit', item: scope.row })"> 编辑</el-button>
        <el-button type="success" @click="open_dialog({ kind: 'info', item: scope.row })"> 详情</el-button>
        <el-button type="danger" @click="open_dialog({ kind: 'delete', item: scope.row })"> 删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    return {
      name: "数据1",
      form: { role: "" },
      tableData: []
    }


  },

  methods: {
    async find_list() {
      let config = { method: 'get', url: '/role/find_list', params: this.form }
      let res = await axios_api(config)
      console.log('res:', res)
      this.tableData = res.result.roles
    },//

    async open_dialog({ kind, item }) {
      if (kind == 'add') require('./role_add_dialog.jsx')({ item: item, that: this })
      if (kind == 'edit') require('./role_edit_dialog.jsx')({ item: item, that: this })
      if (kind == 'info') require('./role_info_dialog.jsx')({ item: item, that: this, arg: { kind: "info", title: "详情-角色"} })

      if (kind == 'delete') {
        let confirm = await ElMessageBox.confirm('确定删除吗', '删除提示', { cancelButtonText: '取消', confirmButtonText: '删除' })
        if (confirm != 'confirm') return
        let config = { method: 'get', url: `/role/delete?`, params: { id: item.id } }
        let res = await axios_api(config)
        console.log('res:', res)
        res.code == 200 && await this.find_list()
      }
    },
  },////

  async mounted() {

    await this.find_list()

  },////

}
</script>

<style scoped></style>