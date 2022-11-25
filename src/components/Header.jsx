import React, { Component } from 'react'
import { connect } from 'react-redux';
import { HeaderContainer } from '../styles/Header'
import { useNavigate, useParams } from "react-router-dom";
import { client } from '../index.js'
import {  setCartItems } from '../redux/slices/cartSlice'
import { setFocusedCategoryData, setLoading, setError } from '../redux/slices/dataSlice'
import { setFocusedTab, setSelectedCurrency, show_CurrencyDropDown, hide_CurrencyDropDown, setShowCart } from '../redux/slices/navSlice'
import { ReactComponent as BrandIcon } from "../assets/svg/icon1.svg";
import { ReactComponent as EmptyCart } from "../assets/svg/emptyCart.svg";
import { ReactComponent as ArrowUp } from "../assets/svg/arrow_up.svg";
import { ReactComponent as ArrowDown } from "../assets/svg/arrow_down.svg";
import { ReactComponent as PlusSquare } from "../assets/svg/plus_square.svg";
import { ReactComponent as MinusSquare } from "../assets/svg/minus_square.svg";
import ColorBox from './ColorBox';
import AttributeBox from './AttributeBox';
import ButtonType1 from './ButtonType1';
import ButtonType2 from './ButtonType2';
import { GET_CATEGORIES, GET_CATEGORY, GET_CURRENCIES } from '../graphql/queries';



class Header extends Component {

    constructor() {
        super()
        this.state = {
            currencies: [],
            categories: [],

        }
    }

    getCurrencies = async () => {
        await client.query({
            query: GET_CURRENCIES
        }).then((result) => {
            let _currencies = result.data.currencies
            this.setState({ currencies: _currencies })
            this.props.selectedCurrency === null && this.props.setCurrency(0)
        })
    }

    getCategories = async () => {
        await client.query({
            query: GET_CATEGORIES
        }).then((result) => {
            let _categories = result.data.categories

            this.setState({ categories: _categories })

        })
    }


    componentDidMount() {
        this.getCurrencies()
        this.getCategories()

    }

    getCategoryByName = async (categoryName) => {
        this.props.setLoading(true)
        await client.query({
            query: GET_CATEGORY(categoryName)
        }).then((result) => {
            let categoryData = result.data.category
            this.props.setFocusedCategoryData(categoryData)
            this.props.setLoading(false)

        }).catch(err => {
            this.props.setError(err?.message)
        })
    }

    dropDownClick() {
        if (this.props.showCurrencyDropDown) {
            this.props.hide_CurrencyDropDown()
        }
        else {
            this.props.show_CurrencyDropDown()
        }

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


    decreaseProductQuantity(index) {
        let temp_cartItems = [...this.props.cartItems];
        let temp_product = { ...this.props.cartItems[index] };

        if (temp_product.quantity === 1) {
            temp_cartItems.splice(index, 1);
            this.props.setCartItems(temp_cartItems)
           
        }
        else {
            temp_product.quantity = temp_product.quantity - 1
            temp_cartItems[index] = temp_product
            this.props.setCartItems(temp_cartItems)
        }
    }

    increaseProductQuantity(index) {
        let temp_cartItems = [...this.props.cartItems];
        let temp_product = { ...this.props.cartItems[index] };

        temp_product.quantity = temp_product.quantity + 1

        temp_cartItems[index] = temp_product
        this.props.setCartItems(temp_cartItems)
    }


    onViewBagClick = () => {
        
    this.props.setShowCart(!this.props.showCart);
     this.props.navigate(this.props.focusedTab+'/cart-page')
    }

    onCheckoutClick=()=>{
        console.log(this.props.cartItems)
        alert('Dear Sir/Madam, No action was specified for the checkout button in the Test instructions. I have however logged out to the console the cart items the user is supposed to be checking out with.')
    }

     hideCartOverlay=()=>{
         if (this.props.showCart) {
             this.props.setShowCart(false)
         }
    }


    render() {

        const selectedCurrency = this.props.selectedCurrency
        const showCurrencyDropDown = this.props.showCurrencyDropDown
        const focusedTab = this.props.focusedTab
        const showCart = this.props.showCart
        const cartItems = this.props.cartItems

        const { categories, currencies } = this.state

        //   console.log(cartItems)

        let totalQuantityOfProducts = 0;
        let totalPrice = 0;

        for (let i = 0; i < cartItems.length; i++) {
            totalQuantityOfProducts += cartItems[i].quantity
            totalPrice += cartItems[i].quantity * cartItems[i].prices[selectedCurrency].amount
        }



        return (
            <HeaderContainer  >
                <div className='left' onClick={() => this.hideCartOverlay()}>
                    <ul>
                        {categories.map((item, index) => {
                            return (
                                <li key={index} onClick={() => {
                                    this.props.navigate(item.name);
                                    this.props.setFocusedTab(item.name);
                                    this.getCategoryByName(item.name)
                                }} className={`nav-item ${item.name === focusedTab ? "active" : ""}`}>{item.name}</li>
                            )
                        })}
                    </ul>
                </div>
                <div className='center' onClick={() => this.hideCartOverlay()}>
                    <BrandIcon />
                </div>
                <div  className='right'>
                    <div className='items'>
                        <div onClick={() => this.hideCartOverlay()} className='currency-dropdown'>
                            <div onClick={() => this.dropDownClick()} className='currency'>
                                <span>{currencies[selectedCurrency]?.symbol}</span>
                                {showCurrencyDropDown ? <ArrowUp /> : <ArrowDown />}
                            </div>
                            <div className={`dropdown-content ${showCurrencyDropDown ? "visible" : ""}`}>
                                {currencies.map((item, index) => {
                                    return (
                                        <div className={index === selectedCurrency ? 'highlighted' : undefined} onClick={() => {
                                            this.props.setCurrency(index);
                                            this.props.hide_CurrencyDropDown()
                                        }}
                                            key={index}>{item?.symbol} {item?.label}</div>
                                    )
                                })}

                            </div>
                        </div>
                        <div className='cart'>
                            <EmptyCart className='cart-icon' onClick={() => this.props.setShowCart(!showCart)} />
                            {this.props.cartItems.length > 0 && <div onClick={() => this.props.setShowCart(!showCart)} className='total-tag'>{totalQuantityOfProducts}</div>}
                            <div className={`dropdown-content-cart ${showCart ? "visible" : ""}`}>
                                {cartItems.length > 0 ? <React.Fragment>
                                    <div className='header'>
                                        <p >My Bag <span>{totalQuantityOfProducts} items</span></p>
                                        <p onClick={()=>this.props.setCartItems([])} className='empty'>Click to Empty Bag</p>
                                    </div>
                                    <div className='items-container'>
                                        {cartItems.map((product, product_index) => {
                                            return (
                                                <div key={product_index} className='cart-item'>
                                                    <section className='left'>
                                                        <section className='attributes'>
                                                            <p className='brand'>{product.brand}</p>
                                                            <p className='name'>{product.name}</p>
                                                            <p className='amount'>
                                                                {product.prices[selectedCurrency].currency.symbol + " " + product.prices[selectedCurrency].amount}
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
                                                                                                        boxSize={"77%"}
                                                                                                        boxColor={item.value}
                                                                                                        selected={i === product.attributes[index].choiceIndex}
                                                                                                        isCursor={false}
                                                                                                      //  onClick={() => this.onAttributeClick(index, i, product_index)}
                                                                                                    />
                                                                                                    :
                                                                                                    <AttributeBox key={i}
                                                                                                        boxHeight={"20px"}
                                                                                                        fontSize={"13px"}
                                                                                                        sizeText={item.value}
                                                                                                        selected={i === product.attributes[index].choiceIndex}
                                                                                                        isCursor={false}
                                                                                                        //  onClick={() => this.onAttributeClick(index, i, product_index)}
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
                                                        <section className='quantity-buttons'>
                                                            <PlusSquare className='button' onClick={() => this.increaseProductQuantity(product_index)} />
                                                            {product.quantity}
                                                            <MinusSquare className='button' onClick={() => this.decreaseProductQuantity(product_index)} />
                                                        </section>
                                                    </section>
                                                    <section className='right'>
                                                        <img alt={product.name} src={product.gallery[0]} />
                                                    </section>
                                                </div>
                                            )
                                        })}

                                    </div>
                                    <div className='buttons-container'>
                                        <div className='total-container'>
                                            <p className='text'>Total</p>
                                            <p className='value'>{currencies[selectedCurrency]?.symbol}{totalPrice.toFixed(2)}</p>
                                        </div>
                                        <div className='bottons-row'>
                                            <div className='button-container'>
                                                <ButtonType2
                                                    onClick={() => this.onViewBagClick()}
                                                    buttonText="VIEW BAG"
                                                />
                                            </div>
                                            <div className='button-container'>
                                                <ButtonType1
                                                    fontSize="14px"
                                                    onClick={() => this.onCheckoutClick()}
                                                    buttonText="CHECKOUT"
                                                />
                                            </div>
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
                                                    this.props.setShowCart(!showCart);
                                                    this.props.navigate('/')
                                                }}
                                                buttonText="Start Shopping"
                                            />
                                        </div>

                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </HeaderContainer>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrency: (item) => dispatch(setSelectedCurrency(item)),
        setFocusedTab: (item) => dispatch(setFocusedTab(item)),
        show_CurrencyDropDown: () => dispatch(show_CurrencyDropDown()),
        hide_CurrencyDropDown: () => dispatch(hide_CurrencyDropDown()),
        setFocusedCategoryData: (item) => dispatch(setFocusedCategoryData(item)),
        setLoading: (item) => dispatch(setLoading(item)),
        setError: (item) => dispatch(setError(item)),
        setShowCart: (item) => dispatch(setShowCart(item)),
        setCartItems: (item) => dispatch(setCartItems(item))
    }
};

const mapStateToProps = state => ({
    focusedTab: state.navSlice.focusedTab,
    selectedCurrency: state.navSlice.selectedCurrency,
    showCurrencyDropDown: state.navSlice.showCurrencyDropDown,
    focusedCategoryData: state.dataSlice.focusedCategoryData,
    loading: state.dataSlice.loading,
    error: state.dataSlice.error,
    cartItems: state.cartSlice.cartItems,
    showCart: state.navSlice.showCart,


})

export const withRouter = (Component) => (props) => {
    const params = useParams();
    const navigate = useNavigate();
    return <Component {...props} params={params} navigate={navigate} />;
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
