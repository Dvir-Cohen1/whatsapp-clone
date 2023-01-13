import axios from "axios";
import { SERVER_URL } from "../constants/constants";
import { getCookie, removeCookie, setCookie } from "../utils/cookieHandler";
import { redirect } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
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


export async function getLoggedInUser() {
  try {
    console.log("start fetch")
    const data = await axios.get(`${SERVER_URL}user/loggedInUser`, {
    });
    console.log("end fetch")

    console.log("data")
    return data
  } catch (error: any) {
    return console.log(error);
  }
}


export async function logout() {
  try {
    const accessToken = getCookie("accessToken");
    if (!accessToken) return;

    await axios.delete(`${SERVER_URL}auth/logout`, {
      data: { accessToken },
    });

    removeCookie("accessToken");
    // removeCookie("refreshToken");
  } catch (error: any) {
    return { ...error.response.data };
  }
}


