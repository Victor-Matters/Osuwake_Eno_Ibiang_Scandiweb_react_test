import React, { Component } from 'react'
import { connect } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { client } from '../index.js'
import {  setCartItems } from '../redux/slices/cartSlice'
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
    // this.props.setProductAttributes([])
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
      query:  GET_PRODUCT(id)
    }).then((result) => {
      let productData = result.data.product

      if (productData === null) {
        this.setState({ error: 'Oops ! Broken Link', showBackButton: true })
      }
      else {
        this.setState({
          loading: false,
          productData: productData
        })
        
        client.resetStore()
      }

    }).catch(err => {
      this.setState({ error: err?.message })
    })
  }




  addProductToCart(product) {

    //Manking an extensible object from param 
    //so i can an an ititial quantity of value 1 
    const item = { ...product }

    if (item.inStock) {

      let cartItems = [...this.props.cartItems];

      item.quantity = 1
      cartItems.unshift(item)
      this.props.setCartItems(cartItems)
      this.setState({ notificationType: 'success', notificationMessage: item.brand + ' ' + item.name + ' added to cart' })
      setTimeout(() => {
        this.setState({ notificationMessage: '' })
      }, 5000)

    }
    else {
      this.setState({ notificationType: 'error', notificationMessage: item.brand + ' ' + item.name + ' is out of stock' })
      setTimeout(() => {
        this.setState({ notificationMessage: '' })
      }, 5000)
    }
  }

  addToCartClick() {
    const { productData } = this.state
    let cartItems = [...this.props.cartItems]

    //Check if cart has any items
    if (cartItems.length > 0) {

      let item_with_same_id_and_attributes_found = false
      let index_of_item_with_same_id_and_attributes = null

      if (productData.attributes.length > 0) {
        //Run check for item with same id and same attribute selections

        //Make a validation check (Checks if user has made choices for all attributes)

        //This function (validateAttributesSelection) takes attributes as a parameter and iterates through
        //Returns true if options has been selected for all attributes else returns false
        const are_all_Attributes_Checked = this.validateAttributesSelection(productData.attributes)
        if (are_all_Attributes_Checked) {
          for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].id === productData.id) {
              //This function (compareAttributes) takes two attributes  and iterates through them
              //Returns true if selected options in them are thesame else returns false
              const attributes_selection_thesame = this.compareAttributes(cartItems[i].attributes, productData.attributes)
              if(attributes_selection_thesame){
                item_with_same_id_and_attributes_found = true
                index_of_item_with_same_id_and_attributes = i
              }
            }
          }

          if(item_with_same_id_and_attributes_found){

            this.increaseProductQuantity(index_of_item_with_same_id_and_attributes)
            this.setState({ notificationType: 'success', notificationMessage: 'An identical ' + productData.brand + ' ' + productData.name + ' was found in your bag. Quantity is now ' + parseInt(cartItems[index_of_item_with_same_id_and_attributes].quantity+1)})
            setTimeout(() => {
              this.setState({ notificationMessage: '' })
            }, 7000)

          }
          else{
            //No item with same id and attribute selections found
            this.addProductToCart(productData)
          }
        }

      }
      else {
        let item_with_same_id_found = false
        let index_of_item_with_same_id = null
        //Run check for item with same id
        for (let i = 0; i < cartItems.length; i++) {
          if (cartItems[i].id === productData.id) {
            item_with_same_id_found = true
            index_of_item_with_same_id = i  
            break
          }

        }


        if (item_with_same_id_found) {

          this.increaseProductQuantity(index_of_item_with_same_id)
          this.setState({ notificationType: 'success', notificationMessage: 'An identical ' + productData.brand + ' ' + productData.name + ' was found in your bag. Quantity is now ' + parseInt(cartItems[index_of_item_with_same_id].quantity + 1) })
          setTimeout(() => {
            this.setState({ notificationMessage: '' })
          }, 7000)

        }
        else {
          //No item with same id and attribute selections found
          this.addProductToCart(productData)
        }

      }

    }
    else {
      //Check if product has any attributes
      if (productData.attributes.length > 0) {
        //Make a validation check (Checks if user has made choices for all attributes)

        //This function takes attributes as a parameter and iterates through
        //Returns true if options has been selected for all attributes else returns false
        const are_all_Attributes_Checked = this.validateAttributesSelection(productData.attributes)
        if (are_all_Attributes_Checked) {
          this.addProductToCart(productData)
        }
      }
      else {
        //Since no attributes are found, without further ado
        //just add item to cart
        this.addProductToCart(productData)
      }
    }
  }

  

  validateAttributesSelection = (attributes) => {

    for (let i = 0; i < attributes.length; i++) {
      if (attributes[i].choiceIndex === undefined) {
        this.setState({
          attributeValidationFocusIndex: i,
          attributeValidationErrorFound: true
        })
        setTimeout(() => {
          this.setState({ attributeValidationErrorFound: false })
        }, 3000);
        return false
      }
    }
    return true

  }

  compareAttributes = (attributes1, attributes2) => {
    let matchCount = 0
    for (let i = 0; i < attributes1.length; i++) {
      if (attributes1[i].choiceIndex === attributes2[i].choiceIndex) {
        matchCount += 1
      }
    }

    if (matchCount === attributes1.length) {
      return true
    }
    else {
      return false
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
  }

  onAttributeClick(attributeIndex, choiceIndex) {
    //make an extensible copy of the focused item
    const _product = { ...this.state.productData }

    //make an iterable copy of the focused item attributes
    const _product_attributes = [..._product.attributes]

    const _product_attribute = { ..._product.attributes[attributeIndex] }

    _product_attribute.choiceIndex = choiceIndex

    _product_attributes[attributeIndex] = _product_attribute

    _product.attributes = _product_attributes

    this.setState({ productData: _product })

  }

  render() {

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


    const showCart = this.props.showCart


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
              <p className="price">{productData.prices[selectedCurrency].currency.symbol + " " + parseFloat(productData.prices[selectedCurrency].amount).toFixed(2)}</p>
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
              <ButtonType1 onClick={() => this.addToCartClick()} buttonText="Add to cart" />
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

