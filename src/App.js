import React from 'react'
import { hide_CurrencyDropDown } from './redux/slices/navSlice'
import { hide_FilterDropDown } from './redux/slices/dataSlice'
import './App.css';
import { connect } from 'react-redux';
import Header from './components/Header';
import Landing from './pages/Landing';


class App extends React.Component {

  
  hideDropDown() {
 
      if (this.props.showCurrencyDropDown) {
        this.props.hide_CurrencyDropDown()
      }

    if (this.props.showFilterDropDown) {
      this.props.hide_FilterDropDown()
    }
  }

  render() {
  
    return (
      <div onClick={() => this.hideDropDown()} className='App'>
        <Header />
      <Landing/>
      </div>
    );
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    hide_CurrencyDropDown: () => dispatch(hide_CurrencyDropDown()),
    hide_FilterDropDown: () => dispatch(hide_FilterDropDown())
  }
};

const mapStateToProps = state => ({
  showCurrencyDropDown: state.navSlice.showCurrencyDropDown,
  showFilterDropDown: state.dataSlice.showFilterDropDown,
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
