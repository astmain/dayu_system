import util from "./index";

const R = {


    ok: function ({msg, data}) {
        return {code: 200, kind: "ok", msg: msg, data: data,}
    },
    err: function ({msg, data}) {
        return {code: 400, kind: "err", msg: msg, data: data,}
    },
    wrapper_response: function (promise, msg) {
        return promise.then(data => this.ok({msg: msg, data: data}))
            .catch(err => this.err({msg: err.msg, data: err}))
    }
}


export default R