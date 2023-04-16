import axios from "axios";
// import axios from "./node_modules/axios/dist/axios.min.js";
import { store } from "../store";
import { updateCharacterData, updateInfo } from "../slices/characterSlice";

export const getAllCharacters = async (pageNumber: number) => {
  pageNumber = isNaN(pageNumber) ? 1 : pageNumber;

  const {
    allCharacters: allCharactersFromRedux,
    searchTerm: searchTermFromRedux,
  }: any = store.getState().character;

  if (searchTermFromRedux.trim() !== "") {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${searchTermFromRedux}`
      );
      store.dispatch(updateInfo(response.data.info));
      console.log("search response", response);
      return response.data.results;
    } catch {
      return [];
    }
  } else {
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
      return response.data.results;
    }
  }
};

export const getPagesArrayToDisplay = (
  currentPageNumber: number,
  totalPages: number
) => {
  let totalPagesArray = [];
  for (let i = 1; i <= totalPages; i++) {
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

export const getCharacterData = async (
  pageNumber: number,
  characterId: number
) => {
  pageNumber = isNaN(pageNumber) ? 1 : pageNumber;
  const allCharactersFromRedux: any = store.getState().character.allCharacters;
  let selectedCharacter;
  if (pageNumber in allCharactersFromRedux) {
    selectedCharacter = allCharactersFromRedux[pageNumber].find(
      (character: any) => character.id === characterId
    );
  } else {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/?page=${pageNumber}`
    );
    store.dispatch(
      updateCharacterData({ [pageNumber]: response.data.results })
    );
    selectedCharacter = response.data.results.find(
      (character: any) => character.id === characterId
    );
  }

  const { id, name, image, origin, location } = selectedCharacter;
  const locationDetails = await fetchLocationDetails(
    selectedCharacter?.location?.url
  );
  const dimension = locationDetails.dimension;
  const totalResidents = locationDetails.residents.length;
  const episodeNames = await fetchEpisodes(selectedCharacter?.episode);

  return {
    id,
    name,
    image,
    origin: origin.name,
    location: location.name,
    dimension,
    totalResidents,
    episodeNames,
  };
};

const fetchLocationDetails = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log("343233", error);
    return {
      dimension: "Dimension Not Found",
      residents: { length: "No Residents Found" },
    };
  }
};

const fetchEpisodes = async (urls: []) => {
  const promises = urls.map((url) => axios.get(url));
  const results = await Promise.allSettled(promises);

  const data = results
    .filter((result) => result.status === "fulfilled")
    .map((result: any) => result.value.data.name);

  return data;
};

export const getSearchData = async (
  searchTerm: string,
  setSearchResults: ([]) => void
) => {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/?name=${searchTerm}`
    );
    setSearchResults(response.data.results);
  } catch {
    setSearchResults([]);
  }
};
