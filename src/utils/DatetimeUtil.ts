const parse = (datetime: string) => {
  return new Date(datetime);
};

const compare = (a: Date, b: Date) => {
  a = new Date(a);
  b = new Date(b);
  return b.getTime() - a.getTime();
};

const translate = (date: Date) => {
  // SWRでFetchされたデータがDateで返さない
  // なのでここで改めてDateとして宣言してる
  date = new Date(date);

  // getMonth()は 0~11の値で返されるので+1する。
  // getDay()は曜日、getDate()は日で返される。
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};

export default {
  parse,
  compare,
  translate,
};
