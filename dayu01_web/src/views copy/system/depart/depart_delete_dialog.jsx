import { defineComponent, createVNode, reactive, render, ref } from "vue";
import { ElButton, ElInput, ElForm, ElMessage, ElFormItem } from "element-plus";
import { ElTree } from "element-plus";
import { ElDrawer, ElDialog } from "element-plus";
import { ElCheckboxGroup, ElCheckbox } from "element-plus";
import { ElSelect, ElOption } from "element-plus";
import { ElCascader } from "element-plus";

function depart_add_dialog(props, ctx) {
  // 暴露方法
  ctx.expose({
    open: async ({ state, that, arg }) => {
      ElMessageBox.confirm('确定删除吗', '删除提示', { cancelButtonText: '取消', confirmButtonText: '删除' }).then(async confirm => {
        let config = { method: 'post', url: `/depart/delete?`, data: { id: state.id } }
        console.log('config:', config)
        let res = await axios_api(config)
        console.log('res:', res)
        res.code == 200 && await that.find_list_depart()
      }).catch(() => {

      })

    },
  });

  return () => {
    return (
      <div></div>
    );
  };
}

export default function open({ state, that, arg }) {
  vue_open({ state, that, arg, callback: depart_add_dialog })
}
