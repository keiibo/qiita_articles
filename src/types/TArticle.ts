export type TArticle = {
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

export type TUser = {
  id: string;
  permanentId: number;
  name: string;
  description: string;
  profile_image_url: string;
  websiteUrl: string;
  twitterScreenName: string;
  githubLoginName: string;
  followeesCount: number;
  followersCount: number;
  itemsCount: number;
  location: string;
  organization: string;
};

export type TTag = {
  name: string;
  versions: [];
};
