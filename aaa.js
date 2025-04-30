axios = require("axios")

fun1()

async function fun1() {
    var data = JSON.stringify({
        "username": "admin",
        "password": "123456"
    });
    var config = {
        method: 'post',
        url: 'http://127.0.0.1:3000/api/auth/login',
        headers: {
            'Request-Origion': 'Knife4j',
            'Content-Type': 'application/json'
        },
        data: data
    };
    let res = await axios(config)

    console.log('res.data---', res.data)

}