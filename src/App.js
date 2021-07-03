import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CharacterDetail from "./components/characterDetail";
import CharacterProvider, {
  CharacterContext,
} from "./context/characterContext";
import { useContext } from "react";
import Header from "./components/Header";

function App() {
  const idCharacter = JSON.parse(window.localStorage.getItem("character"));

  return (
    <>
      <CharacterProvider>
        <Header />
        <Router>
          <Switch>
            <Route path={"/character"}>
              <CharacterDetail />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </CharacterProvider>
    </>
  );
}

export default App;
