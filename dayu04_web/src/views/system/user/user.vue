<template>
  <div>
    <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
    <el-button @click="find_departs_tree()">find_departs_tree</el-button>
    <el-button @click="create_user_dialog()">create_user_dialog</el-button>
    <div style="display:flex">
      <!-- 部门树 -->
      <el-tree ref="tree_depart_ref2" style="width:300px ;height: 500px; ;overflow: auto;" :data="tree_depart2.data"
        :props="tree_depart2.props" :node-key="tree_depart2.props.nodeKey"
        :current-node-key="tree_depart2.currentNodeKey" @node-click="tree_left_click2" :expand-on-click-node="false"
        highlight-current default-expand-all>
      </el-tree>

      <!-- 用户列表 -->
      <el-table :data="user_list" style="width: 100%" size="default" border highlight-current-row show-overflow-tooltip>
        <el-table-column label="序号" type="index" width="60px" />
        <el-table-column label="username" prop="username" />
        <el-table-column label="tel" prop="tel" />
        <el-table-column label="Operations">
          <template #default="scope">
            <el-dropdown placement="bottom-end">
              <el-button> 操作 </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-for="item in dropdown_opt" :key="item.title">
                    <div style="padding: 8px;padding-top:4px;padding-bottom:4px"
                      @click.native="dropdown_opt_click(item.title, scope.row)"> {{ item.title }}</div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

    </div>



    <!--dialog-新增用户 -->
    <el-dialog v-if="show.create" v-model="show.create" title="新增用户" width="500px" draggable>
      <div style="display: flex;">
        <el-tree ref="tree_depart_dialog_ref" style="width:300px ;height: 500px; ;overflow: auto;"
          :data="tree_depart_dialog.data" show-checkbox :props="tree_depart_dialog.props"
          :node-key="tree_depart_dialog.props.nodeKey" :current-node-key="tree_depart_dialog.currentNodeKey"
          @node-click="tree_left_click" @node-contextmenu="tree_ritht_click" :expand-on-click-node="false"
          highlight-current default-expand-all>
        </el-tree>
        <div>
          <el-button type="primary" @click="create_user_submit()">新增用户</el-button>
          <el-input v-model="form.username" placeholder="请输入用户名" />
          <el-input v-model="form.tel" placeholder="请输入电话" />
        </div>

      </div>
    </el-dialog>



    <!--dialog-修改 -->
    <el-dialog v-if="show.update" v-model="show.update" title="修改用户" width="500px" draggable>
      <div style="display: flex;">
        <el-tree ref="tree_depart_update_dialog_ref" style="width:300px ;height: 500px; ;overflow: auto;"
          :data="tree_depart_update_dialog.data" show-checkbox :props="tree_depart_update_dialog.props"
          :node-key="tree_depart_update_dialog.props.nodeKey"
          :current-node-key="tree_depart_update_dialog.currentNodeKey" @node-click="tree_left_click"
          @node-contextmenu="tree_ritht_click" :expand-on-click-node="false" highlight-current default-expand-all>
        </el-tree>
        <div>
          <el-button type="primary" @click="form_update.submit()">修改保存</el-button>
          <!-- <el-input v-model="curr_user.username" placeholder="请输入用户名" />
          <el-input v-model="curr_user.tel" placeholder="请输入电话" /> -->
          <com_form ref="com_form_ref" :form_info="form_update" :modelValue="form_update" />
        </div>


      </div>
    </el-dialog>


  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus'
import com_form from './com_form.vue'
export default {
  components: {
    com_form
  },
  data() {
    return {

      form_update: {
        data: { username: '', tel: "", },
        desc: {
          username: { label: "用户名", value: "111", type: "input", width_label: "60px" },
          tel: { label: "电话", value: "111", type: "input", width_label: "60px" },
        },
        rules: {
          username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
          tel: [{ required: true, message: '请输入电话', trigger: 'blur' }],
        },
        submit: async () => {
          if (await this.$refs.com_form_ref.check() === false) return
          let depart_list = this.$refs.tree_depart_update_dialog_ref.getCheckedNodes()
          let depart_ids = depart_list.filter(item => item.is_depart == false).map(item => item.id)
          if (depart_ids.length <= 0) return ElMessage.error('部门角色不能为空')
          let form = {
            user_id: this.curr_user.id,
            depart_ids: JSON.stringify(depart_ids),
            username: this.$refs.com_form_ref.data.username,
            tel: this.$refs.com_form_ref.data.tel,
          }
          console.log('form---:', form)
          let res = await api.update_user(form)
          console.log('res---:', res)
          this.find_departs_tree()
        },


      },





      user_list: [],
      show: {
        create: false,
        update: false,
      },

      curr_user: {},


      dropdown_opt: [
        { title: "删除" },
        { title: "修改" },
        { title: "详情" },
      ],

      form: {
        username: "",
        tel: "",

      },


      tree_depart2: {
        props: {
          children: 'children',
          label: 'name',
          nodeKey: 'id'
        },
        currentNodeKey: null,
        data: [],
        node: {},
        user_list: [],
      },


      // 数据_部门树
      tree_depart_dialog: {
        props: {
          children: 'children',
          label: 'name',
          nodeKey: 'uuid',
          disabled: "is_depart",
        },
        currentNodeKey: null,
        data: [],
        node: {},
        user_list: [],
      },



      // 数据_部门树_修改
      tree_depart_update_dialog: {
        props: {
          children: 'children',
          label: 'name',
          nodeKey: 'id',
          disabled: "is_depart",
        },
        currentNodeKey: null,
        data: [],
        node: {},
        user_list: [],
      },


    }


  },

  methods: {
    async find_departs_tree() {
      let departs_tree = await api.find_departs_tree({ id: 1 })
      console.log('111---:', departs_tree)
      this.tree_depart2.data = departs_tree
    },//

    async tree_left_click2(node) {
      console.log('111---tree_left_click2---node:', node)
      let depart_id = node.id
      let res = await api.find_user_by_depart_id({ depart_id })
      this.user_list = res.user_list
    },//


    //下拉操作
    async dropdown_opt_click(title, row) {
      console.log('dropdown_opt_click---title:', title)
      console.log('dropdown_opt_click---row:', row)
      if (title === "删除") {
        if (await isok_delete_confirm() === false) return
        console.log('删除---row:', row)
        await api.delete_user({ user_id: row.id })
        await this.find_departs_tree()
      } else if (title === "修改") {
        this.tree_depart_update_dialog.data = await api.find_depart_role_tree()

        this.show.update = true
        this.curr_user = row
        this.form_update.data.username = row.username
        this.form_update.data.tel = row.tel




        await new Promise((resolve) => setTimeout(resolve, 100))
        this.$refs.tree_depart_update_dialog_ref.setCheckedKeys(row.depart_ids);
      } else if (title === "详情") {
        alert('详情-等待开发')
      }
    },//



    tree_left_click() {



    },//

    tree_ritht_click() {

    },//  



    //新增_用户_弹窗
    async create_user_dialog() {
      this.show.create = true
      let depart_position_tree = await api.find_depart_role_tree()
      console.log('depart_position_tree---:', depart_position_tree)
      this.tree_depart_dialog.data = depart_position_tree
    },//





    //新增_用户_提交
    async create_user_submit() {
      let aaa = JSON.parse(JSON.stringify(this.$refs.tree_depart_dialog_ref.getCheckedNodes()))
      let depart_ids = aaa.filter(item => item.is_depart == false).map(item => item.id)
      if (this.form.username.length == 0) {
        ElMessage.error('用户名不能为空')
        return
      }
      if (this.form.tel.length == 0) {
        ElMessage.error('电话不能为空')
        return
      }
      if (depart_ids.length <= 0) {
        ElMessage.error('部门职位不能为空')
        return
      }
      let res = await api.create_user({ depart_ids: JSON.stringify(depart_ids), username: this.form.username, tel: this.form.tel })
      console.log('res---:', res)
      console.log('create_user---:', this.form)
    },//



    //修改_用户_提交
    async update_user_submit() {

      if (await this.$refs.com_form_ref.check() === false) return


      // console.log('update_user_submit---:', 111)





      // <el-input v-model="curr_user.username" placeholder="请输入用户名" />
      // <el-input v-model="curr_user.tel" placeholder="请输入电话" />







      // let depart_list = this.$refs.tree_depart_update_dialog_ref.getCheckedNodes()
      // let depart_ids = depart_list.filter(item => item.is_depart == false).map(item => item.id)
      // // console.log('部门角色的depart_ids---:', depart_ids) //
      // if (this.curr_user.username.length == 0) {
      //   ElMessage.error('用户名不能为空')
      //   return
      // }
      // if (this.curr_user.tel.length == 0) {
      //   ElMessage.error('电话不能为空')
      //   return
      // }
      // if (depart_ids.length <= 0) {
      //   ElMessage.error('部门职位不能为空')
      //   return
      // }
      // let res = await api.update_user({ user_id: this.curr_user.id, depart_ids: JSON.stringify(depart_ids), username: this.curr_user.username, tel: this.curr_user.tel })
      // this.find_departs_tree()
    },//


  },////

  async mounted() {
    await this.find_departs_tree()
  },////

}
</script>

<style scoped></style>