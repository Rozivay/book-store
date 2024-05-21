import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api'
import { setCart } from '../slices/CartSlices'

const fetchAllCart = createAsyncThunk('/cart/fetchAll', async (payload, thunkApi) => {
    try {
        const response = await api.getCart()
        return response.data;
    } catch (Err) {
        return thunkApi.rejectWithValue('Download Failed')
    }
});

const createItem = (book, item = {}, quantity) => {
    const { total = 0, count = 0 } = item
    return {
        title: book.title,
        count: count + quantity,
        total: total + book.price * quantity,
        id: book.id
    }
}

const addBookToCart = createAsyncThunk('cart/addItem', async (payload, thunkApi) => {
    try {
        const state = thunkApi.getState()
        const { cart } = state.cart;
        const { books } = state.booklist;
        const cartItem = cart.find((el) => el.id === payload)
        const book = books.find((el) => el.id === payload)

        const newItem = createItem(book, cartItem, 1)
        console.log(newItem, cartItem,);

        if (cartItem) {
            // const newItem = {
            //     ...cartItem,
            //     total: cartItem.total + book.price,
            //     count: cartItem.count + 1,
            // }

            await api.editCartItem(newItem);
            const newCartItems = cart.map((item) => item.id === payload ? newItem : item)
            return thunkApi.dispatch(setCart(newCartItems));
        }

        // const newItem = {
        //     id: book.id,
        //     title: book.title,
        //     total: book.price,
        //     count: 1
        // }

        const newCartItems = [...cart, newItem]
        await api.addToCart(newItem)
        return thunkApi.dispatch(setCart(newCartItems))
    } catch (Err) {
        console.log(Err)
        return thunkApi.rejectWithValue('Failed to add book')

    }
})

const removeToCart = createAsyncThunk('cart/addItem', async (payload, thunkApi) => {
    try {
        const state = thunkApi.getState()
        const { cart } = state.cart;
        const { books } = state.booklist;
        const cartItem = cart.find((el) => el.id === payload)
        const book = books.find((el) => el.id === payload)

        const newItem = createItem(book, cartItem, -1)
        console.log(newItem, cartItem,);

        if (cartItem.count > 1) {
            await api.editCartItem(newItem);
            const newCartItems = cart.map((item) => item.id === payload ? newItem : item)
            return thunkApi.dispatch(setCart(newCartItems));
        }

        const newCartItems = cart.filter((el) => el.id !== payload)
        await api.deleteCartItem(payload)
        return thunkApi.dispatch(setCart(newCartItems))
    } catch (Err) {
        console.log(Err)
        return thunkApi.rejectWithValue('Failed to add book')
    }
})

const removeFromCart = createAsyncThunk('cart/removeItem',async (payload, thunkApi) => {
        try {
            const state = thunkApi.getState();
            const { cart } = state.cart;
            await api.deleteCartItem(payload);
            const newCartItems = cart.filter((item) => item.id !== payload);
            return thunkApi.dispatch(setCart(newCartItems));
        } catch (Err) {
            return thunkApi.rejectWithValue('Failed to remove item from cart');
        }
    }
);

export default fetchAllCart;

export { addBookToCart, removeToCart,removeFromCart }