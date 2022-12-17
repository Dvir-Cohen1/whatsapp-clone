import axios from "axios";
import { SERVER_URL } from "../constants/constants";

export async function register(userData: Object) {
  const { data } = await axios.post(`${SERVER_URL}/register`, {
    userData,
  });
  return data;
}
