arr =  [
    [ 1, 2 ],
    [ 3 ],
    [ 2001, 1, 20011 ],
    [ 2001, 1, 20012 ],
    [ 2002, 1, 20021 ],
    [ 2002, 1, 20022 ]
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



console.log(get_arr_last_element(arr))





