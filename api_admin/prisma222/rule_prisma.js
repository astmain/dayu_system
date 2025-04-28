const yup = require('yup')

// 创建验证类

const rule_prisma = class {
    constructor() {
    }

    file(path_file) {
        this.path_file = path_file
        return this
    }

    table(table_name) {
        this.table_name = table_name
        return this
    }

    // 主方法调用
    async check(data) {
        let rule = this.get_rule(this.path_file, this.table_name)
        // console.log(`111---rule:`, rule)
        let valid = await this.validate({rule, data})
        return valid
    }

    // 验证
    async validate({rule, data}) {
        try {
            const validatedData = await rule.validate(data, {abortEarly: false});
            return {success: true, data: validatedData, check_error: null};
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                const check_error = this.formatErrors(error);
                return {success: false, data: null, check_error};
            } else {
                return {success: false, data: null, check_error: error}
            }
        }
    }

    // 格式化错误信息
    formatErrors(error) {
        let check_error = error.inner.map(o => {
            let key = o.path
            // let label = o.params.label ? o.params.label : `${label_key}未填写label()`
            // let label = o.params.label ? o.params.label : label_key
            let errors = o.errors
            let errors_str = o.errors.join("   ")
            return {key, errors, errors_str}
        })
        // console.log(`form_yup_validator---formatErrors---info:`, info)
        return check_error
    }


    get_rule(path_file, table_name) {
        let _ = require('yup')
        let {readFileSync} = require("fs")
        let {formatAst, parsePrismaSchema} = require("@loancrate/prisma-schema-parser")
        console.log(`111---__dirname:`,     __dirname        )
        let ast = parsePrismaSchema(readFileSync(path_file, {encoding: "utf8"}))
        let declarations = ast.declarations

        let table = declarations.find(v => v?.name?.value === table_name)
        // console.log(`111---table:`, table)
        let members = table.members
        let obj = {}
        members.map(o => {
            let key = o.name.value
            let value = ""
            if (o.type.name.value === "Int") {
                value = _.number().strict()
            }
            if (o.type.name.value === "String") {
                value = _.string()
            }
            if (o.type.name.value === "Boolean") {
                value = _.boolean()
            }
            if (o.type.name.value === "Json") {
                value = _.mixed().test('is-json', '值必须json', (o) => {
                    return Object.prototype.toString.call(o) === '[object Array]' || Object.prototype.toString.call(o) === '[object Object]'
                })
            }
            obj[key] = value
        })
        // console.log(`222---obj:`, obj)
        return _.object(obj)
    }

}


module.exports = rule_prisma

//
// test()
//
// async function test() {
//     let data = {
//         cookies_str: "1111", //
//         // cookies:   {aaa: 111},
//         cookies:      JSON.stringify(       {aaa: 2222}      )       ,//
//         webview_name: "aaa1", //
//         partition: "1111", //
//         nickname: "2222",//
//         url: "3333", //
//         user_id: "###",//
//         avatar: "2333",//
//         line: false,//
//     }
//     let valid = await new rule_prisma().table("tb_account").file("./schema.prisma").check(data)
//     console.log(`111---valid:`, valid)
//
// }
//
//
