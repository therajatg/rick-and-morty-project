import { useEffect, useState } from "react";
import style from "./characterDetails.module.css";
import { useParams } from "react-router-dom";
import { getCharacterData } from "../helpers";

interface selectedCharacterType {
  id: number;
  name: string;
  image: string;
  origin: string;
  location: string;
  dimension: string;
  totalResidents: number;
  episodeNames: string[];
}

export const CharacterDetails = () => {
  const { pageNumber, characterId } = useParams();
  const [selectedCharacter, setSelectedCharacter] =
    useState<selectedCharacterType>({
      id: 0,
      name: "",
      image: "",
      origin: "",
      location: "",
      dimension: "",
      totalResidents: 0,
      episodeNames: [],
    });

  useEffect(() => {
    getCharacterDetails();
  }, []);

  const getCharacterDetails = async () => {
    const response = await getCharacterData(
      Number(pageNumber),
      Number(characterId)
    );
    setSelectedCharacter((prev: selectedCharacterType) => {
      return { ...prev, ...response };
    });
  };

  return (
    <div className={style.detailsContainer}>
      <div className={style.imageDiv}>
        <img
          className={style.image}
          src={selectedCharacter.image}
          alt="Selected Character"
        ></img>
        <h1>{selectedCharacter.name}</h1>
      </div>
      <div className={style.characterInfo}>
        <p>Character Information</p>
        <table className={style.table}>
          <tbody>
            <tr>
              <td>Origin</td>
              <td>{selectedCharacter?.origin}</td>
            </tr>
            <tr>
              <td>Location</td>
              <td>{selectedCharacter?.location}</td>
            </tr>
            <tr>
              <td>Dimension</td>
              <td>{selectedCharacter?.dimension}</td>
            </tr>
            <tr>
              <td>Total Residents</td>
              <td>{selectedCharacter?.totalResidents}</td>
            </tr>
            <tr>
              <td>Chapters Featured In</td>
              <td>
                {selectedCharacter.episodeNames.map((name: string) => (
                  <div key={selectedCharacter.id}>{name}</div>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
