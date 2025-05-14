// 类装饰器
const doc_class: ClassDecorator = (target: any) => {
    console.log(target)
    target.prototype.__name = "小许"
}

const doc_prototype: PropertyDecorator = (target: any, key: string | symbol) => {
    console.log(target,key)

}


@doc_class
class Xp {
    @doc_prototype
    name: string

    constructor() {
        this.name = "小许doc_prototype"
    }
}


// let xp: any = new Xp()
// console.log(`111---:`, xp.__name)
// console.log(`222---:`, xp.name)