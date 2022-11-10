import { createSlice } from "@reduxjs/toolkit";
import {nav_items} from '../../constants'


const initialState = {
  focusedTab: nav_items[0],
  selectedCurrency: 0,
  showCurrencyDropDown: false
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
    }
  }
})

export const { setFocusedTab, setSelectedCurrency, show_CurrencyDropDown, hide_CurrencyDropDown } = navSlice.actions
export default navSlice.reducer