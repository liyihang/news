const config = require('./config')
// 自定义中间件
exports.golbal = (req, res, next) => {
    res.locals.site = config.site
    next()
}