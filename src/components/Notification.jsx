import React, { Component } from 'react'
import { NotificationContainer } from '../styles/Notification'

export default class Notification extends Component {

  render() {
    return (
      <NotificationContainer
        backgroundColor={this.props.backgroundColor}
        show={this.props.show}
      >
        {this.props.message}
      </NotificationContainer>
    )
  }
}


