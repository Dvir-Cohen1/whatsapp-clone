import Cookies from "universal-cookie";
export function getCookie(name: String) {
  const cookies = new Cookies();
  return cookies.get(String(name));
}
export function setCookie(name: String, value: String): void {
  const cookies = new Cookies();
  cookies.set(String(name), value);
}
