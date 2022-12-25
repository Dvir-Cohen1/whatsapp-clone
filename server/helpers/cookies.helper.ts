/**
 * @returns cookie value by its name.
 * 
 * @param  {any} cookie - coockie request object
 * @param  {string} name
 * 
 */
export function getCookieValue(cookie:any, name:string) {
     function escape(s:any) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
     var match = cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
     return match ? match[1] : null;
}