depart_menu = [
    {
        "id": 12,
        "depart_id": 20012,
        "menu_id": 1,
        "role": "high-泉州-业务",
        "look": true,
        "del": false,
        "add": false,
        "update": false,
        "other": ""
    },
    {
        "id": 13,
        "depart_id": 20012,
        "menu_id": 2,
        "role": "high-泉州-业务",
        "look": true,
        "del": false,
        "add": false,
        "update": false,
        "other": ""
    },
    {
        "id": 22,
        "depart_id": 20012,
        "menu_id": 1,
        "role": "low-泉州-业务",
        "look": true,
        "del": false,
        "add": false,
        "update": false,
        "other": ""
    },
    {
        "id": 23,
        "depart_id": 20012,
        "menu_id": 2,
        "role": "low-泉州-业务",
        "look": true,
        "del": false,
        "add": false,
        "update": false,
        "other": ""
    }
]

//帮我 得到一个新的数组 role 分组
// console.log('depart_menu---:', depart_menu)

function build_depart_menu_btn(depart_menu) {



    let result = {}
    for (let index = 0; index < depart_menu.length; index++) {
        const ele = depart_menu[index];
        console.log('111---:', ele)
        if (!result[ele.role]) {
            result[ele.role] = []
        }
        result[ele.role].push(ele)
    }

   let arr = []

    for (const key in result) {
      let  item={name:key,list:result[key]}
        arr.push(item)
    }


    return arr
}

console.log('result---:', build_depart_menu_btn(depart_menu))



