// 商品数据获取处理
const axios = require('./api')

exports.getLikeProduct = () => {

    return  axios.get('/products?type=like&limit=6').then(res => res.data).catch(err => Promise.reject(err))
} 