import Input from "antd/es/input/Input";
import React, { useState } from "react";
import styled from "styled-components";
import { get } from "../api/qiita";
import { ArticleCards } from "../../component/card/ArticleCards";
import { useDebouncedCallback } from "use-debounce";
import { TGetReq } from "../api/type/request/TQiitaGetReq";

export const Search = (): React.JSX.Element => {
  const [searchResultArticles, setSearchResultArticles] = useState([]);

  // デバウンスされた検索関数
  const debouncedSearch = useDebouncedCallback(
    async (value) => {
      const req: TGetReq = {
        perPage: 50,
        query: value,
      };
      const response = await get(req);
      setSearchResultArticles(response.data);
    },
    1000 // ミリ秒単位でディレイ時間を設定
  );

  const handleChange = (value: string) => {
    debouncedSearch(value);
  };

  return (
    <StyledContainer>
      <StyledInput
        placeholder="検索テキストを入力"
        onChange={(e) => handleChange(e.target.value)}
      ></StyledInput>
      <StyledArticleCardsContainer>
        <ArticleCards
          articles={searchResultArticles ? searchResultArticles : []}
          hasRate
          loadingText="記事がありませんでした😢"
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

const StyledInput = styled(Input)`
  width: 360px;
`;
