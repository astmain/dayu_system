
import { defineComponent, createVNode, reactive, render, ref, onMounted } from "vue";
import { ElButton, ElInput, ElForm, ElMessage, ElFormItem } from "element-plus";
import { ElTree } from "element-plus";
import { ElDrawer, ElDialog } from "element-plus";
import { ElCheckboxGroup, ElCheckbox } from "element-plus";
import { ElSelect, ElOption } from "element-plus";
import { ElCascader } from "element-plus";


let show = $ref(false)
const user_info_dialog = defineComponent({
  props: {
    title: { type: String, default: '' },
    state: { type: Object, default: { tel: "", username: 0 } },
    that: { type: Object, default: () => ({}) }
  },
  setup(props, ctx) {
    let form = $ref({
      tel: props.state.tel,
      username: props.state.username,
      password: props.state.password,
      menus_tree: { data: props.state.menus_tree, props: { children: 'children', label: 'name', nodeKey: 'id' } }
    })
    console.log('form:', form)


    async function submit() {
      console.log('submit---props:', props)

    }



    return () => (

      <ElDialog v-model={show} title={props.title} width="500px" draggable>
        <ElForm model={form} >
          <ElFormItem label="电话" prop='tel'>
            <ElInput v-model={form.tel} />
          </ElFormItem>
          <ElFormItem label="姓名" prop='username'>
            <ElInput v-model={form.username} />
          </ElFormItem>
        </ElForm>


        {/* <el-tree :data="tree_depart.data" :props="tree_depart.props" :node-key="tree_depart.id"
        @node-click="tree_left_click" @node-contextmenu="tree_ritht_click" :expand-on-click-node="false"
        highlight-current default-expand-all></el-tree> */}

        <ElTree data={form.menus_tree.data}
          node-key="id"
          props={form.menus_tree.props}
          expand-on-click-node={false}
          highlight-current
          default-expand-all
        >


        </ElTree>


        <ElButton type="primary" onclick={async () => { submit() }}  >确定</ElButton>
      </ElDialog>
    )
  }
})

export default function open(props) {
  vue_dialog(user_info_dialog, props)
  show = true
}


