import axios from "axios";
import { TArticle, TTag } from "../types/TArticle";

export type TGetReq = {
  perPage?: number; //１ページあたりの要素数(20~100,20)
  page?: number; //何ページ目か(1~100,1)
  query?: string;
};

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

export type TPostReq = {
  id: string | null | undefined;
  title: string | null | undefined;
  url: string | null | undefined;
  tags: TTag[] | null | undefined;
  body: string | null | undefined;
  user: {
    name: string | null | undefined;
    profile_image_url: string;
  };
};
export const postFavoriteArticle = async (req: TPostReq) => {
  const response = await axios.post(`http://localhost:3000/favorites`, req);
  return response;
};

export const getFavoriteArticle = async (): Promise<TArticle[]> => {
  const response = await axios.get(`http://localhost:3000/favorites`);
  return response.data;
};

export const deleteFavoriteArticle = async (
  id: string
): Promise<TArticle[]> => {
  const response = await axios.delete(`http://localhost:3000/favorites/${id}`);
  return response.data;
};
