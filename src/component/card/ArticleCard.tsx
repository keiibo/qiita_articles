import React, { useState } from "react";
import { Badge, Card } from "antd";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { CardTitle } from "./CardTitle";
import { DeleteOutlined, StarFilled, StarOutlined } from "@ant-design/icons";

import { useMutation } from "react-query";

import { TArticle } from "../../types/TArticle";
import { Color } from "../../constant/Color";
import { useSelector } from "react-redux";
import { selectUser } from "../../feature/auth/slice/authSlice";
import {
  deleteFavoriteArticle,
  postFavoriteArticle,
} from "../../feature/favorites/api/favorite";
import { TPostReq } from "../../feature/favorites/api/type/TFavoritePostReq";

type TProps = {
  articlesState: TArticle[];
  setArticlesState: React.Dispatch<React.SetStateAction<TArticle[]>>;
  article: TArticle;
  hasRate?: boolean;
  hasDelete?: boolean;
};

export const ArticleCard = ({
  articlesState,
  setArticlesState,
  article,
  hasRate = false,
  hasDelete = false,
}: TProps): React.JSX.Element => {
  const text = "Qiita";

  const loginData = useSelector(selectUser);

  const postMutation = useMutation(postFavoriteArticle);
  const deleteMutation = useMutation(deleteFavoriteArticle);

  // お気に入りの状態を管理するステート
  const [isFavorite, setIsFavorite] = useState(false);
  // お気に入りの状態を切り替えるハンドラ
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      // お気に入り時にpostをmutate
      const req: TPostReq = {
        id: article.id,
        title: article.title,
        url: article.url,
        body: article.body,
        tags: article.tags,
        user: {
          name: article.user.name,
          profile_image_url: article.user.profile_image_url,
        },
      };

      postMutation.mutate(
        { req, id: loginData ? loginData.userId : null },
        {
          onSuccess: (data) => {
            console.log("Article posted successfully:", data);
          },
          onError: (error) => {
            console.error("Failed to post article:", error);
          },
        }
      );
    } else {
      deleteMutation.mutate(article.id, {
        onSuccess: (data) => {
          console.log("Delete Article:", data);
        },
        onError: (error) => {
          console.error("Failed to delete article:", error);
        },
      });
    }
  };

  const handleDelete = () => {
    deleteMutation.mutate(article.id, {
      onSuccess: (data) => {
        console.log("Delete Article:", data);
        const filteredArticles = articlesState.filter(
          (a) => a.id !== article.id
        );
        setArticlesState(filteredArticles); // ステートを更新
      },
      onError: (error) => {
        console.error("Failed to delete article:", error);
      },
    });
  };

  return (
    <Badge.Ribbon text={text} color={Color.QIITA_GREEN}>
      <StyledCard
        key={article.id}
        title={
          <CardTitle
            title={article.title}
            user={article.user}
            tags={article.tags}
            url={article.url}
          />
        }
        hoverable
        bordered
      >
        <StyledMarkDownContainer>
          <StyledReactMarkDown>{article.body}</StyledReactMarkDown>
        </StyledMarkDownContainer>
        {hasRate && (
          <StyledActionContainer>
            {isFavorite ? (
              <StarFilled
                onClick={toggleFavorite}
                style={{ color: "gold", fontSize: "24px" }}
              />
            ) : (
              <StarOutlined
                onClick={toggleFavorite}
                style={{ color: "grey", fontSize: "24px" }}
              />
            )}
          </StyledActionContainer>
        )}
        {hasDelete && (
          <StyledActionContainer>
            <DeleteOutlined
              style={{ color: "grey", fontSize: "24px" }}
              onClick={handleDelete}
            />
          </StyledActionContainer>
        )}
      </StyledCard>
    </Badge.Ribbon>
  );
};

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 320px;
  .ant-card-head-title {
    font-size: 16px;
    padding: 8px;
    text-align: start;
    white-space: normal; // タイトルが折り返されるように設定
  }
  // 画面幅が 600px 以上の場合のスタイル
  @media (min-width: 600px) {
    max-width: 800px;
    .ant-card-head-title {
      font-size: 18px; // タブレットとデスクトップでフォントサイズを大きくする
    }
  }
`;

const StyledMarkDownContainer = styled.div`
  border: 1px solid #cdcdcd;
  border-radius: 8px;
  padding: 8px;
`;

const StyledReactMarkDown = styled(ReactMarkdown)`
  max-height: 8em; // 3行の高さに設定
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; // 表示する行数
  -webkit-box-orient: vertical;
  * {
    font-size: 16px;
    color: #7e7e7e;
    line-height: 1.6em;
    margin: 0;
    padding: 0;
  }
`;

const StyledActionContainer = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: right;
  padding: 8px;
`;
