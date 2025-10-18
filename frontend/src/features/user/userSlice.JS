import { createSlice } from "@reduxjs/toolkit";
import { clearLocal, getUserFromLocal, setUserToLocal } from "../local/local.js";


export const userSlice = createSlice({
  name: 'userSlice',
  initialState:{
    user: getUserFromLocal()
  },
  reducers:{
    setUser: (state, action) => {
      state.user = action.payload;
      setUserToLocal(action.payload);
    },

    removeUser: (state) => {
      state.user = null;
      clearLocal();
    }
  }
})

export const {setUser, removeUser} = userSlice.actions