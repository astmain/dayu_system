
import { defineComponent, createVNode, reactive, render, ref } from "vue";
import { ElButton, ElInput, ElForm, ElMessage, ElFormItem } from "element-plus";
import { ElTree } from "element-plus";
import { ElDrawer, ElDialog } from "element-plus";
import { ElCheckboxGroup, ElCheckbox } from "element-plus";
import { ElSelect, ElOption } from "element-plus";
import { ElCascader } from "element-plus";

let show = $ref(false)
const depart_edit_dialog = defineComponent({
  props: {
    title: { type: String, default: '' },
    state: { type: Object, default: { id: 0, depart: "", parent_id: 0 } },
    that: { type: Object, default: () => ({}) }
  },
  setup(props, ctx) {
    console.log('props:', props)
    let ElForm_ref = ref(null)

    let form = $ref({
      id: props.state.id,
      depart: props.state.depart,
      parent_id: props.state.parent_id,
    })

    let rules = {
      depart: [
        { required: true, message: '请输入新的部门', trigger: 'blur' },
        { min: 3, max: 20, message: '部门长度在 3 到 20 个字符之间', trigger: 'blur' }
      ],
      id: [
        { required: false, message: '请输入新的部门', trigger: 'blur' },
        { min: 3, max: 20, message: '部门长度在 3 到 20 个字符之间', trigger: 'blur' }
      ]
    }




    async function submit() {
      ElForm_ref.value.validate(async (valid) => {
        if (valid) {
          console.log('submit---form:', form)
          var config = { method: 'post', url: '/depart/save', data: form }
          console.log('submit---config:', config)
          let res = await axios_api(config)
          console.log('depart_opt---res.result:', res.result)
          res.code == 200 && await props.that.find_list_depart()
          show = false
        } else {
          ElMessage.error('表单参数错误')
          return false
        }
      })

    }



    return () => (

      <ElDialog v-model={show} title={props.title} width="800px" draggable>

        <ElForm ref={ElForm_ref} model={form} rules={rules}>
          <ElFormItem label="部门" prop='depart'>
            <ElInput v-model={form.depart} />
          </ElFormItem>
        </ElForm>


        <ElButton type="primary" onclick={async () => { submit() }}  >确定</ElButton>


      </ElDialog>
    )
  }
})

export default function open(props) {
  vue_dialog(depart_edit_dialog, props)
  show = true
}




// export default function open(props) {
//   document.querySelector(`.aaa`) ? document.querySelector(`.aaa`).remove() : 0
//   let container = document.createElement('div')
//   container.className = 'aaa'
//   document.body.appendChild(container)
//   render(h(depart_edit_dialog, props), container)
//   // show = true
// }



// export default function open(props) {
//   document.querySelector(`.aaa`) ? document.querySelector(`.aaa`).remove() : 0
//   let container = document.createElement('div')
//   container.className = 'aaa'
//   document.body.appendChild(container)
//   const v_node = createVNode(depart_edit_dialog, props)
//   render(v_node, container)
//   v_node.component.exposed.open()
//   // v_node.component.exposed.show=true
// }


