import {configureStore} from '@reduxjs/toolkit'
import BookListReducer from './slices/BookLIstSlices'
import cartReducer from './slices/CartSlices'

const rootReducer = {
    booklist:BookListReducer,
    cart:cartReducer,
}

const store = configureStore({
    reducer:rootReducer,
})

export default store 