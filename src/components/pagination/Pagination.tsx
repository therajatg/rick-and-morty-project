import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Pagination as PaginationComponent,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { getPagesArrayToDisplay } from "../../containers/helpers";

interface Props {
  totalPagesArray: number[];
  currentPageNumber: number;
}

export const Pagination = ({ totalPagesArray, currentPageNumber }: Props) => {
  const [pagesArray, setPagesArray] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPagesArrayToDisplay(currentPageNumber, totalPagesArray, setPagesArray);
  }, [currentPageNumber, totalPagesArray]);

  return (
    <PaginationComponent aria-label="Page navigation example">
      <PaginationItem>
        <PaginationLink
          previous
          onClick={() => {
            if (currentPageNumber > 1) {
              navigate(`/page/${currentPageNumber - 1}`);
            }
          }}
        />
      </PaginationItem>
      {pagesArray.map((pageNumber: number) => (
        <PaginationItem active={pageNumber === currentPageNumber}>
          <PaginationLink onClick={() => navigate(`/page/${pageNumber}`)}>
            {pageNumber}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem>
        <PaginationLink
          next
          onClick={() => {
            if (currentPageNumber < totalPagesArray.length) {
              navigate(`/page/${currentPageNumber + 1}`);
            }
          }}
        />
      </PaginationItem>
    </PaginationComponent>
  );
};
