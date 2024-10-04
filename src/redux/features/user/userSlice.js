import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  user: null,
  token: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },

    setLoading: (state, action) => {
      state.loading =
        action.payload?.loading !== undefined
          ? action.payload?.loading
          : state.loading;
    },
    signOut: (state, action) => {
      state.user = {loading: false, user: null, token: null};
    },
  },
});

export const {getUser, setLoading, signOut, registerUser} = userSlice.actions;
export default userSlice.reducer;
