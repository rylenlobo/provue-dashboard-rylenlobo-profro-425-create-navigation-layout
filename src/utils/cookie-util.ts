import Cookies from "js-cookie";

export const getDataFromCookies = (key: string): string | undefined => {
  return Cookies.get(key);
};

export const setDataInCookies = (key: string, value: string) => {
  Cookies.set(key, value);
};

export const removeDataFromCookies = (key: string) => {
  Cookies.remove(key);
};

export const clearAllCookies = () => {
  Object.keys(Cookies.get()).forEach((cookieName) => {
    Cookies.remove(cookieName);
  });
};
