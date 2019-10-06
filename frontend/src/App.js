import React, { Component } from "react";
import logo from "./logo.svg";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Main from "./components/Main";
import { BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            {/* App Component Has a Child Component called Main*/}
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;
