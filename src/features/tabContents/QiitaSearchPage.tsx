import Search, { SearchProps } from "antd/es/input/Search";
import React, { useState } from "react";
import styled from "styled-components";
import { get, TGetReq } from "../../api/qiita";
import { ArticleCards } from "../../components/ArticleCards";

export const QiitaSearchPage = (): React.JSX.Element => {
  const [searchResultArticles, setSearchResultArticles] = useState([]);

  const onSearch: SearchProps["onSearch"] = async (value) => {
    const req: TGetReq = {
      perPage: 20,
      query: value,
    };

    const response = await get(req);
    setSearchResultArticles(response.data);
  };

  return (
    <StyledContainer>
      <StyledSearch
        enterButton="検索"
        onSearch={onSearch}
        allowClear
      ></StyledSearch>
      <StyledArticleCardsContainer>
        <ArticleCards
          articles={searchResultArticles ? searchResultArticles : []}
          hasRate
        />
      </StyledArticleCardsContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledArticleCardsContainer = styled.div`
  margin-top: 16px;
`;

const StyledSearch = styled(Search)`
  width: 360px;
`;
