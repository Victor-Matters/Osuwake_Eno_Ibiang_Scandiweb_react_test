import React, { Component } from 'react'
import { connect } from 'react-redux';
import { HeaderContainer } from '../styles/Header'
import { gql } from '@apollo/client';
import { useNavigate, useParams } from "react-router-dom";
import { client } from '../index.js'
import { setFocusedCategoryData, setLoading, setError } from '../redux/slices/dataSlice'
import { setFocusedTab, setSelectedCurrency, show_CurrencyDropDown, hide_CurrencyDropDown, setShowCart } from '../redux/slices/navSlice'
import { ReactComponent as BrandIcon } from "../assets/svg/icon1.svg";
import { ReactComponent as EmptyCart } from "../assets/svg/emptyCart.svg";
import { ReactComponent as ArrowUp } from "../assets/svg/arrow_up.svg";
import { ReactComponent as ArrowDown } from "../assets/svg/arrow_down.svg";


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

    render() {

      
        const selectedCurrency = this.props.selectedCurrency
        const showCurrencyDropDown = this.props.showCurrencyDropDown
        const focusedTab = this.props.focusedTab
        const showCart = this.props.showCart
        const cartItems = this.props.cartItems

        const {categories, currencies} = this.state
 
        let totalQuantityOfProducts = 0;
        for(let i=0; i <cartItems.length;i++){
            totalQuantityOfProducts += cartItems[i].quantity
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
                            <div className={`dropdown-content ${showCart ? "visible" : ""}`}>
                               

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
        setShowCart: (item) => dispatch(setShowCart(item))
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
