const axios = require('./api')

exports.getCategoryTree = () => {
    return axios.get('/categories?format=tree').then(res => res.data).catch(err => Promise.reject(err))
}