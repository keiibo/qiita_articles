import { TTag } from "../../../../types/TArticle";

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
