import React, { Component } from 'react'
import { connect } from 'react-redux';
import { HeaderContainer } from '../styles/Header'
import { gql } from '@apollo/client';
import { useNavigate, useParams } from "react-router-dom";
import { client } from '../index.js'
import { setProductAttributes, setCartItems } from '../redux/slices/cartSlice'
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



const GET_CURRENCIES = gql`
  query {
     currencies{    
      label, 
      symbol
      }
  }
`;

const GET_CATEGORIES = gql`
  query {
     categories{    
      name
      }
  }
`;

const GET_CATEGORY = (categoryName) => gql`
query  {
  category(input: {title: "${categoryName}"}) {
    name,
    products{id, name, inStock, gallery, prices{currency{label, symbol} amount}}
  }
}
`;


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

    onAttributeClick() {

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
            <HeaderContainer >
                <div className='left'>
                    <ul>
                        {categories.map((item, index) => {
                            return (
                                <li onClick={() => {
                                    this.props.navigate(item.name);
                                    this.props.setFocusedTab(item.name);
                                    this.getCategoryByName(item.name)
                                }} className={`nav-item ${item.name === focusedTab ? "active" : ""}`} key={index}>{item.name}</li>
                            )
                        })}
                    </ul>
                </div>
                <div className='center'>
                    <BrandIcon />
                </div>
                <div className='right'>
                    <div className='items'>
                        <div className='currency-dropdown'>
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
                            <EmptyCart onClick={() => this.props.setShowCart(!showCart)} />
                            {this.props.cartItems.length > 0 && <div onClick={() => this.props.setShowCart(!showCart)} className='total-tag'>{totalQuantityOfProducts}</div>}
                            <div className={`dropdown-content-cart ${showCart ? "visible" : ""}`}>
                                {cartItems.length > 0 ? <React.Fragment>
                                    <div className='header'>
                                        <p >My Bag <span>{totalQuantityOfProducts} items</span></p>
                                    </div>
                                    <div className='items-container'>
                                        {cartItems.map((product, index) => {
                                            return (
                                                <div key={index} className='cart-item'>
                                                    <section className='left'>
                                                        <section className='attributes'>
                                                            <p className='name'>{product.name}</p>
                                                            <p className='amount'>
                                                                {product.prices[selectedCurrency].currency.symbol + " " + product.prices[selectedCurrency].amount}
                                                            </p>
                                                            {product.attributes.map((attribute, index) => {
                                                                return (
                                                                    <div className='attributes-container'>
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
                                                                                                        boxColor={item.value}
                                                                                                        selected={item.value === product.choices[index]?.choice}
                                                                                                        onClick={() => this.onAttributeClick(index, item.value)}
                                                                                                    />
                                                                                                    :
                                                                                                    <AttributeBox key={i}
                                                                                                        boxHeight={"20px"}
                                                                                                        fontSize={"13px"}
                                                                                                        sizeText={item.value}
                                                                                                        selected={item.value === product.choices[index]?.choice}
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
                                                        </section>
                                                        <section className='quantity-buttons'>
                                                            <PlusSquare onClick={() => this.increaseProductQuantity(index)} />
                                                            {product.quantity}
                                                            <MinusSquare onClick={() => this.decreaseProductQuantity(index)} />
                                                        </section>
                                                    </section>
                                                    <section className='right'>
                                                        <img alt='item-image' src={product.gallery[0]} />
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
                                                    onClick={() => {
                                                        this.props.setShowCart(!showCart);
                                                        this.props.navigate('/')
                                                    }}
                                                    buttonText="VIEW BAG"
                                                />
                                            </div>
                                            <div className='button-container'>
                                                <ButtonType1
                                                fontSize="14px"
                                                    onClick={() => {
                                                        this.props.setShowCart(!showCart);
                                                        this.props.navigate('/')
                                                    }}
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
