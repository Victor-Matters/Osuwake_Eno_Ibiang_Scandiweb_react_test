import React, { Component } from 'react'
import {AttributeBoxContainer } from '../styles/AttributeBox'

export default class AttributeBox extends Component {
 
  render() {
    return (
      <AttributeBoxContainer
        isCursor={this.props.isCursor}
        boxHeight={this.props.boxHeight}
        boxWidth={this.props.boxWidth}
        fontSize={this.props.fontSize}
        selected={this.props.selected}
        onClick={this.props.onClick}
      >
        {this.props.sizeText}
      </AttributeBoxContainer>
    )
  }
}

AttributeBox.defaultProps={
  isCursor: true
}

