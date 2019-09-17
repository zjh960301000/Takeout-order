import request from './request.js'
export function getTest(url) {
    return request({
        url:url,
        method:'GET',
        params:{
            name:'za',
            pwd:'123'
        },
    })
}