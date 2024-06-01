import axios from "axios";
import { TLoginReq } from "./type/TLoginReq";

/**
 * ログインPOST
 */
export const login = async (req: TLoginReq) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/login`,
    req
  );
  return response.data;
};
