import { Avatar, Tag } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import { TTag, TUser } from "../../types/TArticle";

type TProps = {
  title: string;
  user: TUser;
  tags: TTag[];
  url: string;
};

export const CardTitle = ({
  title,
  user,
  tags,
  url,
}: TProps): React.JSX.Element => {
  const [isViewBorder, setIsViewBorder] = useState<boolean>(false);
  const handleClick = (url: string) => {
    open(url);
  };
  const handleTagClick = () => {
    // TODO: Tag検索への誘導
  };
  return (
    <StyledContainer>
      <StyledAvatar src={user.profile_image_url}></StyledAvatar>
      <StyledTitleContainer>
        <StyledTitle
          onMouseEnter={() => setIsViewBorder(true)}
          onMouseLeave={() => setIsViewBorder(false)}
          $isViewBorder={isViewBorder}
          onClick={() => handleClick(url)}
        >
          {title}
        </StyledTitle>
        {tags.map((tag) => {
          return (
            <StyledTag key={tag.name} onClick={handleTagClick}>
              {tag.name}
            </StyledTag>
          );
        })}
      </StyledTitleContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  margin: 8px;
  display: flex;
  gap: 16px;
  align-items: center;
`;

const StyledTitleContainer = styled.div`
  width: 100%;
  gap: 0;
`;

const StyledTitle = styled.div<{ $isViewBorder: boolean }>`
  color: ${({ $isViewBorder }) =>
    $isViewBorder ? "#1b48b2" : "black"}; // 条件に基づいて色を設定
`;

const StyledAvatar = styled(Avatar)`
  min-width: 32px;
`;

const StyledTag = styled(Tag)`
  border: none;
  color: #b9b9b9;
  transition: transform 0.3s ease, box-shadow 0.3s ease; // アニメーションの追加

  &:hover {
    transform: translateY(-3px); // Y軸方向に少し上に移動
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // ホバー時に影を追加
  }
`;
