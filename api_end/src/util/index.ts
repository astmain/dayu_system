import R from "./R"
import make_menu_tree from "./make_menu_tree"
import menu_get_menus_flat_by_user_id from "./menu_get_menus_flat_by_user_id"
import menu_get_menus_tree from "./menu_get_menus_tree.js"
import {Dec_public} from "./Dec_public";
import get_menus_flat_by_role_id from "./make_menus_flat_by_role_id";

import make_menus_flat_by_role from "./make_menus_flat_by_role";
import build_departs_tree from "./build_departs_tree";

let util = {
    R: R,
    make_menu_tree,
    make_menus_flat_by_role,
    menu_get_menus_flat_by_user_id,
    get_menus_flat_by_role_id,
    menu_get_menus_tree,
    Dec_public,

//     树桩结构
    build_departs_tree
}

export default util