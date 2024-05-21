import {createSlice} from "@reduxjs/toolkit";
import fetchAllBooks from "../reducers/bookListCreate";

const initialState = {
    books: [],
    isLoading:false,
    isError:'',
};

const BookListSlices = createSlice({
    name:'BookList',
    initialState,
    reducers:{
        setBooks:(state,action) => {
            state.books = action.payload;
        },
    },
    extraReducers:(builder) => {
        builder.addCase(fetchAllBooks.pending,(state,action) =>{
            state.books = []
            state.isError = ''
            state.isLoading = true
        });

        builder.addCase(fetchAllBooks.fulfilled, (state,action) =>{
            state.books = action.payload
            state.isLoading = false
        });

        builder.addCase(fetchAllBooks.rejected,(state,action) =>{
            state.isLoading = false
            state.isError = action.payload
        });
    },
});

const BookListReducer = BookListSlices.reducer;

export const {setBooks} = BookListSlices.actions;
export default BookListReducer;