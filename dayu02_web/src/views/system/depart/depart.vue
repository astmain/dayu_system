<template>

  <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
  <el-button @click="find_depart_position_tree()">find_depart_position_tree</el-button>
  <div style="display: flex;">

    <el-tree style="width:300px" :data="tree.data" :props="tree.props" :node-key="tree.id" @node-click="tree_left_click"
      :expand-on-click-node="false" highlight-current default-expand-all>

    </el-tree>


    <div style="box-sizing: border-box;border: 1px solid red;">
      <div>更新-数据</div>
      <div> {{ tree.node.name }}</div>
      <el-button type="primary" @click="alert('等待开发')">保存</el-button>
      <el-input v-model="tree.node.name"></el-input>
    </div>

    <div v-show="add_position.show" style="box-sizing: border-box;border: 1px solid green;">
      <div>新增-职位</div>
      <div> {{ tree.node.name }}</div>
      <el-button type="primary" @click="alert('等待开发')">新增-职位</el-button>
      <el-input v-model="add_position.name"></el-input>
    </div>


    <div v-show="tree_permiss.show" style="box-sizing: border-box;border: 1px solid blue;">
      <div>权限明显</div>
      <el-button type="primary" @click="save111()">保存</el-button>
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
    async find_depart_position_tree() {
      let depart_position_tree = await api.find_depart_position_tree()
      console.log('depart_position_tree---:', depart_position_tree)
      this.tree.data = depart_position_tree
    },//

    async save111() {
      console.error('当前部门数据---:', JSON.parse(JSON.stringify(this.tree.node)))
      console.error('当前按钮数据---:', JSON.parse(JSON.stringify(this.tree_permiss.data)))

      let position_id = this.tree.node.id
      // let depart_id = this.tree.node.depart_id


      let res = await api.save_ref_position_permiss({ position_id, tree_data: this.tree_permiss.data })
      console.error('res---:', res)



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
        let position_id = this.tree.node.id
        this.tree_permiss.data = await api.find_menu_tree_permiss({position_id})
      } else {
        this.tree_permiss.show = false
      }
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
    this.find_depart_position_tree()
  },////

}
</script>

<style scoped>
.btn_isactive {
  color: green;
}
</style>