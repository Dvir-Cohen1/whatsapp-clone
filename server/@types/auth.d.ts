// User interface
export interface IUserSchema {
  username: string;
  email: string;
  password: string;
  jwt_ac_token?: string;
  jwt_rf_token?: string;
  comparePassword: Function;
  setJwtTokens: Function;
  setAccessToken: Function;
  deleteTokens: Function;
}
export interface IController {
  callback: ControllerFunction;
}

export type ControllerFunction = (req: any, res: any, next: Function) => {};
