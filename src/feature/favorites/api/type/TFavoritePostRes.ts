import { TTag, TUser } from "../../../../types/TArticle";

export type TPostRes = {
  id: string;
  article: {
    id: string;
    title: string;
    url: string;
    createdAt: string;
    updatedAt: string;
    body: string;
    tags: TTag[];
    likesCount: number;
    organization_url_name: string;
    commentsCount: number;
    stocksCount: number;
    user: TUser;
  };
};
