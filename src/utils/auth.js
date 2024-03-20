import Cookies from "js-cookie";

//常量
const KEY = "token";

//获取coolies
export const getCookie = () => {
  return Cookies.get(KEY);
};

//设置cooklies
export const setCookie = (value) => {
  Cookies.set(KEY, value);
};

//删除cooklies

export const removeCookie = () => {
  Cookies.remove(KEY);
};
