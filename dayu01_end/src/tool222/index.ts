import Dec_public from "./Dec_public"
import {Get_form} from "./Get_form"
import R from "./R"
import build_tree from "./build_tree"
import build_tree_ids from "./build_tree_ids"
//     树桩结构

let tool = {

    R,
    // 装饰圈========================
    Dec_public,
    Get_form: Get_form,
    // 数据处理=========================
    build_tree,
    build_tree_ids

}

export default tool