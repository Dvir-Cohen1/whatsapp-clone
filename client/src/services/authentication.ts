import axios from "axios";
import { SERVER_URL } from "../constants/constants";
import { setCookie } from "../utils/cookieHandler";

export async function register(userData: Object) {
  try {
    const { data } = await axios.post(`${SERVER_URL}auth/register`, {
      userData,
    });
    return data;
  } catch (error) {
    return { error: true, message: "Somthing Went Wrong!" };
  }
}

export async function login(userData: Object) {
  try {
    const { data } = await axios.post(`${SERVER_URL}auth/login`, {
      userData,
    });
    setCookie("accessToken", data.token);
    return data;
  } catch (error: any) {
    return { ...error.response.data };
  }
}
