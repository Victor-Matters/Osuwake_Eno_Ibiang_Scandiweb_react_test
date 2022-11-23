import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { hide_CurrencyDropDown } from './redux/slices/navSlice'
import './App.css';
import { connect } from 'react-redux';
import Header from './components/Header';
import PLP from './pages/PLP';
import PDP from './pages/PDP';
import CartPage from './pages/CartPage';

class App extends React.Component {


  hideDropDown() {

    if (this.props.showCurrencyDropDown) {
      this.props.hide_CurrencyDropDown()
    }


  }

  render() {

    return (
      <div onClick={() => this.hideDropDown()} className='App'>      
        <Header />
        <Routes>
          <Route path="/:categoryName" element={<PLP />} /> 
          <Route path="/:categoryName/:product_id" element={<PDP />} /> 
          <Route path="/:categoryName/cart-page" element={<CartPage />} /> 
          <Route
            path="/"
            element={<Navigate to="/:categoryName" replace />}
          />       
        </Routes>
      </div>
    );
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    hide_CurrencyDropDown: () => dispatch(hide_CurrencyDropDown()),
  }
};

const mapStateToProps = state => ({
  showCurrencyDropDown: state.navSlice.showCurrencyDropDown,
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
