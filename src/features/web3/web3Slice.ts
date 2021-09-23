import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface CounterState {
  isConnected: boolean,
  userAddress: string,
  chainId: number
}

const initialState: CounterState = {
  isConnected: false,
  userAddress: '',
  chainId: -1
};

export const web3Slice = createSlice({
  name: 'web3',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    SET_USER_ADDRESS: (state, action: PayloadAction<string>) => {
      state.userAddress = action.payload;
    },
    SET_IS_CONNECTED: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload
    }
  },
});

export const { SET_USER_ADDRESS, SET_IS_CONNECTED } = web3Slice.actions;

export const getUserAddress = (state: RootState) => state.web3.userAddress;
export const getIsConnected = (state: RootState) => state.web3.isConnected;

export default web3Slice.reducer;
