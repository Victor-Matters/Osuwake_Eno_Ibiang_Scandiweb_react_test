import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'
import navReducer from '../redux/slices/navSlice'
import dataReducer from '../redux/slices/dataSlice'
import thunk from 'redux-thunk'

const reducers = combineReducers({
  navSlice: navReducer,
  dataSlice: dataReducer,

});

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);


const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});

export default store;