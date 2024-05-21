import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api'

const fetchAllBooks = createAsyncThunk('/books/fetchAll',async (payload,thunkApi) =>{
    try {
        const response = await api.getBooks()
        return response.data;
    }catch(Err) {
        return thunkApi.rejectWithValue('Download Failed')
    }
});

export default fetchAllBooks;