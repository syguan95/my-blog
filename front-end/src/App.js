import logo from "./logo.svg";
import "./App.css";
import manageRoute from "./routes/manage";
import { HashRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";

function App() {
  return (
    <div className="App">
      <HashRouter>{renderRoutes(manageRoute)}</HashRouter>
    </div>
  );
}

export default App;
