import axios from "axios";
import { TLoginReq } from "./type/TLoginReq";
import { TCreateAccountReq } from "./type/TCreateAccountReq";

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

/**
 * アカウント新規作成のpost
 */
export const createAccount = async (req: TCreateAccountReq) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/create-account`,
    req
  );
  return response.data;
};
