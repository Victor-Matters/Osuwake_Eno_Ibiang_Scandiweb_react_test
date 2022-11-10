import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  focusedCategory: '',
  showFilterDropDown: false
}

const dataSlice = createSlice({
  name: 'dataSlice',
  initialState,
  reducers: {
    setFocusedCategory: (state, action) => {
      state.focusedCategory = action.payload
    },
    show_FilterDropDown: (state) => {
      state.showFilterDropDown = true
    },

    hide_FilterDropDown: (state) => {
      state.showFilterDropDown = false
    }

  }
})

export const { setFocusedCategory, show_FilterDropDown, hide_FilterDropDown} = dataSlice.actions
export default dataSlice.reducer