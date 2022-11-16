import React, { Component } from 'react'
import {AttributeBoxContainer } from '../styles/AttributeBox'

export default class AttributeBox extends Component {
 
  render() {
    return (
      <AttributeBoxContainer
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

