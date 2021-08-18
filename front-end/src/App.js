import logo from "./logo.svg";
import "./App.css";
import manageRoute from "./routes/manage";
import { HashRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import store from "./redux";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <HashRouter>{renderRoutes(manageRoute)}</HashRouter>
      </Provider>
    </div>
  );
}

export default App;
