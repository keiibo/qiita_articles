import React, { useEffect, useState } from "react";
import { ArticleCard } from "./ArticleCard";
import { TArticle } from "../types/TArticle";
import { styled } from "styled-components";

type TProps = {
  articles: TArticle[];
  hasDelete?: boolean;
  hasRate?: boolean;
};

export const ArticleCards = ({
  articles,
  hasDelete = false,
  hasRate = false,
}: TProps): React.JSX.Element => {
  const [articlesState, setArticlesState] = useState<TArticle[]>([]);

  useEffect(() => {
    setArticlesState(articles);
  }, [articles]);

  if (articlesState.length === 0) {
    return <div>お気に入りがありません</div>;
  }

  return (
    <StyledArticleCardsContainer>
      {articlesState &&
        articlesState.map((article) => (
          <ArticleCard
            articlesState={articlesState}
            setArticlesState={setArticlesState}
            article={article}
            key={article.id}
            hasRate={hasRate}
            hasDelete={hasDelete}
          />
        ))}
    </StyledArticleCardsContainer>
  );
};

const StyledArticleCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
