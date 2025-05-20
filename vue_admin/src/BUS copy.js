let name = "BUS"
let state = {
  count: 11, //
  user_info: {}, //用户信息
  tabs_list: [{ path: '/home', label: '首页', id_parent: 0, id: 0 }], //tabs页
  tabs_active: '/home', //tabs页激活
  Atoken: '', //Atoken

  //菜单页
  menu_list: [], /*

        menu_list:  [
          {
            menu: "系统管理",
            path: "/sys",
            children: [
              { menu: "用户管理", path: "/sys/user", children: [] },
              { menu: "角色管理", path: "/sys/role", children: [] },
              { menu: "菜单管理", path: "/sys/menu", children: [] },
            ],
          },
          {
            menu: "笔记管理",
            path: "/note",
            children: [
              { menu: "测试笔记编辑", path: "/note/note_edit", children: [] },
              { menu: "测试笔记添加", path: "/note/note_add", children: [] },
              { menu: "测试笔记删除", path: "/note/note_delete", children: [] },
              { menu: "测试笔记查找", path: "/note/note_find", children: [] },
            ],
          },
          { menu: "首页", path: "/home", children: [] },
          { menu: "网站设置", path: "/webset", children: [] },
        ],
        */
}


let persist = {
  //这里存储默认使用的是session
  enabled: true, strategies: [//
    { key: 'Atoken', paths: ['Atoken'], storage: window.localStorage }, //sessionStorage
    { key: 'user_info', paths: ['user_info'], storage: window.localStorage }, //sessionStorage
    { key: 'menu_list', paths: ['menu_list'], storage: window.localStorage }, //
    { key: 'tabs_list', paths: ['tabs_list'], storage: window.localStorage }, //
    { key: 'tabs_active', paths: ['tabs_active'], storage: window.localStorage, }, //
  ],
}

export default { name, state, persist }
