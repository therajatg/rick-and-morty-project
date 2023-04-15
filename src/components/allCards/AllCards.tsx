import { CharacterCard } from "../../components/characterCard/CharacterCard";
import style from "./allCards.module.css";

interface Props {
  characterData: {}[];
}

export const AllCards = ({ characterData }: Props) => {
  return (
    <div className={style.mainContainer}>
      {characterData.map((character: any) => (
        <CharacterCard
          key={character.id}
          name={character.name}
          species={character.species}
          gender={character.gender}
          imageSource={character.image}
        />
      ))}
    </div>
  );
};
