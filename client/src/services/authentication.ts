import axios from "axios";
import { SERVER_URL } from "../constants/constants";
import { getCookie, removeCookie, setCookie } from "../utils/cookieHandler";

export async function register(userData: Object) {
  try {
    const { data } = await axios.post(`${SERVER_URL}auth/register`, {
      userData,
    });
    return data;
  } catch (error: any) {
    return { ...error.response.data };
  }
}

export async function login(userData: Object) {
  try {
    const { data } = await axios.post(`${SERVER_URL}auth/login`, {
      userData,
    });
    setCookie("accessToken", data.accessToken || null);
    setCookie("refreshToken", data.refreshToken || null);
    return data;
  } catch (error: any) {
    return { ...error.response.data };
  }
}

export async function logout() {
  try {
    const accessTokenCookie = getCookie("accessToken");
    if (!accessTokenCookie) return;

    await axios.delete(`${SERVER_URL}auth/logout`, {
      data: { accessTokenCookie },
    });

    removeCookie("accessToken");
  } catch (error: any) {
    return { ...error.response.data };
  }
}
