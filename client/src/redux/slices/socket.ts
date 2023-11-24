
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {RootState} from '../store/index'

export type ConnectionState = WebSocket | null;

type SocketState = {
  connection: ConnectionState;
}

const initialState: SocketState = {
  connection: null,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    connect: (state, action: PayloadAction<WebSocket>) => {
      state.connection = action.payload;
    },
    disconnect: (state) => {
      if (state.connection) {
        state.connection.close();
        state.connection = null;
      }
    },
  },
});

export const { connect, disconnect } = socketSlice.actions;

export const SocketSelector = (state:RootState) => state.socket

export default socketSlice.reducer;
