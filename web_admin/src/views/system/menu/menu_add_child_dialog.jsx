import { defineComponent, createVNode, reactive, render, ref } from 'vue'
import { ElButton, ElDialog, ElInput, ElForm, ElFormItem, ElTree, ElDrawer, ElMessage, ElCheckboxGroup, ElCheckbox } from 'element-plus'

const virtual_node = defineComponent({
  props: { data: { default: {}, required: false }, that: { default: null, required: false } },
  setup(props, ctx) {
    // 基础数据
    let show = $ref(false) //显示隐藏
    let form = $ref({ menu: '', path: '', parent: ""}) // 表单数据
    console.log('setup---props:', props)
    console.log('setup---form:', form)

    ctx.expose({
      open: async (data) => {
        show = true
        form.parent = data.parent
      },
    }) // 暴露方法-open


    function check_form() {
      if (form.path.length == 0) return ElMessage.error({ message: `菜单名,不能为空!`, duration: 3 * 1000, showClose: true }) //检查表单
      if (form.menu.length == 0) return ElMessage.error({ message: `路径,不能为空!`, duration: 3 * 1000, showClose: true }) //检查表单
      if (form.parent.length == 0) return ElMessage.error({ message: `父菜单名,不能为空!`, duration: 3 * 1000, showClose: true }) //检查表单
      // if (form.parent_path.length == 0) return ElMessage.error({ message: `父路径,不能为空!`, duration: 3 * 1000, showClose: true }) //检查表单
      return true
    }


    async function add_menu_parent() {
      if (!check_form()) return
      let config = { method: 'get', url: `/menu/add`, params: { menu: form.menu, path: form.path, parent: form.parent_menu } }
      console.log('config   :', config)
      let res = await axios_api(config)
      console.log('res:', res)
      if (res.code == 200) {
        ElMessage.success({ message: `添加成功`, duration: 3 * 1000, showClose: true })
        show = false // 关闭弹窗
        // props.that.find_menu_list() //父组件,重新搜索
      }
    }

    return () => {
      return (
        <>
          <ElDialog v-model={show} title="新增子菜单" width="400px" draggable>
            <ElForm v-model={form} label-width="120px" label-position="left">
              <ElFormItem label="[父]菜单名称">
                <ElInput v-model={form.parent} disabled />
              </ElFormItem>
              {/* <ElFormItem label="[父]路径">
                <ElInput v-model={form.parent_path} disabled />
              </ElFormItem> */}

              <ElFormItem label="[子]菜单名称">
                <ElInput v-model={form.menu} />
              </ElFormItem>

              <ElFormItem label="[子]路径">
                <ElInput v-model={form.path} />
              </ElFormItem>
            </ElForm>

            <ElButton
              type="primary"
              onclick={async () => {
                add_menu_parent()
              }}
            >
              确定
            </ElButton>
          </ElDialog>
        </>
      )
    }
  },
})

export default function menu_add_child_dialog({ data, that }) {
  console.log('menu_add_child_dialog---data:', data)
  dom_open_data({ ui_id: 'menu_add_child_dialog', virtual_node, data, that })
}
