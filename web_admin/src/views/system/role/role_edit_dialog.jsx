import { defineComponent, createVNode, reactive, render, ref } from 'vue'
import { ElButton, ElDialog, ElInput, ElForm, ElMessage, ElFormItem, ElTree, ElDrawer, ElCheckboxGroup, ElCheckbox } from 'element-plus'

const virtual_node = defineComponent({
  setup(props, ctx) {
    // 基础数据
    let show = $ref(false) //显示隐藏
    let form = $ref({ role_id: 0, role: '', remark: '',menus_chooseed:[]}) // 表单数据
    let that_this = () => 0
    let ElTree_ref = ref(null)
    let tree = $ref({
      data: [{ menu: '111', children: [{ menu: '222' }] }],
      menus_chooseed: [],
      label: 'menu',
      children: 'children',
    })

    ctx.expose({
      open: async ({ item, that}) => {
        console.log('item   :', item)
        show = true
        that_this = that
        form.role_id = item.id
        form.role = item.role
        form.remark = item.remark
        await find_role_menu()
      },
    }) // 暴露方法-open


    function check_form() {
      if (form.role_id <= 0) return ElMessage.error({ message: `角色,必须大于0!`, duration: 3 * 1000, showClose: true }) //检查表单
      return true
    }

    async function find_role_menu() {
      if (!check_form()) return
      let config = { method: 'get', url: `/role/find_role_menu`, params: form }
      console.log('config   :', config)
      let res = await axios_api(config)
      console.log('res   :', res)
      if (res.code == 200) {
        tree.data = utils.menu_get_menus_tree({ menus: res.result.menus_flat })
        tree.menus_chooseed = res.result.menus_chooseed
        console.log('tree   :', tree)
      }
    }


    async function submit() {
      console.log('ElTree_ref:', ElTree_ref)
      form.menus_chooseed = ElTree_ref.value.getCheckedNodes().map(item => item.id)
      console.log('form.menus_chooseed:', form.menus_chooseed)

        if (!check_form()) return
        let config = { method: 'post', url: `/role/save`, data: form }
        console.log('config   :', config)
        let res = await axios_api(config)
        console.log('res   :', res)

    }

    return () => {
      return (
        <>
          <ElDialog v-model={show} title="编辑-角色" width="600px" draggable>
            <ElForm v-model={form} label-width="120px" label-position="left">
              <ElFormItem label="角色"> <ElInput v-model={form.role} /> </ElFormItem>
              <ElFormItem label="备注"> <ElInput v-model={form.remark} type="textarea" rows={2} /> </ElFormItem>
            </ElForm>


            {/* 全选 取消 */}
            <div>
              <ElButton type="primary" plain size="small" onclick={async () => ElTree_ref.value.setCheckedNodes(tree.data)}> 全选</ElButton>
              <ElButton type="primary" plain size="small" onclick={async () => ElTree_ref.value.setCheckedNodes([])}> 取消</ElButton>
            </div>


            {/* 菜单树 */}
            <ElTree ref={ElTree_ref} data={tree.data} show-checkbox node-key="id" props={tree} default-checked-keys={tree.menus_chooseed} default-expand-all expand-on-click-node={false} highlight-current />

            {/* 确定 */}
            <ElButton type="primary" onclick={async () => { submit() }} >  确定 </ElButton>
          </ElDialog>
        </>
      )
    }
  },
})

export default function menu_add_parent_dialog(data, that) {
  dom_open('role_add_dialog', virtual_node, data, that)
}
