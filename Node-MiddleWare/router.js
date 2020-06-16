// 路由中间件  只负责路由转发，不负责具体业务逻辑
const express = require('express')
const router = express.Router()
const home = require('./controllers/home')
const account = require('./controllers/account')



router.get('/',home.index)
router.get('/login',account.login)

module.exports = router