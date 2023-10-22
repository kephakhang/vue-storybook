/**
 *  set type of ClickHandler
 */
export type ClickHandler = (data: {
  currentPage: number;
  totalPage: number;
}) => void;
