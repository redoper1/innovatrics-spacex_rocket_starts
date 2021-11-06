import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createClient, Provider } from "urql";

import { CssBaseline } from "@material-ui/core";

import { Error404 } from "./Pages/Errors";
import LaunchesList from "./Pages/LaunchesList";
import LaunchDetail from "./Pages/LaunchDetail";

import { makeStyles } from "@material-ui/core/styles";

const urqlClient = createClient({
  url: "https://api.spacex.land/graphql/",
});

export const useStyles = makeStyles({
  bold: {
    fontWeight: 600,
  },

  dFlex: {
    display: "flex",
  },

  justifyContentSpaceEvenly: {
    justifyContent: "space-evenly",
  },

  mx15: {
    marginLeft: "15px",
    marginRight: "15px",
  },

  mt0: {
    marginTop: 0,
  },

  mxAuto: {
    marginLeft: "auto",
    marginRight: "auto",
  },
});

function App() {
  const classes = useStyles();

  return (
    <Provider value={urqlClient}>
      <Router>
        <CssBaseline />
        <div className={"App " + classes.mx15}>
          <Routes>
            <Route path="/">
              <Route index element={<LaunchesList />} />
              <Route path="/launch/:launchId" element={<LaunchDetail />} />
              <Route path="*" element={<Error404 />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
