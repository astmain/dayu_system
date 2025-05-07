arr = [
    [
        1,
        2
    ],
    [
        1,
        3
    ],
    [
        1,
        2,
        22,
        [111,222]
    ]
]

//遍历数组  得到每个数组中的最后一个元素
const lastElements = arr.map(subArray => {
    const lastItem = subArray[subArray.length - 1];
    // 如果最后一个元素是数组，返回该数组的最后一个元素
    return Array.isArray(lastItem) ? lastItem[lastItem.length - 1] : lastItem;
});


function get_arr_last_element(arr){
    return arr.map(subArray => {
        const lastItem = subArray[subArray.length - 1];
        // 如果最后一个元素是数组，返回该数组的最后一个元素
        return Array.isArray(lastItem) ? lastItem[lastItem.length - 1] : lastItem;
    });
}
get_last_element(arr)


console.log(get_last_element(arr))





