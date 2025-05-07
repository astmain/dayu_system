import { ElMessage } from "element-plus";
let tb_user = {
    // 删除用户_根据id
    delete: async ({id}) => {
        const res = await axios_api({ method: "post", url: "/user/delete",data:{id:id} })
        console.log('res---:', res)
        res.code===200 ? ElMessage.success({ message: `添加成功`, duration: 3 * 1000, showClose: true }):0
        return res
    }


}



export default tb_user