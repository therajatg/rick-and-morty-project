import { useEffect, useState, useMemo } from "react";
import { getAllCharacters } from "../helpers";
import { Pagination } from "../../components/pagination/Pagination";
import style from "./home.module.css";
import { useParams } from "react-router-dom";
import { AllCards } from "../../components/allCards/AllCards";

export const Home = () => {
  const [characterData, setCharacterData] = useState<{}[]>([]);
  const { pageNumber } = useParams();

  useEffect(() => {
    setAllcharacters(Number(pageNumber) ?? 1);
  }, [pageNumber]);

  const setAllcharacters = async (pageNumber: number) => {
    const response = await getAllCharacters(pageNumber);
    setCharacterData(response.results);
  };

  return (
    <div className={style.homeContainer}>
      <AllCards characterData={characterData} />
      <Pagination currentPageNumber={Number(pageNumber)} />
    </div>
  );
};
