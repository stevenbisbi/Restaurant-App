import { createSlice } from '@reduxjs/toolkit';

const tokenFromStorage = localStorage.getItem('token') || sessionStorage.getItem('token') || null;

const initialState = {
  token: tokenFromStorage,
  firstName: localStorage.getItem('firstName') || sessionStorage.getItem('firstName') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, firstName, rememberMe } = action.payload;
      state.token = token;
      state.firstName = firstName;
      if (rememberMe) {
        localStorage.setItem('token', token);
        localStorage.setItem('firstName', firstName);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('firstName');
      } else {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('firstName', firstName);
        localStorage.removeItem('token');
        localStorage.removeItem('firstName');
      }
    },
    logout: (state) => {
      state.token = null;
      state.firstName = null;
      localStorage.removeItem('token');
      localStorage.removeItem('firstName');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('firstName');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
