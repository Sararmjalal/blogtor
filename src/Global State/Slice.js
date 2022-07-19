import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'universal-cookie'
const cookies = new Cookies();

export const Slice = createSlice({
  name: 'blogtor',
  initialState: {
    current_user: {},
  },
  reducers: {
    setUser: (state, action) => {
      if (action.payload._id)
        state.current_user = action.payload
    },
    logOut: (state) => {
      state.current_user = {}
      cookies.remove(`ut`)
    },
  }
})


export const {setUser, logOut, setToast} = Slice.actions
export const selectUser = state => state.blogtorReducer.current_user
export default Slice.reducer