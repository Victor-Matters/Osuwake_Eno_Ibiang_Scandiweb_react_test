import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  showFilterDropDown: false,
  focusedCategoryData: {},
  focusedProductId: '',
  loading: true,
  error: ''
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

    setLoading: (state, action) => {
      state.loading = action.payload
    },

    setError: (state, action) => {
      state.error = action.payload
    },



  }
})

export const {
  show_FilterDropDown,
  hide_FilterDropDown,
  setFocusedCategoryData,
  setFocusedProductId,
  setLoading,
  setError
} = dataSlice.actions
export default dataSlice.reducer