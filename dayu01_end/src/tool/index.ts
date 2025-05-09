import Dec_public from "./Dec_public"
import R from "./R"
import build_menus_tree from "./build_menus_tree"
import build_departs_tree from "./build_departs_tree"
import build_tree from "./build_tree"
//     树桩结构

let tool = {

    R,
    // 装饰圈========================
    Dec_public,
    // 数据处理=========================
    build_tree,
    build_menus_tree,

    build_departs_tree,

}

export default tool