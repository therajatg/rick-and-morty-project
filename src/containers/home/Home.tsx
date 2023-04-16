import { useEffect, useState } from "react";
import { getAllCharacters } from "../helpers";
import { Pagination, AllCards } from "../../components/index";
import style from "./home.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const Home = () => {
  const [characterData, setCharacterData] = useState<{}[]>([]);
  const { pageNumber } = useParams();
  const { searchTerm } = useSelector((store: any) => store.character);

  useEffect(() => {
    setAllCharacters(Number(pageNumber) ?? 1);
  }, [pageNumber, searchTerm]);

  const setAllCharacters = async (pageNumber: number) => {
    const response = await getAllCharacters(pageNumber);
    setCharacterData(response);
  };

  return (
    <div className={style.homeContainer}>
      <AllCards characterData={characterData} />
      <Pagination currentPageNumber={Number(pageNumber)} />
    </div>
  );
};
