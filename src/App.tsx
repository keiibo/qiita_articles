import styled from "styled-components";
import { AppRouter } from "./route/Router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./feature/auth/slice/authSlice";

export const App = (): React.JSX.Element => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };
  const user = useSelector(selectUser);

  return (
    <AppContainer>
      <StyledTitle>Tech Article</StyledTitle>
      <div>
        {user ? (
          <h4>おかえりなさい {user.username}</h4>
        ) : (
          <h1>ログインしてないよ</h1>
        )}
      </div>
      <AppRouter isLoggedIn={isLoggedIn} onLoginSuccess={handleLoginSuccess} />
    </AppContainer>
  );
};

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled.h1`
  text-align: center;
  margin-top: 0;
  padding-top: 20px; // 見た目の調整
`;
