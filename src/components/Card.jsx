import React, { Component } from 'react'
import { CardContainer } from '../styles/Card'
import add_to_cart from "../assets/png/add_to_cart.png";


export default class Card extends Component {


  render() {
    return (
      <CardContainer
        inStock={this.props.inStock}
        productId={this.props.productId}
        focusedProductId={this.props.focusedProductId}
        onClick={this.props.onProductClick}
      >
        <div className={!this.props.inStock ? "low-opacity" : ""}>
          <div  className='product-image'>
            <img src={this.props.image} alt={this.props.imageName} />
            {!this.props.inStock && <div className='item-info'>OUT OF STOCK</div>}
          </div>
          <div className='product-price'>
            <div className='item-name'>{this.props.brand} {this.props.name}</div>
            <div className='item-price'>{this.props.price}</div>
          </div>
          <img onClick={this.props.onCartClick} className='cart-icon' src={add_to_cart} alt='add-to-cart' />

        </div>
      </CardContainer>
    )
  }
}
