import axios from "axios";
import { TArticle } from "../../types/TArticle";
import { TGetReq } from "./type/request/TQiitaGetReq";
import { TPostReq } from "./type/request/TFavoritePostReq";

/**
 * qiitaから記事を取得するGET
 */
export const get = async (req: TGetReq) => {
  // クエリ文字列を構築
  let queryString = `per_page=${req.perPage}`;
  if (req.page) {
    queryString += `&page=${req.page}`;
  }
  if (req.query) {
    queryString += `&query=${encodeURIComponent(req.query)}`;
  }
  const response = await axios.get(
    `https://qiita.com/api/v2/items?${queryString}`,
    {
      headers: {
        Authorization: `Bearer ${
          import.meta.env.VITE_REACT_APP_QIITA_API_TOKEN
        }`,
      },
    }
  );
  return response;
};

/**
 * お気に入り記事をPOST
 */
export const postFavoriteArticle = async (req: TPostReq) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/favorites`,
    req
  );
  return response;
};

/**
 * 保存したお気に入り記事を取得するGET
 */
export const getFavoriteArticle = async (): Promise<TArticle[]> => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/favorites`
  );
  return response.data;
};

/**
 * お気に入りから削除するDELETE
 */
export const deleteFavoriteArticle = async (
  id: string
): Promise<TArticle[]> => {
  const response = await axios.delete(
    `${import.meta.env.VITE_BACKEND_URL}/favorites/${id}`
  );
  return response.data;
};
