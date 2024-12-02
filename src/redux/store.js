
import {configureStore} from "@reduxjs/toolkit";
import dataSlice from './usersSlice';

const store = configureStore({
    reducer : {
        dataSlice
    }
})

export default store;