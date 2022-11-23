import React, { Component } from 'react'
import { connect } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { client } from '../index.js'
import { setProductAttributes, setCartItems } from '../redux/slices/cartSlice'
import Loading from '../components/Loading.jsx';
import AttributeBox from '../components/AttributeBox.jsx';
import ColorBox from '../components/ColorBox.jsx';
import { PDPContainer } from '../styles/PDP.js';
import ButtonType1 from '../components/ButtonType1.jsx';
import Notification from '../components/Notification.jsx';
import { GET_CATEGORY, GET_PRODUCT } from '../graphql/queries.js';
import { setShowCart } from '../redux/slices/navSlice.js';
const parse = require('html-react-parser');



class PDP extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: '',
      showBackButton: false,
      productData: {},
      focusedGalleryIndex: 0,
      attributeValidationFocusIndex: 0,
      attributeValidationErrorFound: false,
      notificationMessage: '',
      notificationType: '',
    }
  }

  componentDidMount() {

    this.getProductData()
    window.scrollTo(0, 0)
    // this.props.setCartItems([])
    //   this.props.setProductAttributes([])

  }


  getProductData() {
    const { categoryName } = this.props.params


    this.getCategoryByName(categoryName)
  }


  getCategoryByName = async (categoryName) => {
    await client.query({
      query: GET_CATEGORY(categoryName)
    }).then((result) => {
      let categoryData = result.data.category
      if (categoryData === null) {
        this.setState({ error: 'Oops ! Broken Link', showBackButton: true })
      }
      else {
        const { product_id } = this.props.params
        this.getProductById(product_id)
      }

    }).catch(err => {
      this.setState({ error: err?.message })
    })
  }

  getProductById = async (id) => {
    await client.query({
      query: GET_PRODUCT(id)
    }).then((result) => {
      let productData = result.data.product

      if (productData === null) {
        this.setState({ error: 'Oops ! Broken Link', showBackButton: true })
      }
      else {
        //Maintain user's selected attributes from cart

        let cartItems = [...this.props.cartItems]

        let temp_productData = { ...productData }

        if (cartItems.length > 0) {
          // Checking if cart id has any product with same id
          let productWithSameIdFound = false;
          let index_of_productWithSameId = null;

          for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].id === id) {
              productWithSameIdFound = true
              index_of_productWithSameId = i
            }
          }

          if (productWithSameIdFound) {

            temp_productData.attributes = cartItems[index_of_productWithSameId].attributes
            this.setState({
              loading: false,
              productData: temp_productData
            })

            // console.log({cartItems: cartItems[index_of_productWithSameId]})


          }

          else {
            this.setState({
              loading: false,
              productData: productData
            })
          }

        }

        else {
          this.setState({
            loading: false,
            productData: productData
          })
        }

      }

    }).catch(err => {
      this.setState({ error: err?.message })
    })
  }




  addProductToCart(item) {
const {productData} = this.state
    if(productData.inStock) {

    let cartItems = [...this.props.cartItems];


    item.quantity = 1
    cartItems.unshift(item)
    this.props.setCartItems(cartItems)
    this.setState({ notificationType: 'success', notificationMessage: item.brand + ' ' + item.name + ' added to cart' })
    setTimeout(() => {
      this.setState({ notificationMessage: '' })
    }, 5000)

  }
  else{
      this.setState({ notificationType: 'error', notificationMessage: productData.brand + ' ' + productData.name + ' is out of stock' })
      setTimeout(() => {
        this.setState({ notificationMessage: '' })
      }, 5000)
  }
  }




  addToCartClick() {
    const { productData } = this.state

    const attributes = productData.attributes
    const _productData = { ...productData }

    // _productData.quantity = 0

    if (this.props.cartItems === undefined) {
      this.props.setCartItems([])
    }


    if (attributes.length === 0) {
      //Proceed to add product to cart without validating 
      //attributes options selection

      this.addProductToCart(_productData)
    }
    else {
      //Validating if user has selected desired attributes options
      let errorFound = false
      for (let i = 0; i < attributes.length; i++) {
        if (attributes[i].choiceIndex === undefined) {
          this.setState({
            attributeValidationFocusIndex: i,
            attributeValidationErrorFound: true
          })
          setTimeout(() => {
            this.setState({ attributeValidationErrorFound: false })
          }, 3000);
          return
        }
      }

      if (!errorFound) {

        this.addProductToCart(_productData)

      }
    }

  }

  decreaseProductQuantity(index) {
    let temp_cartItems = [...this.props.cartItems];
    let temp_product = { ...this.props.cartItems[index] };

    if (temp_product.quantity === 1) {
      temp_cartItems.splice(index, 1);
      this.props.setCartItems(temp_cartItems)
      this.setState({ notificationType: 'error', notificationMessage: temp_product.brand + ' ' + temp_product.name + ' removed from cart' })

    }
    else {
      temp_product.quantity = temp_product.quantity - 1
      temp_cartItems[index] = temp_product
      this.props.setCartItems(temp_cartItems)
      this.setState({ notificationType: 'error', notificationMessage: temp_product.brand + ' ' + temp_product.name + ' removed from cart' })

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
    this.setState({ notificationType: 'success', notificationMessage: temp_product.brand + ' ' + temp_product.name + ' added to cart' })
    setTimeout(() => {
      this.setState({ notificationMessage: '' })
    }, 5000)

  }

  onAttributeClick(attributeIndex, choiceIndex) {

    const { productData } = this.state
    let cartItems = [...this.props.cartItems]

    //Making objects and array references to update 
    // attributes choice selection on PDP

    let product = { ...this.state.productData };

    let product_attributes = [...product.attributes];

    let product_attribute = { ...product_attributes[attributeIndex] };

    product_attribute.choiceIndex = choiceIndex

    product_attributes[attributeIndex] = product_attribute

    product.attributes = product_attributes

    this.setState({ productData: product })


    //Checking if product with same id in cart such that if found the
    //attribute option update should apply there as well
    if (cartItems.length > 0) {
      // Checking if cart id has any product with same id
      let productWithSameIdFound = false;
      let index_of_productWithSameId = null;

      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id === productData.id) {
          productWithSameIdFound = true
          index_of_productWithSameId = i
        }
      }




      //Checking if there is a product in cart with same id 
      // so i can update the new choices there too
      if (productWithSameIdFound) {
        /// Updating attributes choice selection on cart
        let cartItem = { ...cartItems[index_of_productWithSameId] }

        let cartItemAttributes = [...cartItem.attributes]

        let cartItemAttribute = { ...cartItemAttributes[attributeIndex] }

        cartItemAttribute.choiceIndex = choiceIndex

        cartItemAttributes[attributeIndex] = cartItemAttribute

        cartItem.attributes = cartItemAttributes

        cartItems[index_of_productWithSameId] = cartItem

        this.props.setCartItems(cartItems)

      }



    }


  }

  render() {

    //console.log(this.state.productData)

    const selectedCurrency = this.props.selectedCurrency

    const {
      loading,
      error,
      showBackButton,
      productData,
      focusedGalleryIndex,
      attributeValidationErrorFound,
      attributeValidationFocusIndex,
      notificationType,
      notificationMessage
    } = this.state

    const cartItems = this.props.cartItems
    const showCart = this.props.showCart


    //Checking if product is in Cart so 
    //that i can display Increment/decrement product quantity buttons
    let productInCart = false
    let indexOfProduct = null
    const item = { ...this.state.productData }


    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id === item.id) {
        indexOfProduct = i
        productInCart = true
        break;
      }
    }



    if (loading) {
      return (
        <Loading
          loadingMessage={'Please Wait..'}
          errorMessage={error}
          showBackButton={showBackButton}
          backButtonText={"Back to home"}
          backButton_onClick={() => this.props.navigate('/')}
        />
      )
    }
    else {
      return (
        <PDPContainer dimContent={showCart} >
          <div className='dim-overlay' onClick={() => this.props.setShowCart(false)} ></div>

          {/* Column for Images Gallery */}
          <div className='column1'>
            {productData?.gallery.map((image, index) => {
              return (
                <div key={index} onClick={focusedGalleryIndex !== index ? () => this.setState({ focusedGalleryIndex: index }) : undefined} className='image-container'>
                  <img alt={'image ' + index} src={image} />
                </div>
              )
            })}
          </div>
          {/* Column for Focused Gallery Image (default index 0) */}
          <div className='column2'>
            <img alt={productData.name + ' image'} className='large-image' src={productData?.gallery[focusedGalleryIndex]} />
          </div>
          {/* Column for Product Attributes etc*/}
          <div className='column3'>
            <div className='content'>
              <p className="product-brand">{productData.brand}</p>
              <p className="product-name">{productData.name}</p>

              {productData.attributes.map((attribute, index) => {
                return (
                  <div className={attributeValidationErrorFound && attributeValidationFocusIndex === index ? 'highlight' : null} key={index}>
                    <p className="product-attribute-header">{attribute.name}:</p>
                    <div className={attribute.id === "Color" ? "attribute-row1" : "attribute-row2"}>
                      {
                        productData.attributes[index].items.map((item, i) => {
                          return (
                            <React.Fragment key={i}>
                              {
                                //Checking for items with color attribute
                                // and using ColorBox component for them otherwise using
                                // bordered box for all items with type text
                                attribute.id === "Color" ?
                                  <ColorBox
                                    key={i}
                                    boxHeight={"25px"}
                                    boxWidth={"25px"}
                                    boxColor={item.value}
                                    selected={i === productData.attributes[index].choiceIndex}
                                    onClick={() => this.onAttributeClick(index, i)}
                                  />
                                  :
                                  <AttributeBox key={i}
                                    boxHeight={"40px"}
                                    fontSize={"16px"}
                                    sizeText={item.value}
                                    selected={i === productData.attributes[index].choiceIndex}
                                    onClick={() => this.onAttributeClick(index, i)}
                                    isCursor={true}
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
              <p className="product-attribute-header">PRICE:</p>
              <p className="price">{productData.prices[selectedCurrency].currency.symbol + " " + productData.prices[selectedCurrency].amount}</p>
              <br />
              {/* {productInCart ? <div className='product-in-cart-bottom'>
                <button onClick={() => this.decreaseProductQuantity(indexOfProduct)}>
                  {'<'}
                </button>
                <span>{cartItems[indexOfProduct].quantity}</span>
                <button onClick={() => this.increaseProductQuantity(indexOfProduct)}>
                  {'>'}
                </button>

              </div>
                :
                <ButtonType1 onClick={() => this.addToCartClick()} buttonText="Add to cart" />
              } */}
              <ButtonType1 onClick={() => { productInCart ? this.increaseProductQuantity(indexOfProduct) : this.addToCartClick() }} buttonText="Add to cart" />
              <div className='product-description' >{parse(productData.description)}</div>
              <Notification
                backgroundColor={notificationType === 'success' ? "#5ECE7B" : "red"}
                message={notificationMessage}
                show={notificationMessage !== ''}
              />
            </div>
          </div>
        </PDPContainer>
      )
    }
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    setProductAttributes: (item) => dispatch(setProductAttributes(item)),
    setCartItems: (item) => dispatch(setCartItems(item)),
    setShowCart: () => dispatch(setShowCart())
  }
};

const mapStateToProps = state => ({
  selectedCurrency: state.navSlice.selectedCurrency,
  cartItems: state.cartSlice.cartItems,
  showCart: state.navSlice.showCart,

})


export const withRouter = (Component) => (props) => {
  const params = useParams();
  const navigate = useNavigate();

  return <Component {...props} params={params} navigate={navigate} />;
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PDP))

