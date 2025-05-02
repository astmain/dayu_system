import R from "./R"
import make_menu_tree from "./make_menu_tree"
import menu_get_menus_flat_by_user_id from "./menu_get_menus_flat_by_user_id"
import menu_get_menus_tree from "./menu_get_menus_tree.js"
import {Dec_public} from "./Dec_public";

let util = {
    R: R,
    make_menu_tree: make_menu_tree,
    menu_get_menus_flat_by_user_id,
    menu_get_menus_tree,
    Dec_public,
}

export default util