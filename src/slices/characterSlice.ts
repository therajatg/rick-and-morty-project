import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCharacters: {},
  info: {},
};

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    updateCharacterData: (state, action) => {
      state.allCharacters = { ...state.allCharacters, ...action.payload };
    },
    updateInfo: (state, action) => {
      state.info = action.payload;
    },
  },
});

export const characterReducer = characterSlice.reducer;
export const { updateCharacterData, updateInfo } = characterSlice.actions;
