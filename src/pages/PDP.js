import React, { Component } from 'react'
import { gql } from '@apollo/client';
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
const parse = require('html-react-parser');


const GET_CATEGORY = (categoryName) => gql`
query  {
  category(input: {title: "${categoryName}"}) {
    name,
    products{id, name, inStock, gallery, prices{currency{label, symbol} amount}}
  }
}
`;

const GET_PRODUCT = (productId) => gql`
query  {
  product(id: "${productId}") {
    id,
    name,
    inStock,
    gallery,
    description,
    category,
    attributes{id, name, type, items{displayValue, value, id}},
    prices{currency{label,symbol}, amount},
    brand

   
  }
}
`;


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
      notificationMessage: ''
    }
  }
  componentDidMount() {
    this.getProductData()
    window.scrollTo(0, 0)
    this.props.setCartItems([])
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
        this.setState({
          loading: false,
          productData: productData,
        })
        //Trying to mantain user's selected attributes
        let persistedProductAttributes = this.props.productAttributes
        let incomingProductAttributes = productData.attributes




        if (persistedProductAttributes.length !== incomingProductAttributes.length) {
          this.props.setProductAttributes(incomingProductAttributes)
        }

        else {

          let identical = true;

          for (let i = 0; i < incomingProductAttributes.length; i++) {

            if (incomingProductAttributes[i].id !== persistedProductAttributes[i].id) {
              identical = false
            }
          }
          if (!identical) {
            this.props.setProductAttributes(productData.attributes)
          }
        }
      }

    }).catch(err => {
      this.setState({ error: err?.message })
    })
  }




  addProductToCart(item) {

    let cartItems = [...this.props.cartItems];

    //First Am checking if there exist any product in the cart 
    // with thesame exact attributes
    let identicalProductExist = false, indexOfIdentiticalProduct = null
    let choiceMatchCount = 0;

    for (let i = 0; i < cartItems.length; i++) {
      choiceMatchCount = 0
      if (cartItems[i].id === item.id) {
        for (let j = 0; j < cartItems[i].choices.length; j++) {
          if ((item.choices[j].name === cartItems[i].choices[j].name)
            && (item.choices[j].choice === cartItems[i].choices[j].choice)) {
            choiceMatchCount += 1
          }
        }

        if (choiceMatchCount === item.choices.length) {
          identicalProductExist = true
          indexOfIdentiticalProduct = i
          break
        }

      }
    }

    if (identicalProductExist) {
      alert('Already exist')
    }
    else {

      //Adding a default initial quantity of value 1 to the product

      item.quantity = 1
      cartItems.push(item)
      this.props.setCartItems(cartItems)
      this.setState({ notificationMessage: item.name + ' added to cart' })
      setTimeout(() => {
        this.setState({ notificationMessage: '' })
      }, 5000)
    }

  }




  addToCartClick() {
    if (this.props.cartItems === undefined) {
      this.props.setCartItems([])
    }
    const productAttributes = this.props.productAttributes

    if (productAttributes.length === 0) {
      this.addProductToCart(this.state.productData)
    }
    else {
      let errorFound = false
      for (let i = 0; i < productAttributes.length; i++) {
        if (productAttributes[i].choice === undefined) {
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
        let choices = []
        for (let i = 0; i < productAttributes.length; i++) {
          choices.push({
            name: productAttributes[i].name,
            choice: productAttributes[i].choice
          })
        }

        let temp_productData = { ...this.state.productData };
        temp_productData.choices = choices


        this.addProductToCart(temp_productData)
       

      }
    }

  }

  decreaseProductQuantity(index) {
    let temp_cartItems = [...this.props.cartItems];
    let temp_product = { ...this.props.cartItems[index] };

    if (temp_product.quantity===1){
      temp_cartItems.splice(index, 1); 
      this.props.setCartItems(temp_cartItems)
      this.setState({ notificationMessage: temp_product.name + ' removed from cart' })
      
    }
    else{
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

  onAttributeClick(attributeIndex, choice) {

    let temp_productAttributes = [...this.props.productAttributes];

    let temp_productAttribute = { ...temp_productAttributes[attributeIndex] };


    temp_productAttribute.choice = choice

    temp_productAttributes[attributeIndex] = temp_productAttribute
    this.props.setProductAttributes(temp_productAttributes)


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
      attributeValidationFocusIndex
    } = this.state

    const productAttributes = this.props.productAttributes
    const cartItems = this.props.cartItems
    const showCart = this.props.showCart



    let identicalProductExist = false,
      indexOfIdentiticalProduct = null,
      quantity = 0,
      item = { ...this.state.productData }
    let choiceMatchCount = 0;

    item.choices = productAttributes

    for (let i = 0; i < cartItems.length; i++) {
      choiceMatchCount = 0
      if (cartItems[i].id === item.id) {

        for (let j = 0; j < cartItems[i].choices.length; j++) {
          if ((item.choices[j].name === cartItems[i].choices[j].name)
            && (item.choices[j].choice === cartItems[i].choices[j].choice)) {
            choiceMatchCount += 1
          }
        }

        if (choiceMatchCount === item.choices.length) {
          identicalProductExist = true
          indexOfIdentiticalProduct = i
          quantity = item.quantity
          break
        }

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
          <div className='dim-overlay'></div>

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
                        attribute.items.map((item, i) => {
                          return (
                            <React.Fragment key={i}>
                              {
                                attribute.id === "Color" ?
                                  <ColorBox
                                    key={i}
                                    boxHeight={"25px"}
                                    boxWidth={"25px"}
                                    boxColor={item.value}
                                    selected={item.value === productAttributes[index]?.choice}
                                    onClick={() => this.onAttributeClick(index, item.value)}
                                  />
                                  :
                                  <AttributeBox key={i}
                                    boxHeight={"40px"}
                                    fontSize={"16px"}
                                    sizeText={item.value}
                                    selected={item.value === productAttributes[index]?.choice}
                                    onClick={() => this.onAttributeClick(index, item.value)}
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
              {identicalProductExist ? <div className='product-in-cart-bottom'>
                <button onClick={() => this.decreaseProductQuantity(indexOfIdentiticalProduct)}>
                  {'<'}
                </button>
                <span>{cartItems[indexOfIdentiticalProduct].quantity}</span>
                <button onClick={() => this.increaseProductQuantity(indexOfIdentiticalProduct)}>
                  {'>'}
                </button>

              </div>
                :
                <ButtonType1 onClick={() => this.addToCartClick()} buttonText="Add to cart" />
              }
              <div className='product-description' >{parse(productData.description)}</div>
              <Notification
                backgroundColor={"#5ECE7B"}
                message={this.state.notificationMessage}
                show={this.state.notificationMessage !== ''}
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
    setCartItems: (item) => dispatch(setCartItems(item))
  }
};

const mapStateToProps = state => ({
  selectedCurrency: state.navSlice.selectedCurrency,
  productAttributes: state.cartSlice.productAttributes,
  cartItems: state.cartSlice.cartItems,
  showCart: state.navSlice.showCart,

})


export const withRouter = (Component) => (props) => {
  const params = useParams();
  const navigate = useNavigate();

  return <Component {...props} params={params} navigate={navigate} />;
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PDP))

