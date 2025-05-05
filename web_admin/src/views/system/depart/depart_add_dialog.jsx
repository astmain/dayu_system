import { defineComponent, createVNode, reactive, render, ref } from "vue";
import { ElButton, ElInput, ElForm, ElMessage, ElFormItem } from "element-plus";
import { ElTree } from "element-plus";
import { ElDrawer, ElDialog } from "element-plus";
import { ElCheckboxGroup, ElCheckbox } from "element-plus";
import { ElSelect, ElOption } from "element-plus";
import { ElCascader } from "element-plus";

function depart_add_dialog(props, ctx) {
  let data = $ref({
    show: false,
    arg: {},
    form: {
      depart: "",
      parent_id: 0,
      opt_val: [],
      opt_list: [
        { value: '111', label: '111', children: [{ value: '111-1', label: '111-1', }, { value: '111-2', label: '111-2', },] },
        { value: '222', label: '222', children: [{ value: '222-1', label: '222-1', }, { value: '222-2', label: '222-2', },] }
      ]
    },

  });
  ctx.expose({
    open: async ({ item, that, arg }) => {
      console.log("open---item:", item);
      console.log("open---that:", that);
      console.log("open---arg:", arg);
      data.show = true
      data.arg = arg

      await depart_opt()
    },
  });


  async function depart_opt() {
    var config = { method: 'post', url: '/depart/depart_opt', data: {} }
    console.log('depart_opt---config:', config)
    let res = await axios_api(config)
    console.log('depart_opt---res.result:', res.result)
    data.form.opt_list = res.result.opt_list
    data.form.opt_val = res.result.opt_val
  }

  function check_form() {
    console.log('check_form---222:', 222)
    let check_isok = true
    if (data.form.depart.length == 0) (check_isok = false, ElMessage.error({ message: `部门,不能为空!`, duration: 3 * 1000, showClose: true }))
    return check_isok
  }


  async function submit() {
    if (!check_form()) return





    console.log('submit---:', JSON.parse(JSON.stringify(data.form)))

    let form = {
      depart: data.form.depart,
      parent_id: data.form.opt_val.at(-1)
    }
    var config = { method: 'post', url: '/depart/save', data: form }
    console.log('submit---config:', config)
    let res = await axios_api(config)
    console.log('depart_opt---res.result:', res.result)
  }



  return () => {
    return (
      <ElDialog v-model={data.show} title={data.arg.title} width="800px" draggable>
        {/* <ElForm v-model={data.form} label-width="60px" label-position="left" inline={true}> */}
        <ElForm v-model={data.form} inline={true}>
          <ElFormItem label="父级">
            <ElCascader style={{ width: "300px" }} v-model={data.form.opt_val} options={data.form.opt_list}></ElCascader>
          </ElFormItem>
          <ElFormItem label="部门">
            <ElInput v-model={data.form.depart} />
          </ElFormItem>
        </ElForm>

        <ElButton type="primary" onclick={async () => { submit() }}  >确定</ElButton>


      </ElDialog>
    );
  };
}

export default function open({ item, that, arg }) {
  vue_open({ item, that, arg, callback: depart_add_dialog })
}
