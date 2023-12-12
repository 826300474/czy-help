import { omit, get, set } from 'lodash';

/**
 * 替换对象的属性值
 * @param {Object} 要替换的对象.
 * @param {Object} 需要替换的属性.
 * @returns {Object} 返回新的对象.
 * @example
 *
 * replaceObjKeys({ a:111 }, {a:'b'})
 * // { b:111 }
 *
 */
export const replaceObjKeys = (
    data: Record<string, any>,
    params: Record<string, any>,
  ) => {
    const newData = omit(data, Object.keys(params));
    Object.entries(params).forEach(([oldKey, newKey]) => {
      set(newData, newKey, get(data, oldKey));
    });
    return newData;
  };