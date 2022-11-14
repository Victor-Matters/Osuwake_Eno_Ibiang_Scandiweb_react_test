import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cartItems: [],
    productAttributes: []
}

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        setCartItems: (state, action) => {
            state.cartItems = action.payload
        },

        setProductAttributes: (state, action) => {
            state.productAttributes = action.payload
        },

    }
})

export const { setCartItems, setProductAttributes } = cartSlice.actions
export default cartSlice.reducer