import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../store";
import { Dispatch, SetStateAction } from "react";

// const dispatch = useDispatch();
// const { allCharacters } = useSelector((store: any) => store.auth);

console.log("state", store.getState());
console.log(store.dispatch);

export const getAllCharacters = async (pageNumber: number) => {
  const response = await axios.get(
    `https://rickandmortyapi.com/api/character/?page=${pageNumber}`
  );
  return response.data;
};

export const getPagesArrayToDisplay = (
  currentPageNumber: number,
  totalPagesArray: number[],
  setPagesArray: Dispatch<SetStateAction<number[]>>
) => {
  const totalPagesArrayLength = totalPagesArray.length;
  if (currentPageNumber > 4 && currentPageNumber < totalPagesArrayLength - 4) {
    setPagesArray(
      totalPagesArray.slice(currentPageNumber - 5, currentPageNumber + 5)
    );
  } else if (currentPageNumber < 5) {
    const newArray = totalPagesArray.slice(0, 10);
    setPagesArray(newArray);
  } else if (currentPageNumber > totalPagesArrayLength - 5) {
    const newArray = totalPagesArray.slice(
      totalPagesArrayLength - 10,
      totalPagesArrayLength
    );
    setPagesArray(newArray);
  } else {
    const newArray = totalPagesArray.slice(0, 10);
    setPagesArray(newArray);
  }
};
