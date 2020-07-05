const config = require('./config')

const categoryModel = require('./models/category')
// 自定义中间件
exports.golbal = (req, res, next) => {
    res.locals.site = config.site
    // 分类数据
    categoryModel.getCategoryTree().then(data => {
        // 数据的缓存
        res.locals.category = data
        next()
    }).catch(err => next(err))
}