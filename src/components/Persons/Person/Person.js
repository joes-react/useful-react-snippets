import React, { Component } from "react";
import styled from "styled-components";
import "./Person.css";

class Person extends Component {
  render() {
    console.log(`[Person.js] rendering ...`);
    return (
      <PersonDiv>
        <p onClick={this.props.click}>
          I am a person and my name is {this.props.name}. I am {this.props.age}{" "}
          years old
        </p>
        <p>{this.props.children}</p>
        <input
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
      </PersonDiv>
    );
  }
}

const PersonDiv = styled.div`
  width: 60%;
  margin: 16px auto;
  border: 1px solid #eee;
  box-shadow: 0 2px 3px #ccc;
  padding: 16px;
  text-align: center;
  @media (min-width: 500px) {
    width: 450px;
  }
`;

export default Person;
