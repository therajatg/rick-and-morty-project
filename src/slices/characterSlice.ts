import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCharacters: {},
};

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    updateCharacterData: (state, action) => {
      state.allCharacters = action.payload;
    },
  },
});

export const characterReducer = characterSlice.reducer;
export const { updateCharacterData } = characterSlice.actions;
