import style from "./navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchTerm } from "../../slices/characterSlice";

export const Navbar = () => {
  const [placeholder, setPlaceholder] = useState<string>(
    "Search Character By Name"
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchTerm } = useSelector((store: any) => store.character);

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
    <nav className={style.navContainer} data-testid="a">
      <Link
        to="/"
        className={style.logo}
        onClick={() => dispatch(updateSearchTerm(""))}
      >
        <p>Rick&Morty</p>
      </Link>
      <div className={style.searchBar}>
        <input
          placeholder={placeholder}
          className={style.searchInput}
          value={searchTerm}
          onChange={(e) => {
            const searchTerm = e.target.value;
            dispatch(updateSearchTerm(searchTerm));
            if (searchTerm.trim() !== "") {
              navigate(`/${searchTerm}/page/${1}`);
            } else {
              navigate("/");
            }
          }}
        />
        <AiOutlineSearch className={style.searchIcon} />
      </div>
    </nav>
  );
};
