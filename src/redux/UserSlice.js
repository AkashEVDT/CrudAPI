import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './api'; // Import the API functions

// Define an async thunk to fetch users
export const fetchUsersAsync = createAsyncThunk('user/fetchUsers', async () => {
  try {
    const users = await api.getUsers();
    return users;
  } catch (error) {
    throw error;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: [],
    status: 'idle', // 'idle', 'loading', 'succeeded', or 'failed'
    error: null,
  },
  reducers: {
    addUser(state, action) {
      state.data.push(action.payload);
    },
    updateUser(state, action) {
      const { index, ...userData } = action.payload;
      state.data[index] = { ...state.data[index], ...userData };
    },
    deleteUser(state, action) {
      state.data.splice(action.payload, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;