import React from "react";
import styled from "styled-components";

import { ArticleCards } from "../../components/ArticleCards";
import { TArticle } from "../../types/TArticle";

type TProps = {
  favoriteArticles: TArticle[] | undefined;
};

export const FavoriteArticles = ({
  favoriteArticles,
}: TProps): React.JSX.Element => {
  const reversedArticles = favoriteArticles
    ? [...favoriteArticles].reverse()
    : [];
  return (
    <StyledContainer>
      <ArticleCards articles={reversedArticles} hasDelete />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  padding-top: 16px;
  display: flex;
  justify-content: center;
`;
