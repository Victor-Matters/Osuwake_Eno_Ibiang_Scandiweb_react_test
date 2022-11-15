import React, { Component } from 'react'
import { ButtonType1Container } from '../styles/ButtonType1';

export default class ButtonType1 extends Component {

  render() {

    return (
      <ButtonType1Container fontSize={this.props.fontSize}>
        <button onClick={this.props.onClick}>
          {this.props.buttonText}
        </button>
      </ButtonType1Container>
    )
  }
}

ButtonType1.defaultProps={
  fontSize: "16px"
}
