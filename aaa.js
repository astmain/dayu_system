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


console.log(`111---222:`, Number.isInteger)


var urlEncoded = "/get_params/%E6%88%91%E7%9A%84";
var urlEncoded = "/get_params/111";
const decoded = decodeURI(urlEncoded);
console.log(decoded);


aaa = {username: "小许", password: "123456", role: 'admin', nickname: "瘾大技术差", avatar: "https://gitee.com/astmain/static/raw/master/avatar/pikaqiu_01.jpg"}
console.log(JSON.stringify(    aaa    )              )


// @IsNotEmpty()
// @IsString()
// username: string;
//
// @IsNotEmpty()
// @IsString()
// password: string;
//
// @IsNotEmpty()
// @IsString()
// role: string;
//
// @IsNotEmpty()
// @IsString()
// nickname: string;
//
// @IsNotEmpty()
// @IsString()
// avatar: string;


// {"aaa":111}
// dict(aaa=111)
