import type { PageableResponse, PaginationQueryParams } from "~/types/common";

export type GetProcessChange = (
  args: Partial<PaginationQueryParams> & {
    month?: string;
    day?: string;
    moldId?: number;
  }
) => Promise<
  PageableResponse & {
    content: ProcessChangeContent[];
    topItems: ProcessChangeTopItem[];
    chartItems: ProcessChangeChartItem[];
    totalProcChgCount: number;
  }
>;

export type ProcessChangeTopItem = {
  moldId: number;
  moldCode: string;
  /** process change count */
  procChgCount: number;
};

export type ProcessChangeChartItem = {
  title: string;
  procChgCount: number;
  /** produced quantity */
  prodQty: number;
};

export type ProcessChangeContent = {
  moldId: number;
  moldCode: string;
  dateHourRange: string;
  procChgCount: number;
  supplierId: number;
  supplierName: string;
  locationId: number;
  locationName: string;
};

export type ProcessChangeParts = {
  categoryId: number;
  code: string;
  id: number;
  name: string;
  partCode: string;
};

export type ProcessChangeDetailsContent = {
  procChgTime: string;
  locationId: number;
  locationName: string;
  parts: ProcessChangeParts[];
};

export type GetProcessChangeDetails = (
  args: Partial<PaginationQueryParams> & {
    dateHourRange: string;
    moldId: number;
  }
) => Promise<
  PageableResponse & {
    moldId: number;
    moldCode: string;
    dateHourRange: string;
    content: ProcessChangeDetailsContent[];
  }
>;
