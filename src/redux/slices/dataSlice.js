import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  showFilterDropDown: false,
  focusedCategoryData: {},
  focusedProductId: '',

}

const dataSlice = createSlice({
  name: 'dataSlice',
  initialState,
  reducers: {
    show_FilterDropDown: (state) => {
      state.showFilterDropDown = true
    },

    hide_FilterDropDown: (state) => {
      state.showFilterDropDown = false
    },

    setFocusedCategoryData: (state, action) => {
      state.focusedCategoryData = action.payload
    },

    setFocusedProductId: (state, action) => {
      state.focusedProductId = action.payload
    },


  }
})

export const { show_FilterDropDown, hide_FilterDropDown, setFocusedCategoryData, setFocusedProductId} = dataSlice.actions
export default dataSlice.reducer