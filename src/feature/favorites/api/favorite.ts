import axios from "axios";
import { TArticle } from "../../../types/TArticle";
import { TPostReq } from "./type/TFavoritePostReq";
import { TPostRes } from "./type/TFavoritePostRes";

/**
 * お気に入り記事をPOST
 */
export const postFavoriteArticle = async ({
  req,
  id,
}: {
  req: TPostReq;
  id: string | null;
}) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/favorites/${id}`,
    req
  );
  return response;
};

/**
 * 保存したお気に入り記事を取得するGET
 */
export const getFavoriteArticle = async (
  id: string | null
): Promise<TPostRes[]> => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/favorites/${id}`
  );
  return response.data;
};

/**
 * お気に入りから削除するDELETE
 */
export const deleteFavoriteArticle = async (
  articleId: string | null
): Promise<TArticle[]> => {
  const response = await axios.delete(
    `${import.meta.env.VITE_BACKEND_URL}/favorites/${articleId}`
  );
  return response.data;
};
