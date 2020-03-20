/**
 * 获取本地存储
 * @param {*} key 
 */
export function getItem(key) {
    return localStorage.getItem(key);
}

/**
 * 存储到本地
 * @param {*} key 
 * @param {*} value 
 */
export function setItem(key, value) {
    localStorage.setItem(key, value);
}

/**
 * 移除本地存储
 * @param {*} key 
 */
export function removeItem(key) {
    localStorage.removeItem(key);
}