import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  focusedTab: 0,
  selectedCurrency: 0,
  showCurrencyDropDown: false,
  showCart: false
}

const navSlice = createSlice({
  name: 'navSlice',
  initialState,
  reducers: {
    setFocusedTab: (state, action) => {
      state.focusedTab = action.payload
    },
     setSelectedCurrency: (state, action) => {
      state.selectedCurrency = action.payload
    },

     show_CurrencyDropDown: (state) => {
      state.showCurrencyDropDown = true
    },

    hide_CurrencyDropDown: (state) => {
      state.showCurrencyDropDown = false
    },

    setShowCart: (state, action) => {
      state.showCart = action.payload
    }
  }
})

export const { 
  setFocusedTab, 
  setSelectedCurrency, 
  show_CurrencyDropDown, 
  hide_CurrencyDropDown,
  setShowCart
} = navSlice.actions
export default navSlice.reducer