import Cookies from "universal-cookie";
export function getCookie(name: String) {
  return new Cookies().get(String(name));
}
export function setCookie(name: String, value: String): void {
  return new Cookies().set(String(name), value);
}
export function removeCookie(name: String): void {
  return new Cookies().remove(String(name));
}
