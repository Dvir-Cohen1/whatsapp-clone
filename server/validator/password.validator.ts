const passwordRegex = new RegExp("/^[A-Za-z]\w{7,14}$/");

export function isPasswordValid(password:any) {
  return Boolean(password.value.match(passwordRegex));
}
