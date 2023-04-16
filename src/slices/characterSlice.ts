import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCharacters: {},
  info: {},
  searchTerm: "",
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
    updateSearchTerm: (state, action) => {
      console.log("action.payload", action.payload);
      state.searchTerm = action.payload;
    },
  },
});

export const characterReducer = characterSlice.reducer;
export const { updateCharacterData, updateInfo, updateSearchTerm } =
  characterSlice.actions;
