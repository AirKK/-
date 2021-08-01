//素材相关请求
import request from '@/utils/request'

//上传用户图片素材
export const uploadImages = (data) => {
    return request({
        method: 'POST',
        url: '/mp/v1_0/user/images',
        // Body 参数使用 data 设置
        // Query 参数使用 params 设置
        // Headers 参数使用 headers 设置
        data
    })
}

//获取用户图片素材
export const getImages = (params) => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/user/images',
        // Body 参数使用 data 设置
        // Query 参数使用 params 设置
        // Headers 参数使用 headers 设置
        params
    })
}