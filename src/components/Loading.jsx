import React, { Component } from 'react'
import { LoadingContainer } from '../styles/Loading'

export default class Loading extends Component {

  render() {
    return (
      <LoadingContainer>
        <h3 hidden={this.props.errorMessage !== ''}>{this.props.loadingMessage}</h3>
        <h4 hidden={this.props.errorMessage === ''}>{this.props.errorMessage}</h4>
        {this.props.showBackButton && <button onClick={this.props.backButton_onClick}>{this.props.backButtonText}</button>}
      </LoadingContainer>
    )
  }
}

Loading.defaultProps={
  showBackButton: false,
  backButtonText: "Go Back"
}
