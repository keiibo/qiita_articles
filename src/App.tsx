import styled from "styled-components";
import { Home } from "./Home";

export const App = (): React.JSX.Element => {
  return (
    <AppContainer>
      <StyledTitle>Articles</StyledTitle>
      <Home />
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
