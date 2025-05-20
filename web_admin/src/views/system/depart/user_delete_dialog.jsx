
import { defineComponent, createVNode, reactive, render, ref, onMounted } from "vue";
import { ElButton, ElInput, ElForm, ElMessage, ElFormItem } from "element-plus";
import { ElTree } from "element-plus";
import { ElDrawer, ElDialog } from "element-plus";
import { ElCheckboxGroup, ElCheckbox } from "element-plus";
import { ElSelect, ElOption } from "element-plus";
import { ElCascader, ElMessageBox } from "element-plus";





export default function user_delete_dialog({ id }) {
  ElMessageBox.confirm('确定删除吗', '删除提示', { cancelButtonText: '取消', confirmButtonText: '删除' }).then(async confirm => {
    console.log('confirm:', confirm)
    let res = await BUS.api.tb_user.delete({ id: id })
    console.log('res:', res)
    res.code == 200 && BUS_depart.find_user_info_list()
  }).catch((error) => {
    console.log('catch', error)
  })

}


