import style from "./characterCard.module.css";
import { useNavigate, useLocation } from "react-router-dom";

interface Props {
  name: string;
  species: string;
  gender: string;
  imageSource: string;
  characterId: number;
}

export const CharacterCard = ({
  name,
  species,
  gender,
  imageSource,
  characterId,
}: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div
      className={style.cardContainer}
      onClick={() =>
        navigate(
          `${
            location.pathname === "/" ? `/page/${1}` : location.pathname
          }/${characterId}`
        )
      }
    >
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
