import style from "./navbar.module.css";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [placeholder, setPlaceholder] = useState("Search Character By Name");

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setPlaceholder("Search");
      } else {
        setPlaceholder("Search Character By Name");
      }
    }

    // event listener to detect changes in the screen width
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className={style.navContainer}>
      <Link to="/" className={style.logo}>
        <p>Rick&Morty</p>
      </Link>

      <div className={style.searchBar}>
        <input
          placeholder={placeholder}
          className={style.searchInput}
          onChange={(e) => {
            // dataDispatch({
            //   type: "SEARCH",
            //   payload: e.target.value,
            // });
          }}
        />
        <AiOutlineSearch className={style.searchIcon} />
      </div>
    </nav>
  );
};
