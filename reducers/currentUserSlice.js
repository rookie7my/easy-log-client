import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

function simulateLoginRequest(url, {email, password}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(email === 'testuser@testuser.com' && password === '1234567*aA') {
        resolve({
          data: {
            id: nanoid(),
            username: 'testuser',
          }
        });
      } else {
        reject('email or password is invalid');
      }
    }, 1000);
  });
}

export const login = createAsyncThunk(
  'currentUser/login',
  async (loginInfo) => {
    const response = await simulateLoginRequest('/login', loginInfo);
    return response.data;
  }
);

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.data = action.payload;
      })
  }
});

export default currentUserSlice.reducer;
