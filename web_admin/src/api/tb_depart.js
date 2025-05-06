let tb_depart = {
    // 部门/菜单数据
    build_departs_tree: async () => {
        const res = await axios_api({ method: "post", url: "/depart/build_departs_tree" })
        console.log('res---:', res)
        return res.result.departs_tree
    }


}



export default tb_depart