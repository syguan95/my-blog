import logo from "./logo.svg";
import "./App.css";
import manageRoute from "./routes/manage";
import blogRoute from "./routes/blog";
import { HashRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import store from "./redux";
import { Provider } from "react-redux";

var mainRoute = [];

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <HashRouter>{renderRoutes(mainRoute.concat(manageRoute, blogRoute))}</HashRouter>
      </Provider>
    </div>
  );
}

export default App;
