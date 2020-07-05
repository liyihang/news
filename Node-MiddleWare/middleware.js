const config = require('./config')

const categoryModel = require('./models/category')
// 自定义中间件
exports.golbal = (req, res, next) => {
    res.locals.site = config.site
    // 数据的缓存
    if (!req.app.locals.category) {
        // 分类数据
        categoryModel.getCategoryTree().then(data => {

            res.locals.category = data
            // 分类没有缓存 就缓存数据
            res.app.locals.category = data
            next()
        }).catch(err => next(err))
    }else{
        res.locals.category = res.app.locals.category
        next()
    }

}