import { configureStore } from '@reduxjs/toolkit'
import blogtorReducer from './Slice'

export default configureStore({
  reducer: {
    blogtorReducer: blogtorReducer
  },
})