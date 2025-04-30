const R = {


    ok: function ({msg, data}) {
        return {code: 200, kind: "ok", msg: msg, data: data,}
    },
    err: function ({msg, data}) {
        return {code: 400, kind: "err", msg: msg, data: data,}

    }
}


export default R