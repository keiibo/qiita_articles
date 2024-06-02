import React from "react";

import { Tabs, TabsProps } from "antd";
import { useQuery } from "react-query";
import { Favorite } from "./feature/favorites/Favorites";
import { Timeline } from "./feature/timeline/Timeline";
import { styled } from "styled-components";
import { Search } from "./feature/search/Search";
import { get } from "./feature/api/qiita";
import { TGetReq } from "./feature/api/type/request/TQiitaGetReq";
import { Loading } from "./component/loading/Loading";
import { getFavoriteArticle } from "./feature/favorites/api/favorite";
import { useSelector } from "react-redux";
import { selectUser } from "./feature/auth/slice/authSlice";

export const Home = (): React.JSX.Element => {
  const user = useSelector(selectUser);
  // お気に入り記事の取得
  const {
    data,
    refetch,
    isLoading: favoriteLoading,
  } = useQuery("favorites", () =>
    getFavoriteArticle(user ? user.userId : null)
  );

  const favoriteArticles = data?.map((d) => {
    return d.article;
  });

  const {
    data: qiitaNewArticles,
    refetch: refetchNewArticles,
    isLoading: qiitaLoading,
  } = useQuery("articles", () =>
    get({
      perPage: 50,
    } as TGetReq)
  );

  if (qiitaLoading || favoriteLoading) return <Loading />;

  const handleTabChange = (key: string): void => {
    if (key == "6") {
      refetch();
    }
    if (key == "1") {
      refetchNewArticles();
    }
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Qiita新着",
      children: <Timeline articles={qiitaNewArticles?.data} />,
    },
    {
      key: "2",
      label: "Qiita検索",
      children: <Search></Search>,
    },
    {
      key: "6",
      label: "お気に入り記事",
      children: <Favorite favoriteArticles={favoriteArticles} />,
    },
  ];
  return (
    <StyledTabs
      defaultActiveKey="1"
      items={items}
      centered
      onChange={(key) => handleTabChange(key)}
    />
  );
};
const StyledTabs = styled(Tabs)`
  flex-grow: 1; // 残りの空間を全て使用
  overflow: hidden; // タブ外のオーバーフローを隠す

  .ant-tabs-nav {
    position: sticky;
    top: 0;
    z-index: 1000;
    margin: 0;
  }

  .ant-tabs-content-holder {
    height: 100%; // Tabsの高さを最大に設定
    overflow-y: auto; // 縦スクロールを可能に
    background-color: #f4f5f7;
  }
`;
