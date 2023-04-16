import { CharacterCard } from "../../components/index";

import style from "./allCards.module.css";

interface Props {
  characterData: {}[];
}

export const AllCards = ({ characterData }: Props) => {
  return (
    <div className={style.mainContainer}>
      {characterData.length ? (
        characterData?.map((character: any) => (
          <CharacterCard
            key={character?.id}
            name={character?.name}
            species={character?.species}
            gender={character?.gender}
            imageSource={character?.image}
            characterId={character?.id}
          />
        ))
      ) : (
        <h1>No Data Available</h1>
      )}
    </div>
  );
};
