import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Videor from "./pages/Videor";
import { useMediaQuery } from 'react-responsive';
import Navbar2 from "./components/Navbar2";
const Container = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.bg};
  height:100%
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};

`;
const Wrapper = styled.div`
  padding: 12px 1px;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1224 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
        {!isMobile && <Menu darkMode={darkMode} setDarkMode={setDarkMode} />}
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home />} />
                  <Route path="signin" element={<SignIn />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                  <Route path="videor">
                    <Route path=":id" element={<Videor />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
            {isMobile && <Navbar2 darkMode={darkMode} setDarkMode={setDarkMode} />}
          </Main>
          
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
