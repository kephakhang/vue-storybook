export type FilterMode = "SELECTED" | "UNSELECTED";

export type GetFilterItemsRes = {
  content: FilterItem[];
} & PageableResponse;

// TODO(sun.lee): Remove duplicated type
export interface PageableResponse {
  pageable: PageInfo;
  last: boolean;
  totalElements: number;
  totalPages: number;
  number: number;
  sort: SortInfo;
  size: number;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

interface PageInfo {
  sort: SortInfo;
  offset: number;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
  paged: boolean;
}

interface SortInfo {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}

export type FilterItem = {
  id: number;
  name: string;
  code: string;
};

export type PageableArgs = {
  page?: number;
  size?: number;
  query?: string;
};

export type SavedFilterItem = {
  resourceType: string;
  selectedCount: number;
  mode: FilterMode;
} & ({ selectedIds: Array<number> } | { unselectedIds: Array<number> });

export type SavedFilterListRes = {
  content: Array<SavedFilterItem>;
};

export type GetSavedFilterListFn = () => Promise<SavedFilterListRes>;

export type ResourceInfo = {
  resourceType: string;
  resourceUrl: string;
  name: string;
};

export type GetFilterResourceTypesFn = () => Promise<{
  content: Array<ResourceInfo>;
}>;

export type GetFilterItemsFn = (
  args: PageableArgs & { resourceType: string }
) => Promise<GetFilterItemsRes>;

export type SaveFilterItemsArgs = {
  mode: FilterMode;
  resourceType: string;
  selectedIds?: number[];
  unselectedIds?: number[];
};
