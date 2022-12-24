// const passwordRegex = new RegExp("/^[A-Za-z]\w{7,14}$/");

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

export function isPasswordValid(password:any) {
  return Boolean(password.value.match(passwordRegex));
}

export {
  passwordRegex
}