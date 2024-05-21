import { createSlice } from '@reduxjs/toolkit'
import fetchAllCart from '../reducers/cartReducers'

const initialState = {
    cart: [],
    cartError: '',
    cartLoading: false,
}

const cartSlice = createSlice({
    initialState,
    name: 'Cart',
    reducers:{
        setCart: (state, action) => {
            state.cart = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllCart.pending, (state, action) =>{
            state.cart = [];
            state.cartError = '';
            state.cartLoading = true;
        });
        builder.addCase(fetchAllCart.fulfilled, (state, action) =>{
            state.cart = action.payload;
            state.cartLoading = false;
        });
        builder.addCase(fetchAllCart.rejected, (state, action) => {
            state.cartError = action.payload;
            state.cartLoading = false;
        });
    },
})

const cartReducer = cartSlice.reducer

export const { setCart } = cartSlice.actions
export default cartReducer
