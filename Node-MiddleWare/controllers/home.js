// 首页 业务逻辑
const homeSlides = require('../models/home')
exports.index = (req, res, next) => {
    homeSlides.getSlides().then(data => {
        console.log(data)
        res.render('home')

    }).catch(err=>{
        next(err)
    })
}