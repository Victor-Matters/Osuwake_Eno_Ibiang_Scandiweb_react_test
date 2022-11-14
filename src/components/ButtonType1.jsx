import React, { Component } from 'react'
import { ButtonType1Container } from '../styles/ButtonType1';

export default class ButtonType1 extends Component {

  render() {

    return (
      <ButtonType1Container>
        <button onClick={this.props.onClick}>
          {this.props.buttonText}
        </button>
      </ButtonType1Container>
    )
  }
}
