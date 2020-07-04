// 首页 业务逻辑
const homeModel = require('../models/home')
const productModel = require('../models/product')


exports.index = (req, res, next) => {
    // homeModel.getSlides().then(data => {
    //     console.log(data)
    //     res.locals.slides = data
    //     res.render('home')

    // }).catch(err=>{
    //     next(err)
    // })
    // productModel.getLikeProduct().then(data => {
    //    console.log(data)
    // }).catch(err => {
    //     next(err)
    // })

    // 这个方法返回一个新的promise对象，该promise对象在iterable参数对象里所有的promise对象都成功的时候才会触发成功，
    // 一旦有任何一个iterable里面的promise对象失败则立即触发该promise对象的失败。
    // 这个新的promise对象在触发成功状态以后，会把一个包含iterable里所有promise返回值的数组作为成功回调的返回值，
    // 顺序跟iterable的顺序保持一致；如果这个新的promise对象触发了失败状态，
    // 它会把iterable里第一个触发失败的promise对象的错误信息作为它的失败错误信息。
    // Promise.all方法常被用于处理多个promise对象的状态集合。
    // 相反的Promise.race(iterable)是一旦有成功的就执行
    Promise.all([homeModel.getSlides(), productModel.getLikeProduct()]).then(results => {
        res.locals.slides = results[0]
        res.locals.likeProducts = results[1]
        res.render('home')
    }).catch(err => next(err))
}
exports.like = (req, res, next) => {
    productModel.getLikeProduct().then(data => res.json(data)).catch(err => next(err))
}