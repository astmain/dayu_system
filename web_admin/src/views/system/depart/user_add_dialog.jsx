
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
    state: { type: Object, default: { tel: "", username: 0 } },
    that: { type: Object, default: () => ({}) }
  },
  setup(props, ctx) {
    console.log('props:', props)
    let ElForm_ref = ref(null)

    let form = $ref({
      tel: props.state.tel,
      username: props.state.username,
      depart_id: 0,
      opt_val: [],
      opt_list: []
    })

    let build_departs_tree = BUS.api.tb_depart.build_departs_tree()
    // console.log('build_departs_tree---:', build_departs_tree)


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
      form.opt_list = await BUS.api.tb_depart.build_departs_tree()
      console.log('form.opt_list---:', form.opt_list)
    })





    async function submit() {
      // console.log('form---:', form)
      // return
      ElForm_ref.value.validate(async (valid) => {
        if (valid) {
          console.log('submit---form:', form)
          let data={
            tel: form.tel,
            username: form.username,
            depart_id:  form.opt_val.at(-1)
          }
          var config = { method: 'post', url: '/user/add', data: data }
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

      <ElDialog v-model={show} title={props.title} width="500px" draggable>
        <ElForm ref={ElForm_ref} model={form} rules={rules}>
          <ElFormItem label="部门" prop='opt_val'>
            <ElCascader style={{ width: "300px" }} v-model={form.opt_val} options={form.opt_list}
              props={{ checkStrictly: true }}
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


