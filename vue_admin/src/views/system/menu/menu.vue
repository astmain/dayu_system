<template>

  <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
  <el-button @click="met1()">met1</el-button>


  <!-- 搜索表单 -->
  <el-form :model="form" :inline="true" size="default">
    <el-form-item class="left">
      <el-input v-model="form.menu" @keyup.enter="find()">
        <template #prepend>
          <span style="width: 50px; text-align: left; color: #555; font-weight: 600">菜单名称</span>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item style="position: absolute; right: 0; margin-right: 0px">
      <el-button-group>
        <el-button type="primary" plain @click="find()">搜索</el-button>
        <!-- <el-button type="default" plain @click="; (form_find.menu = ''), find_menu_list()">清空</el-button> -->
        <el-button type="success" plain @click="menu_add_parent_dialog()">添加</el-button>
      </el-button-group>
    </el-form-item>
  </el-form>



  <el-tree :data="tree.data" show-checkbox node-key="menu" default-expand-all :expand-on-click-node="false">
    <template #default="{ node, data }">
      <div>
        <div style="width: 900px">
          <span style="width: 300px; display: inline-block"
            @contextmenu.prevent.stop="menu_target_click($event, data, node)">{{ data.menu }}</span>
          <span v-if="!data.parent" style="margin-left: 200px; display: inline-block">
            <nav style="display: flex; align-items: center; justify-content: center">
              <a style="color: #409eff; margin-right: 10px" @click="menu_edit_dialog(data)"> 编辑 </a>
              <el-dropdown size="small" placement="bottom-start">
                <div
                  style="cursor: pointer; display: flex; align-items: center; justify-content: center; border: none; outline: none">
                  ••</div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item size="small" divided @click="menu_add_child_dialog(data)">添加子菜单</el-dropdown-item>
                    <el-dropdown-item size="small" divided @click="delete_menu(data.menu)">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </nav>
          </span>
          <span v-else style="margin-left: 182px; display: inline-block">
            <nav style="display: flex; align-items: center; justify-content: center">
              <a style="color: #409eff; margin-right: 10px" @click="menu_edit_dialog(data)"> 编辑 </a>
              <el-dropdown size="small" placement="bottom-start">
                <div
                  style="cursor: pointer; display: flex; align-items: center; justify-content: center; border: none; outline: none">
                  ••</div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item size="small" divided @click="delete_menu(data.menu)">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </nav>
          </span>
        </div>
      </div>
    </template>
  </el-tree>


  <!-- 右键菜单 -->
  <VueSimpleContextMenu elementId="VueSimpleContextMenu" :options="ContextMenu.opt" ref="VueSimpleContextMenu_ref"
    @option-clicked="menu_opt_click" />

</template>





<script>
export default {
  data() {
    return {
      name: "数据1",
      form: { menu: "" },
      tree: {
        data: [{ menu: '1111', children: [{ menu: '222' }] }],
        data_chooseed: [],
      },
      ContextMenu: {
        opt: [{ name: '查看' }, { name: '添加子菜单' }, { name: '', type: 'divider' }, { name: '删除' }],
      },
    }


  },

  methods: {
    async met1() {
      console.log('met1      :', this.$route)
    },//


    async menu_add_parent_dialog() {
      require('./menu_add_parent_dialog.jsx')({ data: '空', that: this })
    },//

    async find() {
      let config = { method: 'get', url: '/menu/find_list', params: { menu: this.form.menu } }
      let res = await axios_api(config)
      console.log('res      :', res)
      this.tree.data = res.result
    },//


    async menu_opt_click({ option, item, }) {
      console.log(`menu_opt_click---option:`, option)
      console.log(`menu_opt_click---item:`, item)
      if (option.name == '删除') {
        this.delete_menu(item.menu)
      }
      if (option.name == '编辑') {
        this.menu_edit_dialog(item)
      }

      if (option.name == '添加子菜单') {
        console.log('添加子菜单---item',item)
        console.log('添加子菜单---item.menu',item.menu)
        require('./menu_add_child_dialog.jsx')({ data:{parent:item.menu}, that: this })
      }

    },

    async menu_target_click(event, data, node) {
      // console.log('menu_target_click---event:', event)
      // // console.log('menu_target_click---node:',  JSON.parse (JSON.stringify(node)))
      console.log('menu_target_click---data:', JSON.parse(JSON.stringify(data)))
      // let menu_target = this.$refs.menu_target[index]
      // let rect = menu_target.getBoundingClientRect()
      // Object.defineProperty(event, 'pageX', { value: rect.right + 4, writable: true })
      // Object.defineProperty(event, 'pageY', { value: rect.top + rect.height / 2, writable: true })
      console.log('menu_target_click---this.$refs:', this.$refs)
      console.log('menu_target_click---this.$refs.VueSimpleContextMenu_ref:', this.$refs.VueSimpleContextMenu_ref)
      this.$refs.VueSimpleContextMenu_ref.showMenu(event, data)
      console.log(`menu_target_click---item:`, data)
    },


  },////

  async mounted() {

  },////

}
</script>

<style scoped></style>