export interface IuserData {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
export type AuthContextType = {
//   userData: IuserData,
  userData:object,
  errorMessage: string;
  isError: boolean;
  setIsError: () => {};
  setErrorMessage: () => {};
  setUserData: () => {};
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => {};
};
