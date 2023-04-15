import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../store";
import { Dispatch, SetStateAction } from "react";
import { updateCharacterData, updateInfo } from "../slices/characterSlice";

export const getAllCharacters = async (pageNumber: number) => {
  const allCharactersFromRedux: any = store.getState().character.allCharacters;
  if (pageNumber in allCharactersFromRedux) {
    return allCharactersFromRedux[pageNumber];
  } else {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/?page=${pageNumber}`
    );
    store.dispatch(
      updateCharacterData({ [pageNumber]: response.data.results })
    );
    store.dispatch(updateInfo(response.data.info));
    return response.data;
  }
};

export const getPagesArrayToDisplay = (currentPageNumber: number) => {
  const infoFromRedux: any = store.getState().character.info;
  let totalPagesArray = [];
  for (let i = 1; i <= infoFromRedux.pages; i++) {
    totalPagesArray.push(i);
  }
  const totalPagesArrayLength = totalPagesArray.length;
  if (currentPageNumber > 4 && currentPageNumber < totalPagesArrayLength - 4) {
    return totalPagesArray.slice(currentPageNumber - 5, currentPageNumber + 5);
  } else if (currentPageNumber < 5) {
    return totalPagesArray.slice(0, 10);
  } else if (currentPageNumber > totalPagesArrayLength - 5) {
    return totalPagesArray.slice(
      totalPagesArrayLength - 10,
      totalPagesArrayLength
    );
  } else {
    return totalPagesArray.slice(0, 10);
  }
};
