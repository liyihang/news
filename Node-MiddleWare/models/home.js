// 引入api文件，配置请求
const axios = require('./api')
exports.getSlides=()=>{
    return axios.get('/settings/home_slides').then(res=>res.data).catch(err=>Promise.reject(err))
}