import React, { Component } from 'react'
import { ButtonType2Container } from '../styles/ButtonType2';

export default class ButtonType2 extends Component {

  render() {

    return (
      <ButtonType2Container fontSize={this.props.fontSize}>
        <button onClick={this.props.onClick}>
          {this.props.buttonText}
        </button>
      </ButtonType2Container>
    )
  }
}

ButtonType2.defaultProps = {
  fontSize: "14px"
}
