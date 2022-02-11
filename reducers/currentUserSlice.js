import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

function busyWait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

async function simulateLoginRequest(url, {email, password}) {
  await busyWait(1000);
  if(email === 'testuser@testuser.com' && password === '1234567*aA') {
    return ({
      data: {
        id: nanoid(),
        username: 'testuser',
      }
    });
  }
  throw new Error('email or password is invalid');
}

async function simulateLogoutRequest(url, simulationResult) {
  await busyWait(800);
  if(!simulationResult) throw new Error('logout request failed');
}

export const login = createAsyncThunk(
  'currentUser/login',
  async (loginInfo) => {
    const response = await simulateLoginRequest('/login', loginInfo);
    return response.data;
  }
);

export const logout = createAsyncThunk(
  'currentUser/logout',
  async () => {
    await simulateLogoutRequest('/logout', true);
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
      .addCase(logout.fulfilled, (state, action) => {
        state.data = null;
      })
  }
});

export default currentUserSlice.reducer;
