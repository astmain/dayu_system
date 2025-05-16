arr = [
  {
    "id": 77778,
    "depart": "人力资源部",
    "add": true,
    "del": true,
    "update": true,
    "look": true,
    "parent_id": 0,
    "ref_position": [
      {
        "id": 1,
        "position": "HR总监",
        "depart_id": 77778
      },
      {
        "id": 2,
        "position": "招聘专员",
        "depart_id": 77778
      },
      {
        "id": 3,
        "position": "培训专员",
        "depart_id": 77778
      },
      {
        "id": 4,
        "position": "薪酬福利专员",
        "depart_id": 77778
      }
    ]
  },
  {
    "id": 77779,
    "depart": "信息技术部",
    "add": true,
    "del": true,
    "update": true,
    "look": true,
    "parent_id": 0,
    "ref_position": [
      {
        "id": 5,
        "position": "CTO",
        "depart_id": 77779
      },
      {
        "id": 6,
        "position": "前端开发工程师",
        "depart_id": 77779
      },
      {
        "id": 7,
        "position": "后端开发工程师",
        "depart_id": 77779
      },
      {
        "id": 8,
        "position": "测试工程师",
        "depart_id": 77779
      },
      {
        "id": 9,
        "position": "运维工程师",
        "depart_id": 77779
      }
    ]
  },
  {
    "id": 77780,
    "depart": "财务部",
    "add": true,
    "del": false,
    "update": true,
    "look": true,
    "parent_id": 0,
    "ref_position": [
      {
        "id": 10,
        "position": "财务总监",
        "depart_id": 77780
      },
      {
        "id": 11,
        "position": "会计",
        "depart_id": 77780
      },
      {
        "id": 12,
        "position": "出纳",
        "depart_id": 77780
      }
    ]
  }
]


//js将ref_position 字段替换成 childern

function transformDepartments(data, key_old, key_new) {
  return data.map(o => {



    let ele = { ...o }
    ele[key_new] = o[key_old]
    ele[key_old] = undefined
    delete ele[key_old]

    return ele
  });
}

arr = transformDepartments(arr, "ref_position", 'children')
arr = transformDepartments(arr, "depart", 'name')

console.log('111---:', JSON.stringify(arr,null,2))
