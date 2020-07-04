// 路由中间件  只负责路由转发，不负责具体业务逻辑
const express = require('express')
const router = express.Router()
const home = require('./controllers/home')
const account = require('./controllers/account')


// 猜你喜欢的数据
router.get('/',home.index)
// 换一换猜你喜欢的数据
router.get('/like',home.like)
router.get('/login',account.login)

module.exports = router