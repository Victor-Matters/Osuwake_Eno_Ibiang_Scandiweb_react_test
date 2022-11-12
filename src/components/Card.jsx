import React, { Component } from 'react'
import { CardContainer } from '../styles/Card'
import add_to_cart from "../assets/png/add_to_cart.png";


export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CardContainer 
      inStock={this.props.inStock} 
      productId={this.props.productId}
      focusedProductId={this.props.focusedProductId}
      >
        <div className={!this.props.inStock ? "low-opacity" : "" }>
          <div onClick={this.props.inStock ? this.props.onProductImageClick : undefined} className='product-image'>
            <img  src={this.props.image} alt={this.props.imageName} />
            {!this.props.inStock && <div className='item-info'>OUT OF STOCK</div>}
          </div>
          <div onClick={this.props.inStock ? this.props.onProductPriceClick : undefined} className='product-price'>
            <div className='item-name'>{this.props.name}</div>
            <div className='item-price'>{this.props.price}</div>
          </div>
          {this.props.focusedProductId === this.props.productId && <img onClick={this.props.onCartClick} className='cart-icon' src={add_to_cart} alt='add-to-cart' />}

        </div>
      </CardContainer>
    )
  }
}
