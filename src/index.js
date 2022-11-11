import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import './App.css'
import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/client';
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));

var junior_react_endpoint = 'http://localhost:4000/'

export const client = new ApolloClient({
  cache: new InMemoryCache({}),
  uri: junior_react_endpoint
});

root.render(

  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
        <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>

);

