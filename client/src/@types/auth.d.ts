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
  isError: boolean;
  setIsError: () => {};
  setErrorMessage: () => {};
  setUserData: (data:object) => {};
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => {};
};
