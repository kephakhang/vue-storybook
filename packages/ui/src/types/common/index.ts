export * as CSS from "csstype";

// TODO: Remove this type export when this package is migrated to Vue 3
// eslint-disable-next-line vue/prefer-import-from-vue
export type { StyleValue, CSSProperties } from "@vue/runtime-dom";

export type PageableResponse = {
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  number: number;
  sort: Sort;
  size: number;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};

type Pageable = {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
  paged: boolean;
};

type Sort = {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
};

export type TimeQueryParams = {
  timeScale: "DATE" | "WEEK" | "MONTH" | "QUARTER" | "YEAR" | "CUSTOM";
  timeValue: string;
  fromDate: string;
  toDate: string;
};

type SortOrder = "asc" | "desc";
export type SortQuryParamValue = `${string},${SortOrder}`;

export type PaginationQueryParams = {
  page: number;
  size: number;
  sort: SortQuryParamValue;
};
