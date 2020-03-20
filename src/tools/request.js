import axios from 'axios';
import { getItem } from './storage';

const instance = axios.create({
    timeout: 5000,
    baseURL: "http://localhost:18566/"
});

/**
 * 获取用户令牌
 */
const token = getItem("token");

/**
 * 处理请求
 * 在请求头加上Authorization参数
 */
instance.interceptors.request.use(function (config) {
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
}, function (error) {
    return Promise.resolve(error);
});

/**
 * 处理响应
 */
instance.interceptors.response.use(function (response) {
    return response.data;
}, function (e) {
    if (!e.response) {
        return Promise.reject(e);
    }
    if (e.response.status === 401) {
        window.location.href = '/login';
    } else {
        return Promise.reject(e);
    }
});

/**
 * 发送get请求
 * @param {*} url 
 */
export function httpGet(url, data) {
    return instance.get(url, { data });
}

/**
 * 发送post请求
 * @param {string} url 
 * @param {*} data 
 */
export function httpPost(url, data) {
    return instance.post(url, data);
}

/**
 * 发送put请求
 * @param {*} url 
 * @param {*} data 
 */
export function httpPut(url, data) {
    return instance.put(url, data);
}

/**
 * 发送delete请求
 * @param {*} url 
 * @param {*} data 
 */
export function httpDelete(url, data) {
    return instance.delete(url, { data: data });
}