import React, { Component } from 'react'
import { connect } from 'react-redux';
import { HeaderContainer } from '../styles/Header'
import { nav_items } from '../constants'
import { gql } from '@apollo/client';
import { client } from '../index.js'
import { setFocusedTab, setSelectedCurrency, show_CurrencyDropDown, hide_CurrencyDropDown } from '../redux/slices/navSlice'
import { ReactComponent as BrandIcon } from "../assets/icon1.svg";
import { ReactComponent as EmptyCart } from "../assets/emptyCart.svg";
import { ReactComponent as ArrowUp } from "../assets/arrow_up.svg";
import { ReactComponent as ArrowDown } from "../assets/arrow_down.svg";


const GET_CURRENCIES = gql`
  query {
     currencies{    
      label, 
      symbol
      }
  }
`;


class Header extends Component {

    constructor() {
        super()
        this.state = {
            currencies: []
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


    componentDidMount() {
        this.getCurrencies()
    }

    dropDownClick(){
        if (this.props.showCurrencyDropDown){
            this.props.hide_CurrencyDropDown()
        }
        else{
            this.props.show_CurrencyDropDown()
        }
    
    }

    render() {

        const focusedTab = this.props.focusedTab
        const selectedCurrency = this.props.selectedCurrency
        const showCurrencyDropDown = this.props.showCurrencyDropDown
        const currencies = this.state.currencies

        

        return (
            <HeaderContainer >
                <div  className='left'>
                    <ul>
                        {nav_items.map((item, index) => {
                            return (
                                <li onClick={() => {
                                    this.props.navClick(item)
                                }} className={`nav-item ${item === focusedTab ? "active" : ""}`} key={index}>{item}</li>
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
                            <div onClick={()=>this.dropDownClick()} className='currency'>
                                <span>{currencies[selectedCurrency]?.symbol}</span>
                                {showCurrencyDropDown ? <ArrowUp /> : <ArrowDown />}
                            </div>
                            <div className={`dropdown-content ${showCurrencyDropDown ? "visible" : ""}`}>
                                {currencies.map((item, index) => {
                                    return (
                                        <a onClick={() => {
                                            this.props.setCurrency(index); 
                                            this.props.hide_CurrencyDropDown()
                                        }}
                                            key={index}>{item?.symbol} {item?.label}</a>
                                    )
                                })}

                            </div>
                        </div>
                        <div className='cart'>
                            <EmptyCart />
                        </div>
                    </div>
                </div>
            </HeaderContainer>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        navClick: (item) => dispatch(setFocusedTab(item)),
        setCurrency: (item) => dispatch(setSelectedCurrency(item)),
        show_CurrencyDropDown: () => dispatch(show_CurrencyDropDown()),
        hide_CurrencyDropDown: () => dispatch(hide_CurrencyDropDown())
    }
};

const mapStateToProps = state => ({
    focusedTab: state.navSlice.focusedTab,
    selectedCurrency: state.navSlice.selectedCurrency,
    showCurrencyDropDown: state.navSlice.showCurrencyDropDown,
})
export default connect(mapStateToProps, mapDispatchToProps)(Header)
