import React, { Component } from "react";
import "./App.css";
import Button from "./components/button";
import Input from "./components/input";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      operation: "",
      prevNum: "",
      newNum: "",
      reset: ""
    };
  }
  insertData = num => {
    console.log("inside ++ :" + this.state.reset);
    // if (this.state.reset === "do") {
    //   console.log("inside do  :");
    //   this.resetCalc();
    // }
    this.setState({ input: this.state.input + num });
  };
  checkAddZero = num => {
    if (this.state.input !== "") {
      this.setState({ input: this.state.input + num });
    }
  };
  addDecimal = dec => {
    if (this.state.input.indexOf(".") === -1) {
      this.setState({ input: this.state.input + dec });
    }
  };
  resetCalc = () => {
    this.setState({ input: "", reset: "" });
  };
  addOperator = () => {
    this.state.prevNum = this.state.input;
    this.state.operation = "add";
    this.setState({
      input: ""
    });
  };
  subOperator = () => {
    this.state.prevNum = this.state.input;
    this.state.operation = "sub";
    this.setState({
      input: ""
    });
  };
  divOperator = () => {
    this.state.prevNum = this.state.input;
    this.state.operation = "div";
    this.setState({
      input: ""
    });
  };
  mulOperator = () => {
    this.state.prevNum = this.state.input;
    this.state.operation = "mul";
    this.setState({
      input: ""
    });
  };
  getResult = e => {
    this.state.newNum = this.state.input;
    // for addition only

    //prevent page from refresh
    //e.preventDefault();
    const data = {
      operation: this.state.operation,
      prevNum: this.state.prevNum,
      newNum: this.state.newNum
    };
    console.log("inside get result  date : " + data);
    //make a post request with the user data
    axios.post("http://localhost:3010/calculate", data).then(response => {
      console.log("Status Code : ", response);
      if (response.status === 200) {
        const result = response.data;
        console.log(result);
        this.setState({
          input: result,
          operation: "",
          prevNum: "",
          newNum: "",
          reset: "do"
        });
      } else {
        this.setState({
          input: "Call has failed, please check connection"
        });
      }
    });
  };

  render() {
    return (
      <div className="App">
        <div className="calc-wrapper">
          <div className="row">
            <Input>{this.state.input}</Input>
          </div>
          <div className="row">
            <Button handleClick={this.insertData}>7</Button>
            <Button handleClick={this.insertData}>8</Button>
            <Button handleClick={this.insertData}>9</Button>
            <Button handleClick={this.divOperator}>/</Button>
          </div>
          <div className="row">
            <Button handleClick={this.insertData}>4</Button>
            <Button handleClick={this.insertData}>5</Button>
            <Button handleClick={this.insertData}>6</Button>
            <Button handleClick={this.mulOperator}>*</Button>
          </div>
          <div className="row">
            <Button handleClick={this.insertData}>1</Button>
            <Button handleClick={this.insertData}>2</Button>
            <Button handleClick={this.insertData}>3</Button>
            <Button handleClick={this.addOperator}>+</Button>
          </div>

          <div className="row">
            <Button handleClick={this.addDecimal}>.</Button>
            <Button handleClick={this.checkAddZero}>0</Button>
            <Button handleClick={this.getResult}>=</Button>
            <Button handleClick={this.subOperator}>-</Button>
          </div>
          <div className="row">
            <Button handleClick={this.resetCalc}>Reset</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
