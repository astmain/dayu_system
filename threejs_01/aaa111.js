let arr=[
    {
        "id": 1,
        "name": "大宇三维打印",
        "is_depart": true,
        "parent_id": 0,
        "uuid": "a10c440e-5732-4ba9-82d8-076186886633",
        "ref_position": [],
        "children": [
            {
                "id": 4,
                "name": "技术部",
                "is_depart": true,
                "parent_id": 1,
                "uuid": "d03f9fe6-88a3-4f67-85d4-edac3f473b7b",
                "ref_position": [
                    {
                        "id": 1,
                        "name": "主管",
                        "is_depart": false,
                        "depart_id": 4,
                        "uuid": "6aaa9d38-d90b-4a5b-9021-69b923828ac1"
                    },
                    {
                        "id": 2,
                        "name": "职员",
                        "is_depart": false,
                        "depart_id": 4,
                        "uuid": "90a3aebc-d48c-489e-9241-c16ef0f837cb"
                    }
                ],
                "children": [
                    {
                        "id": 8,
                        "name": "aaa",
                        "is_depart": true,
                        "parent_id": 4,
                        "uuid": "79e7e65d-3beb-4ba8-bdef-762546881003",
                        "ref_position": [],
                        "children": null
                    }
                ]
            },
            {
                "id": 5,
                "name": "泉州分公司",
                "is_depart": true,
                "parent_id": 1,
                "uuid": "5af218c0-5c59-4b1a-a01c-62942245dd8a",
                "ref_position": [],
                "children": [
                    {
                        "id": 6,
                        "name": "财务部",
                        "is_depart": true,
                        "parent_id": 5,
                        "uuid": "bc82ac5c-027f-4b1e-b47a-406b6021a2b9",
                        "ref_position": [],
                        "children": null
                    },
                    {
                        "id": 7,
                        "name": "业务部",
                        "is_depart": true,
                        "parent_id": 5,
                        "uuid": "d59e8392-eafc-4cdf-af1c-dbb78f0012bc",
                        "ref_position": [],
                        "children": null
                    }
                ]
            }
        ]
    }
];

function transformArray(arr) {
    return arr.map(item => {
        // Create a new object without ref_position
        const newItem = { ...item };
        
        // Initialize children array if it doesn't exist
        if (!newItem.children) {
            newItem.children = [];
        }
        
        // If ref_position exists and has items, add them to children
        if (newItem.ref_position && newItem.ref_position.length > 0) {
            newItem.children = [...newItem.children, ...newItem.ref_position];
        }
        
        // Remove ref_position from the item
        delete newItem.ref_position;
        
        // Recursively process children if they exist
        if (newItem.children && newItem.children.length > 0) {
            newItem.children = transformArray(newItem.children);
        }
        
        return newItem;
    });
}

// Transform the array
const transformedArr = transformArray(arr);
console.log(JSON.stringify(transformedArr, null, 2));

