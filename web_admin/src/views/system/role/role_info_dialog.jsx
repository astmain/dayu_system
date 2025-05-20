import { defineComponent, createVNode, reactive, render, ref } from 'vue'
import { ElButton, ElDialog, ElInput, ElForm, ElMessage, ElFormItem, ElTree, ElDrawer, ElCheckboxGroup, ElCheckbox } from 'element-plus'


function role_info_dialog(props, ctx) {
  let show = $ref(false)
  let args = { kind: "info", title: "", }
  let form = $ref({ role_id: 0, role: '', remark: '', menus_chooseed: [] }) // 表单数据
  let ElTree_ref = ref(null)
  let tree = $ref({
    data: [{ menu: '111', children: [{ menu: '222' }] }],
    data_chooseed: [],
    label: 'menu',
    children: 'children',
  })



  ctx.expose({
    open: async ({ item, that, arg }) => {
      console.log('222item:', item)
      args = arg
      show = true
      form.role_id = item.id
      form.role = item.role
      form.remark = item.remark
      await find_role_menu()
    },
  })


  async function find_role_menu() {
    // if (!check_form()) return
    let config = { method: 'get', url: `/role/find_role_menu`, params: form }
    console.log('config   :', config)
    let res = await axios_api(config)
    console.log('res   :', res)
    if (res.code == 200) {
      tree.data = utils.menu_get_menus_tree({ menus: res.result.menus_curr })
      tree.menus_chooseed = res.result.menus_chooseed
      console.log('tree   :', tree)
    }
  }


  return () => {
    return <ElDialog v-model={show} title={args.title} width="600px" draggable>
      {/* 菜单树 */}

      {args.kind == 'info' && <ElTree ref={ElTree_ref} data={tree.data} node-key="id" props={tree} default-expand-all expand-on-click-node={false} highlight-current />}
      {args.kind == 'edit' && <ElTree ref={ElTree_ref} data={tree.data} show-checkbox node-key="id" props={tree} default-expand-all expand-on-click-node={false} highlight-current />}

    </ElDialog>



  }

}

export default function open({ item, that, arg, }) {
  vue_open({ item, that, arg, callback: role_info_dialog })
}
