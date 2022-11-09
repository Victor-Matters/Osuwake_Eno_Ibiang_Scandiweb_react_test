import React, { Component } from 'react'
import { connect } from 'react-redux';
import { HeaderContainer } from '../styles/Header'
import { nav_items } from '../constants'
import { setFocusedTab } from '../redux/slices/navSlice'
import { ReactComponent as BrandIcon } from "../assets/icon1.svg";
import { ReactComponent as EmptyCart } from "../assets/emptyCart.svg";
import { ReactComponent as DollarSign } from "../assets/dollarSign.svg";
import { ReactComponent as ArrowDown } from "../assets/arrow_down.svg";




class Header extends Component {

    render() {
        const focusedTab = this.props.focusedTab

        return (
            <HeaderContainer>
                <div className='left'>
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
                        <div className='item'>
                            <DollarSign />
                            <ArrowDown />
                        </div>
                        <div className='item'>
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
        navClick: (item) => dispatch(setFocusedTab(item))
    }


};

const mapStateToProps = state => ({
    focusedTab: state.navSlice.focusedTab,
})
export default connect(mapStateToProps, mapDispatchToProps)(Header)
