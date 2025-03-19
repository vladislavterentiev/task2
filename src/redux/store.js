import { configureStore } from '@reduxjs/toolkit';
import plannerReducer from './reducers';
import ApiService from '../services/ApiService';

const store = configureStore({
  reducer: {
    planner: plannerReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: ApiService,
      },
    }),
  devTools: process.env.NODE_ENV !== 'production', 
});

export default store;