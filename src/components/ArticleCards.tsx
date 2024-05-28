import React, { useEffect, useState } from "react";
import { ArticleCard } from "./ArticleCard";
import { TArticle } from "../types/TArticle";
import { styled } from "styled-components";

type TProps = {
  articles: TArticle[];
  hasDelete?: boolean;
  hasRate?: boolean;
  loadingText: string;
};

export const ArticleCards = ({
  articles,
  hasDelete = false,
  hasRate = false,
  loadingText,
}: TProps): React.JSX.Element => {
  const [articlesState, setArticlesState] = useState<TArticle[]>([]);

  useEffect(() => {
    setArticlesState(articles);
  }, [articles]);

  if (articlesState.length === 0) {
    return <StyledLoadingText>{loadingText}</StyledLoadingText>;
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

const StyledLoadingText = styled.div`
  font-size: 24px;
  margin: 12px;
`;
