import { defineComponent, createVNode, reactive, render, ref } from 'vue'
import { ElButton, ElDialog, ElInput, ElForm, ElMessage, ElFormItem, ElTree, ElDrawer, ElCheckboxGroup, ElCheckbox } from 'element-plus'


const virtual_node = defineComponent({
  setup(props, ctx) {
    // 基础数据
    let show = $ref(false) //显示隐藏
    let form = $ref({ role: '产品经理', menus_chooseed: [1], remark: '职责: 负责产品规划、设计、开发、测试、上线、运营等' }) // 表单数据
    let that_this = () => 0


    let ElTree_ref = ref(null)
    let tree = $ref({
      data: [{ menu: '111', children: [{ menu: '222' }] }],
      data_chooseed: [],
      label: 'menu',
      children: 'children',
    })



    // 暴露方法-open
    ctx.expose({
      open: async ({item, that}) => {
        show = true
        that_this = that
        await get_menus()
      },
    })


    // 检查数据
    function check_form() {
      if (form.role.length == 0) return ElMessage.error({ message: `角色,不能为空!`, duration: 3 * 1000, showClose: true }) //检查表单
      // if (form.menu.length == 0) return ElMessage.error({ message: `路径,不能为空!`, duration: 3 * 1000, showClose: true }) //检查表单
      // if (form.parent_id != 0) return ElMessage.error({ message: `父菜单名parent_id必须为0`, duration: 3 * 1000, showClose: true }) //检查表单
      return true
    }


    // 获取角色列表
    async function get_menus() {
      let config = { method: 'get', url: `/menu/find_list` }
      let res = await axios_api(config)
      console.log('res:', res)
      tree = {
        data: res.result.menus_tree,
        data_chooseed: [],
        label: 'menu',
        children: 'children',
      }
      console.log('tree:', tree)

    }

    // 提交数据
    async function submit() {
      console.log('ElTree_ref:', ElTree_ref)
      let menus_chooseed = ElTree_ref.value.getCheckedNodes().map(item => item.id)
      console.log('menus_chooseed:', menus_chooseed)
      if (!check_form()) return

      let config = { method: 'post', url: `/role/save`, data: JSON.parse(JSON.stringify(form)) }
      console.log('config   :', config)
      let res = await axios_api(config)
      console.log('res:', res)
      if (res.code == 200) {
        ElMessage.success({ message: `添加成功`, duration: 3 * 1000, showClose: true })
        await that_this.find_list()
        show = false // 关闭弹窗
      }
    }

    return () => {
      return (
        <>
          <ElDialog v-model={show} title="新增-角色" width="600px" draggable>
            <ElForm v-model={form} label-width="50px" label-position="left">
              <ElFormItem label="角色">
                <ElInput v-model={form.role} />
              </ElFormItem>

              <ElFormItem label="备注">
                <ElInput v-model={form.remark} type="textarea" rows={2} />
              </ElFormItem>
            </ElForm>



            {/* 全选 取消 */}
            <div>
              <ElButton type="primary" plain size="small" onclick={async () => ElTree_ref.value.setCheckedNodes(tree.data)}> 全选</ElButton>
              <ElButton type="primary" plain size="small" onclick={async () => ElTree_ref.value.setCheckedNodes([])}> 取消</ElButton>
            </div>
            {/* 菜单树 */}
            <ElTree ref={ElTree_ref} data={tree.data} show-checkbox node-key="id" props={tree} default-expand-all expand-on-click-node={false} highlight-current />
            {/* 确定 */}
            <ElButton type="primary" onclick={async () => { submit() }}> 确定</ElButton>
          </ElDialog>
        </>
      )
    }
  },
})

export default function menu_add_parent_dialog(data, that) {
  dom_open('role_add_dialog', virtual_node, data, that)
}
