import React from "react";
import { logoutUser, TLoginUser } from "../../feature/auth/slice/authSlice";
import { styled } from "styled-components";
import { LogoutOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useDispatch } from "react-redux";

type TProps = {
  user: TLoginUser | null;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header = ({ user, setLoggedIn }: TProps): React.JSX.Element => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    setLoggedIn(false);
    dispatch(logoutUser());
  };
  return (
    <StyledHeader>
      <StyledTitle>Tech Article</StyledTitle>
      <StyledUserData>
        {user ? (
          <StyledUserContainer>
            <div>おかえりなさい、{user.username}さん</div>
            <Tooltip title="クリックでログアウト">
              <LogoutOutlined onClick={() => handleLogout()} />
            </Tooltip>
          </StyledUserContainer>
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

const StyledUserContainer = styled.div`
  display: flex;
  gap: 4px;
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
