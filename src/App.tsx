import styled from "styled-components";
import { AppRouter } from "./route/Router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./feature/auth/slice/authSlice";
import { Header } from "./component/header/Header";

export const App = (): React.JSX.Element => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };
  const user = useSelector(selectUser);

  return (
    <AppContainer>
      <Header user={user} setLoggedIn={setLoggedIn} />
      <AppRouter isLoggedIn={isLoggedIn} onLoginSuccess={handleLoginSuccess} />
    </AppContainer>
  );
};

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
