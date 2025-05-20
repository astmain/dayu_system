
import { defineComponent, createVNode, reactive, render, ref, onMounted } from "vue";
import { ElButton, ElInput, ElForm, ElMessage, ElFormItem } from "element-plus";
import { ElTree } from "element-plus";
import { ElDrawer, ElDialog } from "element-plus";
import { ElCheckboxGroup, ElCheckbox } from "element-plus";
import { ElSelect, ElOption } from "element-plus";
import { ElCascader } from "element-plus";


let show = $ref(false)
const user_add_dialog = defineComponent({
  props: {
    title: { type: String, default: '' },
    state: { type: Object, default: { tel: "", username: 0, id: 0, depart_id: 0 } },

    that: { type: Object, default: () => ({}) }
  },
  setup(props, ctx) {
    console.log('props:', props)
    let ElForm_ref = ref(null)

    let form = $ref({
      tel: props.state.tel,
      id: props.state.id,
      username: props.state.username,
      depart_id: 0,
      opt_val: [],
      opt_list: []
    })

    const validateArray = (rule, value, callback) => {
      if (!Array.isArray(value)) {
        callback(new Error('必须为数组'));
      } else if (value.length < 1) {
        callback(new Error('数组长度必须大于等于 1'));
      } else {
        callback();
      }
    };


    let rules = {
      tel: [
        { required: true, message: '请输入-手机号码', trigger: 'blur' },
        { min: 3, max: 20, message: '手机号码-长度在 3 到 20 个字符之间', trigger: 'blur' }
      ],
      username: [
        { required: true, message: '请输入-姓名', trigger: 'blur' },
        { min: 3, max: 20, message: '姓名-长度在 1 到 10个字符之间', trigger: 'blur' }
      ],
      opt_val: [
        { validator: validateArray, trigger: 'change' }
      ]
    }



    setTimeout(async () => {
      let { opt_val, opt_list } = await BUS.api.tb_user.find_user_info_depart({ id: props.state.id })
      console.log('opt_val---:', opt_val)
      console.log('opt_list---:', opt_list)
      form.opt_val = opt_val
      form.opt_list = opt_list



    })





    async function submit() {
      // console.log('form---:', JSON.parse(JSON.stringify(form)))
      // return
      ElForm_ref.value.validate(async (valid) => {
        if (valid) {
          console.log('submit---form:', form)
          let  depart_ids = utils.arr_last_element(form.opt_val)
          let res = await BUS.api.tb_user.update({ id: props.state.id, tel: form.tel, username: form.username, depart_ids:depart_ids })
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

      <ElDialog v-model={show} title={props.title} width="500px" draggable>
        <ElForm ref={ElForm_ref} model={form} rules={rules}>
          <ElFormItem label="部门" prop='opt_val'>
            <ElCascader style={{ width: "300px" }} v-model={form.opt_val} options={form.opt_list}
              props={{ checkStrictly: false, multiple: true }}
            ></ElCascader>
          </ElFormItem>



          <ElFormItem label="电话" prop='tel'>
            <ElInput v-model={form.tel} />
          </ElFormItem>
          <ElFormItem label="姓名" prop='username'>
            <ElInput v-model={form.username} />
          </ElFormItem>
        </ElForm>
        <ElButton type="primary" onclick={async () => { submit() }}  >确定</ElButton>
      </ElDialog>
    )
  }
})

export default function open(props) {
  vue_dialog(user_add_dialog, props)
  show = true
}


