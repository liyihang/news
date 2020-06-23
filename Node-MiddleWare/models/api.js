// 配置axios的请求路径，超时时间，authorization
const axios = require('axios')
const config = require('../config')

const instance = axios.create({
    baseURL:config.api.baseURL,
    timeout:config.api.timeout,
    auth:{
        username:config.api.username,
        password:config.api.password
    }
})
module.exports = instance