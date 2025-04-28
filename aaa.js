// obj = {name: 111}
// kk = "name"
//
//
// let {name: bb = 222} = obj
// console.log(`111---bb:`, bb)
//
//
// obj[kkk] ? kkk : 0


let {["name"]: vvv} = {name: 333}
// let {name: aaa} = {name: 111}
res = {vvv}

console.log(vvv)
console.log(res)// {vvv:333}

aaa = "wpd1"
console.log(`111---222:`, {aaa})
console.log(`222---222:`, {aaa: aaa})


// {"aaa":111}
// dict(aaa=111)
