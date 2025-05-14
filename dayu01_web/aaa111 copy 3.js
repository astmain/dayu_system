arr = [
    {
        "id": 1,
        "depart": "大宇三维打印",
        "add": false,
        "del": false,
        "update": false,
        "look": false,
        "parent_id": 0,
        "ref_position": [],
        "children": [
            {
                "id": 10000,
                "depart": "内部人员",
                "add": false,
                "del": false,
                "update": false,
                "look": false,
                "parent_id": 1,
                "ref_position": []
            },
            {
                "id": 20000,
                "depart": "技术部",
                "add": false,
                "del": false,
                "update": false,
                "look": false,
                "parent_id": 1,
                "ref_position": []
            },
            {
                "id": 30000,
                "depart": "泉州分公司",
                "add": false,
                "del": false,
                "update": false,
                "look": false,
                "parent_id": 1,
                "ref_position": [],
                "children": [
                    {
                        "id": 30001,
                        "depart": "财务部",
                        "add": false,
                        "del": false,
                        "update": false,
                        "look": false,
                        "parent_id": 30000,
                        "ref_position": []
                    },
                    {
                        "id": 30002,
                        "depart": "业务部",
                        "add": false,
                        "del": false,
                        "update": false,
                        "look": false,
                        "parent_id": 30000,
                        "ref_position": []
                    }
                ]
            },
            {
                "id": 40000,
                "depart": "德化分公司",
                "add": false,
                "del": false,
                "update": false,
                "look": false,
                "parent_id": 1,
                "ref_position": [],
                "children": [
                    {
                        "id": 40001,
                        "depart": "财务部",
                        "add": false,
                        "del": false,
                        "update": false,
                        "look": false,
                        "parent_id": 40000,
                        "ref_position": []
                    },
                    {
                        "id": 40002,
                        "depart": "业务部",
                        "add": false,
                        "del": false,
                        "update": false,
                        "look": false,
                        "parent_id": 40000,
                        "ref_position": []
                    }
                ]
            },
            {
                "id": 77777,
                "depart": "客户",
                "add": false,
                "del": false,
                "update": false,
                "look": false,
                "parent_id": 1,
                "ref_position": []
            }
        ]
    },
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