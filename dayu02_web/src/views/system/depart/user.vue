<template>
  <div>
    <el-button @click="find_departs_tree()">find_departs_tree</el-button>
    <el-button @click="create_user()">create_user</el-button>

    <div>部门: {{ node.name }}</div>



    <el-table :data="user_list" style="width: 100%" size="default" border highlight-current-row>
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


</template>

<script>


export default {

  props: {
    node: {
      type: Object,
      default:{},
    },
  },

  data() {
    return {
      user_list: [],
    }


  },

  methods: {
    async find_departs_tree() {


    },//

    async create_user() {
      require('./user_create_dialog.jsx')({ title: "新增-用户", state: { parent_id: "" ,depart_id:this.node.id }, that: this, })
    },//

  },////

  async mounted() {



  },////

}
</script>

<style scoped></style>