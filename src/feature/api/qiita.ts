import axios from "axios";
import { TGetReq } from "./type/request/TQiitaGetReq";

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
