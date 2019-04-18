export function filterPost(obj: any, text = "tech"): any {
  let list: any = [];
  Object.keys(obj).map(item => {
    if (item.indexOf(text) > -1) {
      list.push(obj[item]);
    }
  });
  return list;
}
