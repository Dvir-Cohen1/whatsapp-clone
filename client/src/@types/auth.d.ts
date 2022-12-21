export interface IuserData {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
export type RegisterContextType = {
//   userData: IuserData,
  userData:object,
  errorMessage: string;
  alertMessage: boolean;
  setAlertMessage: Function;
  setErrorMessage: Function;
  setUserData: Function;
  handleRegister: (event: React.FormEvent<HTMLFormElement>) => {};
};
