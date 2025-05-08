
import { defineComponent, createVNode, reactive, render, ref, onMounted } from "vue";
import { ElButton, ElInput, ElForm, ElMessage, ElFormItem, ElCard } from "element-plus";
import { ElTree } from "element-plus";
import { ElDrawer, ElDialog } from "element-plus";
import { ElCheckboxGroup, ElCheckbox } from "element-plus";
import { ElSelect, ElOption } from "element-plus";
import { ElCascader } from "element-plus";

import utils from "@src/utils/index";



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
        { min: 2, max: 20, message: '姓名-长度在 2 到 10个字符之间', trigger: 'blur' }
      ],
      opt_val: [
        { validator: validateArray, trigger: 'change' }
      ]
    }




    let ElTree_ref = ref(null)
    let tree_menu_ref = ref(null)
    let tree_depart = $ref({ data: [], checked: [], props: { label: 'label', children: 'children' } })
    let tree_menu = $ref({ data: [], checked: [], props: { label: 'name', children: 'children' } })
    let depart_menu_btns = $ref([])
    let curr_menu_permiss = $ref([])
    const tree_left_click = async (data, node, component) => {
      // 得到菜单树
      let { menus_tree } = await api.tb_menu.find_menus_tree({ menu: "" })
      console.log('tree_left_click---menus_tree---:', menus_tree)
      tree_menu.data = menus_tree
      // 得到_部门-菜单-按钮
      let result = await api.tb_depart.find_depart_menu_btn({ depart_id: data.id })
      console.log('tree_left_click---result---:', result)
      depart_menu_btns = result.depart_menu_btns
      console.error('depart_menu_btns---:', depart_menu_btns)

    }


    //todo 选中菜单权限
    function btn_select_menu(o) {
      console.log('btn_select_menu---o:', JSON.parse(JSON.stringify(o)))
      curr_menu_permiss.push(o)
      console.error('btn_select_menu---curr_menu_permiss:', JSON.parse(JSON.stringify(curr_menu_permiss)))
      let menu_ids = o.list.map(v => v.menu_id)
      tree_menu.checked = menu_ids
      console.log('menu_ids---:', menu_ids)
      console.log('tree_menu.checked---:', tree_menu.checked)
      console.log('tree_menu_ref---:', tree_menu_ref)
      tree_menu_ref.value.setCheckedKeys(menu_ids)
    }

    setTimeout(async () => {
      // 部门树
      let { departs_tree, departs_checked } = await api.tb_depart.find_menus_tree({ depart_id: 0, user_id: props.state.id })
      tree_depart.data = departs_tree
      tree_depart.checked = departs_checked


      // 部门选中
      // let { departs_tree } = await BUS.api.tb_depart.find_menus_tree({ menu: "depart" })
      // tree_depart.data = departs_tree

    }, 100)







    async function submit() {
      ElForm_ref.value.validate(async (valid) => {
        if (valid) {
          console.log('submit---form:', form)

          console.log('curr_menu_permiss---:', curr_menu_permiss)
          console.log('util.build_departs_permiss_btn_flat---:', utils.build_departs_permiss_btn_flat)

          let list = utils.build_departs_permiss_btn_flat({ arr: curr_menu_permiss, user_id: props.state.id })

          for (let index = 0; index < list.length; index++) {
            const item = list[index];
            let res = await api.tb_depart.add_depart_permission({item})
          }
          show = false
        } else {
          ElMessage.error('表单参数错误')
          return false
        }
      })
    }






    return () => (

      <ElDialog v-model={show} title={props.title} width="1000px" draggable>
        <ElForm ref={ElForm_ref} model={form} rules={rules}>
          <ElFormItem label="电话" prop='tel'>
            <ElInput v-model={form.tel} />
          </ElFormItem>
          <ElFormItem label="姓名" prop='username'>
            <ElInput v-model={form.username} />
          </ElFormItem>
        </ElForm>

        部门树

        <div style={{ display: 'flex' }}>
          <ElTree style={{ flex: 1 }} ref={ElTree_ref} onNodeClick={tree_left_click} data={tree_depart.data} show-checkbox node-key="id"
            check-on-click-node={false}
            check-on-click-leaf={false}
            default-checked-keys={tree_depart.checked}
            props={tree_depart.props} default-expand-all expand-on-click-node={false} highlight-current />





          <ElCard style={{ flex: 1 }}>
            {depart_menu_btns.map((o, key) => <ElButton onclick={() => btn_select_menu(o)} >{o.name}</ElButton>)}
            <ElTree ref={tree_menu_ref} style={{ flex: 1 }}
              data={tree_menu.data}
              props={tree_menu.props}
              default-checked-keys={tree_menu.checked}
              check-on-click-node={false}
              check-on-click-leaf={false}
              expand-on-click-node={false}
              node-key="id"
              default-expand-all
              show-checkbox
              highlight-current />
          </ElCard>
        </div>




        <ElButton type="primary" onclick={async () => { submit() }}  >确定</ElButton>
      </ElDialog>
    )
  }
})

export default function open(props) {
  vue_dialog(user_add_dialog, props)
  show = true
}


