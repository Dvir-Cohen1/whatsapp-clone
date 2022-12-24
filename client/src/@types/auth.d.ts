export interface IuserData {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
export type RegisterContextType = {
  userData: IuserData;
  logindata: object;
  setUserData: Function;
  alertMessage?: string;
  isAlertMessage: boolean;
  setAlertMessage: Function;
  setIsAlertMessage: Function;
  setLoginData: Function;
  handleLogin: (event: React.FormEvent<HTMLFormElement>) => {};
  handleRegister: (event: React.FormEvent<HTMLFormElement>) => {};
};
