import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createClient, Provider } from "urql";

import { Error404 } from "./Pages/Errors";
import LaunchesList from "./Pages/LaunchesList";
import LaunchDetail from "./Pages/LaunchDetail";

import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles";
import Container from "@mui/material/Container";

const urqlClient = createClient({
  url: "https://api.spacex.land/graphql/",
});

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        underline: "hover",
      },
    },
  },
  typography: {
    h1: {
      fontSize: "2em",
      marginTop: "0.67em",
      marginBottom: "0.67em",
    },
  },
});

function App() {
  return (
    <Provider value={urqlClient}>
      <Router>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container>
              <Routes>
                <Route path="/">
                  <Route index element={<LaunchesList />} />
                  <Route path="/launch/:launchId" element={<LaunchDetail />} />
                  <Route path="*" element={<Error404 />} />
                </Route>
              </Routes>
            </Container>
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    </Provider>
  );
}

export default App;
