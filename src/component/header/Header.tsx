import React from "react";
import { TLoginUser } from "../../feature/auth/slice/authSlice";
import { styled } from "styled-components";

type TProps = {
  user: TLoginUser | null;
};

export const Header = ({ user }: TProps): React.JSX.Element => {
  return (
    <StyledHeader>
      <StyledTitle>Tech Article</StyledTitle>
      <StyledUserData>
        {user ? (
          <div>おかえりなさい、{user.username}さん</div>
        ) : (
          <div>未ログイン</div>
        )}
      </StyledUserData>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  text-align: center;
  // 画面幅が 600px 以上の場合のスタイル
  @media (min-width: 600px) {
    position: relative;
    margin: 0 24px;
  }
`;

const StyledTitle = styled.h1`
  margin: 0;
  @media (min-width: 600px) {
    padding: 18px 0px;
    text-align: center;
  }
`;

const StyledUserData = styled.div`
  @media (min-width: 600px) {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
`;
