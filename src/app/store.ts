import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import web3Reducer from '../features/web3/counterSlice';

export const store = configureStore({
  reducer: {
    web3: web3Reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
