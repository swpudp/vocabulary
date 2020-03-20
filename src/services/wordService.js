import { httpPost, httpDelete, httpGet, httpPut } from '../tools/request';

/**
 * 分页查询
 * @param {*} param 
 */
export function getPaging(param) {
    return httpPost("/api/Word/Paging", param);
}

/**
 * 创建单词
 * @param {*} param 
 */
export function createWord(param) {
    return httpPost('/api/Word', param);
}

/**
 * 修改单词
 * @param {*} param 
 */
export function editWord(param) {
    return httpPut('/api/Word', param);
}

/**
 * 删除单词
 * @param {*} param 
 */
export function deleteWord(param) {
    return httpDelete('/api/Word', param);
}

/**
 * 获取单词释义
 * @param {*} wordId 
 */
export function getParaphrases(wordId) {
    console.log("wordId is " + wordId);
    return httpGet(`/api/Word/${wordId}/Paraphrases`);
}