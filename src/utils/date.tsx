export function prefixNumber(num: number, length = 2) {
  return (Array(length).join("0") + num).slice(-length);
}
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
