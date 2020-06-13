// 程序入口文件
const express = require('express')
const createError = require('http-errors')
const Yonch = require('youch')
const artTemplate = require('express-art-template')
const path = require('path')
const bodyParser = require('body-parser')
const favicon = require('express-favicon')
const fs = require('fs')
const morgan = require('morgan')

// 创建应用
const app = express()
app.listen(3000, () => {
    console.log("==start serve==")
})
// log collection
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))


// 中间件
app.engine('art', artTemplate)
// 设置默认引擎
app.set('view engine', 'art')
// 模板引擎配置项
app.set('view option', {
    // 开发环境配置，代码不压缩
    debug: process.env.NODE_ENV !== 'production'
})
// 静态资源处理
app.use('/', express.static(path.join(__dirname, './public')))

// 请求体解析 body-parser
// 解析json
app.use(bodyParser.json())  
// 设置对象格式的请求体内容
app.use(bodyParser.urlencoded({extended:false})) 
// 设置网站的图标
app.use(favicon(path.join(__dirname,'favicon.ico')))

// 设置路由


// 404 错误处理  
app.use((req, res, next) => {
    // 创建404错误对象
    // const error = new Error("not found")
    // error.state = 404
    next(createError(404))
})
// 500情况  服务端错误
app.use((err, req, res, next) => {
    // 同意错误处理中间件
    // 1、如果是开发环境，就响应完整的错误信息，便于调试
    // 2、如果是生产环境 ，显示404 500页面
    // 3、判断当前的是什么环境，可以通过系统的环境变量去判断
    // 4、如何获取系统变量，可以通过req.app.get('env)获取
    // 5、SET NODE_ENV = 'development'
    // 6、SET NODE_ENV = 'production'
    // 7、不同的系统设置环境变量的命令是不一样的
    // 8、使用cross-env命令行工具 npm i cross-env -g
    // 9、cross-env NODE_ENV='development'
    // 10、启动的时候 设置不同的环境即可
    // console.log(req.app.get('env'))
    const env = req.app.get('env')
    console.log(env)
    if (env === 'development') {
        // 这里带班开发环境，输出详细的错误信息，我们使用yonch
        return new Yonch(err, req).toHTML().then(html => res.send(html))

    }
    // 生成环境，渲染错误页面  使用art-templete渲染
    // 判断错误是404还是500
    // locals 是模板引擎中可以直接使用的数据对象
    res.locals.status = err.status === 404 ? 404 : 500
    res.render('error')

})