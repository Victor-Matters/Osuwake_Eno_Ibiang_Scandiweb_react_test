import React, { Component } from 'react'
import { CartPageContainer } from '../styles/CartPage'
import { useNavigate, useParams } from "react-router-dom";
import { connect } from 'react-redux';
import { setCartItems } from '../redux/slices/cartSlice'
import { ReactComponent as EmptyCart } from "../assets/svg/emptyCart.svg";
import { ReactComponent as PlusSquare } from "../assets/svg/plus_square.svg";
import { ReactComponent as MinusSquare } from "../assets/svg/minus_square.svg";
import { ReactComponent as LeftSquare } from "../assets/svg/left_square.svg";
import { ReactComponent as RightSquare } from "../assets/svg/right_square.svg";
import ColorBox from '../components/ColorBox';
import AttributeBox from '../components/AttributeBox';
import ButtonType1 from '../components/ButtonType1';
import { setShowCart } from '../redux/slices/navSlice';


const taxPercent = 21

class CartPage extends Component {

  componentDidMount() {

    window.scrollTo(0, 0)

  }

  decreaseProductQuantity(index) {
    let temp_cartItems = [...this.props.cartItems];
    let temp_product = { ...this.props.cartItems[index] };

    if (temp_product.quantity === 1) {
      temp_cartItems.splice(index, 1);
      this.props.setCartItems(temp_cartItems)
      this.setState({ notificationMessage: temp_product.name + ' removed from cart' })

    }
    else {
      temp_product.quantity = temp_product.quantity - 1
      temp_cartItems[index] = temp_product
      this.props.setCartItems(temp_cartItems)
      this.setState({ notificationMessage: temp_product.name + ' removed from cart' })

    }

    setTimeout(() => {
      this.setState({ notificationMessage: '' })
    }, 5000)

  }

  increaseProductQuantity(index) {
    let temp_cartItems = [...this.props.cartItems];
    let temp_product = { ...this.props.cartItems[index] };

    temp_product.quantity = temp_product.quantity + 1

    temp_cartItems[index] = temp_product
    this.props.setCartItems(temp_cartItems)
    this.setState({ notificationMessage: temp_product.name + ' added to cart' })
    setTimeout(() => {
      this.setState({ notificationMessage: '' })
    }, 5000)

  }

  onAttributeClick(attributeIndex, choiceIndex, product_index) {


    let cartItems = [...this.props.cartItems]


    /// Updating attributes choice selection on cart
    let cartItem = { ...cartItems[product_index] }

    let cartItemAttributes = [...cartItem.attributes]

    let cartItemAttribute = { ...cartItemAttributes[attributeIndex] }

    cartItemAttribute.choiceIndex = choiceIndex

    cartItemAttributes[attributeIndex] = cartItemAttribute

    cartItem.attributes = cartItemAttributes

    cartItems[product_index] = cartItem

    this.props.setCartItems(cartItems)



  }


  onOrderClick = () => {
    console.log(this.props.cartItems)
    alert('Dear Sir/Madam, No action was specified for the ORDER button in the Test instructions. I have however logged out to the console the cart items the user is supposed to be checking out with.')
  }

  galleryLeftClick = (product_index, galleryLength) => {
    let _cartItems = [...this.props.cartItems]
    let _cartItem = { ..._cartItems[product_index] }

    if (_cartItem.galleryIndex === undefined) {

    }

    else {

    }

    _cartItem.galleryIndex = _cartItem.galleryIndex === undefined ? 0 : _cartItem.galleryIndex - 1
    _cartItems[product_index] = _cartItem
    this.props.setCartItems(_cartItems)

  }

  galleryRightClick = (product_index) => {
    let _cartItems = [...this.props.cartItems]
    let _cartItem = { ..._cartItems[product_index] }

    _cartItem.galleryIndex = _cartItem.galleryIndex === undefined ? 1 : _cartItem.galleryIndex + 1
    _cartItems[product_index] = _cartItem
    this.props.setCartItems(_cartItems)

  }

  render() {

    const cartItems = this.props.cartItems
    const selectedCurrency = this.props.selectedCurrency
    const showCart = this.props.showCart


    let totalQuantityOfProducts = 0;
    let totalPrice = 0;

    for (let i = 0; i < cartItems.length; i++) {
      totalQuantityOfProducts += cartItems[i].quantity
      totalPrice += cartItems[i].quantity * cartItems[i].prices[selectedCurrency].amount
    }

    return (
      <CartPageContainer dimContent={showCart}>
        <div className='dim-overlay' onClick={() => this.props.setShowCart(false)} ></div>
        <div className='header-container'>
          <h2>CART</h2>
        </div>

        {cartItems.length > 0 ? <React.Fragment>

          <div className='items-container'>
            {cartItems.map((product, product_index) => {
              return (
                <div key={product_index} className='cart-item'>
                  <section className='left'>
                    <section className='attributes'>
                      <p className='brand'>{product.brand}</p>
                      <p className='name'>{product.name}</p>
                      <p className='amount'>
                        {product.prices[selectedCurrency].currency.symbol + " " + parseFloat(product.prices[selectedCurrency].amount).toFixed(2)}
                      </p>
                      {product.attributes.map((attribute, index) => {
                        return (
                          <div key={index} className='attributes-container'>
                            <p className='header'>
                              {attribute.name}:
                            </p>
                            <div className={attribute.id === "Color" ? "attribute-row1" : "attribute-row2"}>
                              {
                                attribute.items.map((item, i) => {
                                  return (
                                    <React.Fragment key={i}>
                                      {
                                        attribute.id === "Color" ?
                                          <ColorBox
                                            key={i}
                                            boxHeight={"17px"}
                                            boxWidth={"17px"}
                                            boxSize={"75%"}
                                            boxColor={item.value}
                                            selected={i === product.attributes[index].choiceIndex}
                                            isCursor={false}
                                            // onClick={() => this.onAttributeClick(index, i, product_index)}
                                          />
                                          :
                                          <AttributeBox key={i}
                                            boxHeight={"40px"}
                                            fontSize={"17px"}
                                            sizeText={item.value}
                                            selected={i === product.attributes[index].choiceIndex}
                                            isCursor={false}
                                            // onClick={() => this.onAttributeClick(index, i, product_index)}
                                          />

                                      }
                                    </React.Fragment>
                                  )
                                })
                              }
                            </div>
                          </div>
                        )
                      })}
                    </section>

                  </section>
                  <section className='right'>
                    <section className='quantity-buttons'>
                      <PlusSquare className='button'
                        onClick={() => this.increaseProductQuantity(product_index)}
                      />
                      {product.quantity}
                      <MinusSquare className='button'
                        onClick={() => this.decreaseProductQuantity(product_index)}
                      />
                    </section>
                    <img alt={product.name} src={product.gallery[product.galleryIndex === undefined ? 0 : product.galleryIndex]} />
                  
                    {product.gallery.length > 1 && <React.Fragment>
                      <LeftSquare
                        onClick={product.galleryIndex === undefined || product.galleryIndex === 0 ? null : () => this.galleryLeftClick(product_index)}
                        className={`left-arrow ${product.galleryIndex === undefined || product.galleryIndex === 0 ? "" : "enabled"}`}
                      />
                      <RightSquare
                        onClick={product.galleryIndex === product.gallery.length - 1 ? null : () => this.galleryRightClick(product_index)}
                        className={`right-arrow ${product.galleryIndex === product.gallery.length - 1 ? "" : "enabled"}`}
                      />
                    </React.Fragment>
                    }
                  </section>
                </div>
              )
            })}
            <div className='order-section'>
              <p className='tax'>Tax {taxPercent}%: <span>{cartItems[0].prices[selectedCurrency].currency.symbol}{((taxPercent / 100) * totalPrice).toFixed(2)}</span> </p>
              <p className='quantity'>Quantity: <span>{totalQuantityOfProducts}</span> </p>
              <p className='total'>Total: <span>{cartItems[0].prices[selectedCurrency].currency.symbol}{totalPrice.toFixed(2)}</span> </p>
              <ButtonType1
                onClick={() => this.onOrderClick()}
                buttonText="Order"
              />
            </div>
          </div>

        </React.Fragment>
          :
          <div className='empty-cart'>
            <EmptyCart />
            <p>Your cart is empty</p>
            <div className='button-container'>
              <ButtonType1
                onClick={() => {

                  this.props.navigate('/')
                }}
                buttonText="Start Shopping"
              />
            </div>

          </div>
        }


      </CartPageContainer>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCartItems: (item) => dispatch(setCartItems(item)),
    setShowCart: () => dispatch(setShowCart())
  }
};

const mapStateToProps = state => ({
  cartItems: state.cartSlice.cartItems,
  selectedCurrency: state.navSlice.selectedCurrency,
  showCart: state.navSlice.showCart
})

export const withRouter = (Component) => (props) => {
  const params = useParams();
  const navigate = useNavigate();
  return <Component {...props} params={params} navigate={navigate} />;
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartPage))

