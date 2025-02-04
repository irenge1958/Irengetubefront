import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentcomment: null,
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    addnew: (state,action) => {
      state.currentcomment.push(action.payload)
    },
  
    setmycom: (state, action) => {
        state.currentcomment=action.payload
  },
 
  },
})

// Action creators are generated for each case reducer function
export const {addnew, setmycom } = commentSlice.actions

export default commentSlice.reducer