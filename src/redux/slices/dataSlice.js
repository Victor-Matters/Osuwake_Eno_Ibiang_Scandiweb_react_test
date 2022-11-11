import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  showFilterDropDown: false
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
    }

  }
})

export const { show_FilterDropDown, hide_FilterDropDown} = dataSlice.actions
export default dataSlice.reducer