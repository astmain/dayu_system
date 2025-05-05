clazz = class {
    bbb = [1, 2]
    aaa = [1, 2]
    async func1() {
        console.log('func1', this.aaa)
        console.log('func1', this.bbb)
        if (this.aaa.length == 0) {
            console.log('func1-111', this.aaa)
            return [111, 222]
        } else {
            console.log('func1--222', this.aaa)
            return this.aaa
        }
    }

}


console.log(new clazz().func1())