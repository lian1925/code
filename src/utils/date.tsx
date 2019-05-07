// 时间与日期相关

/**
 * @export 格式化日期
 * @param {string} str
 * @returns
 */
export function formatDateTime(str: string) {
  const date = new Date(str);
  const y = date.getFullYear();
  const m = prefixNumber(date.getMonth() + 1);
  const d = prefixNumber(date.getDate());
  const hour = prefixNumber(date.getHours());
  const minute = prefixNumber(date.getMinutes());
  const second = prefixNumber(date.getSeconds());

  return `${y}-${m}-${d} ${hour}:${minute}:${second}`;
}

// 私有方法

/**
 * 将数字截取指定位数
 *
 * @param {number} num
 * @param {number} [length=2]
 * @returns
 */
export function prefixNumber(num: number, length: number = 2) {
  return (Array(length).join("0") + num).slice(-length);
}
