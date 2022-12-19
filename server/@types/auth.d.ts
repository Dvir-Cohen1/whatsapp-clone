// User interface
export interface IUser {
  username: string;
  email:string;
  password: string;
  jwt_ac_token?: string;
  jwt_rf_token?: string;

}
