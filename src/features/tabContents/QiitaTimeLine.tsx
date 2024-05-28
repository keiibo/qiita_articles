import React from "react";
import { TArticle } from "../../types/TArticle";
import { ArticleCards } from "../../components/ArticleCards";
import styled from "styled-components";

type TProps = {
  articles: TArticle[] | undefined;
};

export const QiitaTimeLine = ({ articles }: TProps): React.JSX.Element => {
  return (
    <StyledContainer>
      <ArticleCards
        articles={articles ? articles : []}
        hasRate
        loadingText=""
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  padding-top: 16px;
  display: flex;
  justify-content: center;
`;
