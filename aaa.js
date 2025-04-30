ax2_test()

async function ax2_test() {
    let axios = require("axios")
    var data = '';

    var config = {
        method: 'get', url: 'http://127.0.0.1:3000/admin_user/get_user_by_token', headers: {
            'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOjEyLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDU5ODU1NjksImV4cCI6MTc0ODU3NzU2OX0.tvUU4m56_03ODEL0U0ZzY_vh87N2kphChinRUcCU3oo',
        }, data: data
    };


    let res = await axios(config)
    console.log('res.data---', res.data)
}