import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Pagination as PaginationComponent,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { getPagesArrayToDisplay } from "../../containers/helpers";

interface Props {
  currentPageNumber: number;
}

export const Pagination = ({ currentPageNumber }: Props) => {
  currentPageNumber = isNaN(currentPageNumber) ? 1 : currentPageNumber;
  const [pagesArray, setPagesArray] = useState<any>([]);
  const navigate = useNavigate();
  const { searchTerm } = useParams();
  const { info } = useSelector((store: any) => store.character);

  useEffect(() => {
    setPagesArray(getPagesArrayToDisplay(currentPageNumber, info.pages));
  }, [currentPageNumber, info.pages]);

  return (
    <PaginationComponent>
      <PaginationItem>
        <PaginationLink
          previous
          onClick={() => {
            if (currentPageNumber > 1) {
              if (searchTerm) {
                navigate(`/${searchTerm}/page/${currentPageNumber - 1}`);
              }
              navigate(`/page/${currentPageNumber - 1}`);
            }
          }}
        />
      </PaginationItem>
      {pagesArray.map((pageNumber: number) => (
        <PaginationItem
          active={pageNumber === currentPageNumber}
          key={pageNumber}
        >
          <PaginationLink
            onClick={() => {
              if (searchTerm) {
                navigate(`/${searchTerm}/page/${pageNumber}`);
              } else {
                navigate(`/page/${pageNumber}`);
              }
            }}
          >
            {pageNumber}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem>
        <PaginationLink
          next
          onClick={() => {
            if (currentPageNumber < info.pages) {
              if (searchTerm) {
                navigate(`/${searchTerm}/page/${currentPageNumber + 1}`);
              } else {
                navigate(`/page/${currentPageNumber + 1}`);
              }
            }
          }}
        />
      </PaginationItem>
    </PaginationComponent>
  );
};
