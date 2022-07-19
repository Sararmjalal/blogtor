import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'universal-cookie'
import { toast } from "react-toastify";
const cookies = new Cookies();

export const Slice = createSlice({
  name: 'blogtor',
  initialState: {
    current_user: null,
  },
  reducers: {
    setUser: (state, action) => {
      if (action.payload._id)
        state.current_user = action.payload
    },
    logOut: (state) => {
      state.current_user = null
      cookies.remove(`ut`, { path: '/' })
      console.log("ba bye now")
      toast.info("You've logged out!")
      
    },
  }
})


export const {setUser, logOut, setToast} = Slice.actions
export const selectUser = state => state.blogtorReducer.current_user
export default Slice.reducer