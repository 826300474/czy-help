import { cloneDeep, get, has, set } from 'lodash';

export function formatObjectWith<
  T extends Record<string, any>,
  K extends keyof T,
>(value: T, rules: Record<K, (e: T[K], data: T) => any>) {
  let newValue = cloneDeep(value);
  for (const k in rules) {
    if (Object.prototype.hasOwnProperty.call(rules, k)) {
      const fn = rules[k];
      if (has(newValue, k)) {
        set(newValue, k, fn(get(newValue, k), newValue));
      }
    }
  }
  return newValue;
}
