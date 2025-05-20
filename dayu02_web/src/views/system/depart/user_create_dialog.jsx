import { defineComponent, createVNode, reactive, render, ref, onMounted } from "vue";
import { ElButton, ElInput, ElForm, ElMessage, ElFormItem } from "element-plus";
import { ElTree } from "element-plus";
import { ElDrawer, ElDialog } from "element-plus";
import { ElCheckboxGroup, ElCheckbox } from "element-plus";
import { ElSelect, ElOption } from "element-plus";
import { ElCascader } from "element-plus";


let show = $ref(false)
const menu_dialog = defineComponent({
  props: {
    title: { type: String, default: '' },
    state: { type: Object, default: { depart_id:0,   username: "", tel: "" } },
    that: { type: Object, default: () => ({}) }
  },
  setup(props, ctx) {
    let form = $ref({ username: "", tel: "", depart_id:props.state.depart_id})
    console.error('form:', form)
    console.error('state:', props.state)


    function check_form() {
      let isok = true
      if (form.username.length == 0) (isok = false, ElMessage.error({ message: `用户名不能为空!`, duration: 3 * 1000, showClose: true })) //检查表单
      if (form.tel.length == 0) (isok = false, ElMessage.error({ message: `电话不能为空!`, duration: 3 * 1000, showClose: true })) //检查表单
      return isok
    }



    async function submit() {
      if (!check_form()) return
      console.log('111---:', form)
      await api.create_user(form)

    }



    return () => (
      <ElDialog v-model={show} title={props.title} width="500px" draggable>
        <ElForm model={form} >

        <ElFormItem label="部门id" prop='position'>
            <ElInput v-model={form.depart_id} />
          </ElFormItem>
          <ElFormItem label="用户名" prop='position'>
            <ElInput v-model={form.username} />
          </ElFormItem>

          <ElFormItem label="电话" prop='position'>
            <ElInput v-model={form.tel} />
          </ElFormItem>

        </ElForm>
        <ElButton type="primary" onclick={async () => { submit() }}  >确定</ElButton>
      </ElDialog>
    )
  }
})

export default function open(props) {
  vue_dialog(menu_dialog, props)
  show = true
}


