import { createSlice } from "@reduxjs/toolkit";
import {nav_items} from '../../constants'


const initialState = {
  focusedTab: nav_items[0]
}

const navSlice = createSlice({
  name: 'navSlice',
  initialState,
  reducers: {
    setFocusedTab: (state, action) => {
      state.focusedTab = action.payload
    }
  }
})

export const { setFocusedTab } = navSlice.actions
export default navSlice.reducer