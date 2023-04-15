import style from "./characterCard.module.css";

interface Props {
  name: string;
  species: string;
  gender: string;
  imageSource: string;
}

export const CharacterCard = ({
  name,
  species,
  gender,
  imageSource,
}: Props) => {
  return (
    <div className={style.cardContainer}>
      <img
        src={imageSource}
        alt={`${name}'s image`}
        className={style.cardImage}
      />
      <div>
        <p className={style.name}>{name}</p>
        <p>Species: {species}</p>
        <p>Gender: {gender}</p>
      </div>
    </div>
  );
};
