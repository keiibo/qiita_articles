import React from "react";
import { get, getFavoriteArticle, TGetReq } from "./api/qiita";
import { Tabs, TabsProps } from "antd";
import { useQuery } from "react-query";
import { FavoriteArticles } from "./features/tabContents/FavoriteArticles";
import { QiitaTimeLine } from "./features/tabContents/QiitaTimeLine";
import { styled } from "styled-components";
import { QiitaSearchPage } from "./features/tabContents/QiitaSearchPage";

export const Home = (): React.JSX.Element => {
  // お気に入り記事の取得
  const {
    data: favoriteArticles,
    refetch,
    isLoading: favoriteLoading,
  } = useQuery("favorites", getFavoriteArticle);

  const {
    data: qiitaNewArticles,
    refetch: refetchNewArticles,
    isLoading: qiitaLoading,
  } = useQuery("articles", () =>
    get({
      perPage: 100,
    } as TGetReq)
  );

  if (qiitaLoading || favoriteLoading) return <div>Loading...</div>;

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
      children: <QiitaTimeLine articles={qiitaNewArticles?.data} />,
    },
    {
      key: "2",
      label: "Qiita検索",
      children: <QiitaSearchPage></QiitaSearchPage>,
    },
    {
      key: "3",
      label: "a",
      children: "afa",
    },
    {
      key: "4",
      label: "a",
      children: "Content of Tab Pane 3",
    },
    {
      key: "5",
      label: "まとめて検索",
      children: "Content of Tab Pane 3",
    },
    {
      key: "6",
      label: "お気に入り記事",
      children: <FavoriteArticles favoriteArticles={favoriteArticles} />,
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
