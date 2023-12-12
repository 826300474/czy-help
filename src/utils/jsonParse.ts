/**
 * 安全的解析字符串
 * @param {String} 目标字符串.
 * @param {Object} 解析失败后返回的值.
 * @returns {Object} 返回解析成功的对象.
 * @example
 *
 * jsonParse('{"a":"b"}', {a:b})
 * // { b: 'b' }
 *
 * jsonParse('', {})
 * // {}
 *
 */
export function jsonParse<T>(value: string, defaultValue?: T) {
    try {
        return JSON.parse(value);
    } catch {
        if (defaultValue) return defaultValue;
        return null;
    }
}