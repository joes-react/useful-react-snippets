import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello from React App!</h1>
      </div>
    );
    // return React.createElement(
    // "div",
    // { className: "App" },
    // React.createElement("h1", null, "Hello from React App!")
    // );
  }
}

export default App;