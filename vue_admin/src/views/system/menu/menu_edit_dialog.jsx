import { defineComponent, createVNode, reactive, render, ref } from 'vue'
import { ElButton, ElDialog, ElInput, ElForm, ElFormItem, ElTree, ElDrawer, ElCheckboxGroup, ElCheckbox } from 'element-plus'

const virtual_node = defineComponent({
  setup(props, ctx) {
    // 基本数据
    let show = $ref(false)
    let form = $ref({ menu: "", path: "" })


    // 暴露方法-open
    ctx.expose({
      open: async (data, that_this) => {
        show = true
        form.menu = data.menu
        form.path = data.path
      },
    })

    async function save_menu() {
      if (form.menu.length == 0) return msg_error({ message: `菜单名称,不能为空!`, duration: 3 * 1000, showClose: true }) //检查表单
      if (form.path.length == 0) return msg_error({ message: `路径,不能为空!`, duration: 3 * 1000, showClose: true }) //检查表单

      let config = { method: 'get', url: `/menu/add?`, params: form }
      let res = await axios_api(config)
      console.log('res:', res)
      if (res.code == 200) {
        show = false // 关闭弹窗

      }
    }

    return () => {
      return (
        <>
          <ElDialog v-model={show} title="编辑菜单" width="400px" draggable>
            <ElForm ref="form" v-model={form} label-position="left" label-width="120px">
              <ElFormItem prop="menu" label="菜单名称">
                <ElInput v-model={form.menu} />
              </ElFormItem>
              <ElFormItem prop="path" label="路径">
                <ElInput v-model={form.path} />
              </ElFormItem>
            </ElForm>
            <ElButton type="primary" onclick={async () => { save_menu() }} > 确定 </ElButton>
          </ElDialog>
        </>
      )
    }
  },
})

export default function menu_edit_dialog({ data, that }) {
  dom_open_data({ ui_id: 'menu_edit_dialog', virtual_node, data, that })
}