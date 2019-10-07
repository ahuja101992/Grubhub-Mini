import React, { Component } from "react";
import "./Button.css";
// import "./App.css";

class Button extends Component {
  getClass = val => {
    if (!isNaN(val) || val === "." || val === "=") {
      return "Button";
    } else if (val === "Reset") {
      return "Button Reset";
    } else {
      return "Button Operator";
    }
  };
  render() {
    return (
      <div
        className={this.getClass(this.props.children)}
        onClick={() => this.props.handleClick(this.props.children)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Button;
