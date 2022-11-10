import React, { Component } from 'react'
import { CardContainer } from '../styles/Card'

export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CardContainer inStock={this.props.inStock}>
        <div className={!this.props.inStock ? "low-opacity" : "" }>
        <img  src={this.props.image} alt={this.props.imageName} />
        <div className='item-name'>{this.props.name}</div>
        <div className='item-price'>{this.props.price}</div>
          {!this.props.inStock && <div className='item-info'>OUT OF STOCK</div>}
        </div>
      </CardContainer>
    )
  }
}
