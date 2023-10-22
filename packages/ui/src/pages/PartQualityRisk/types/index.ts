import type {
  PageableResponse,
  PaginationQueryParams,
  TimeQueryParams,
} from "~/types/common";

// API
export type MoldInfo = {
  moldId: number;
  moldCode: string;
};

export type PartQualityRiskChartItem = {
  title: string;
  prodQty: number;
  goodProdQty: number;
  badProdQty: number;
  estimYieldRate: number;
};

export type RiskLevel = "HIGH" | "MEDIUM" | "LOW" | null;

export type PartQualityRiskHeatmapItem = {
  hour: string;
  date: string;
  riskLevel: RiskLevel;
  prodQty: number;
  descr: string;
};

export type PartQualityRiskContent = {
  partId: number;
  partName: string;
  partCode: string;
  moldId: MoldInfo["moldId"];
  moldCode: MoldInfo["moldCode"];
  supplierId: number;
  supplierName: string;
  supplierCode: string;
  locationId: number;
  locationName: string;
  locationCode: string;
  prodQty: number;
  estimYieldRate: number;
  trend: number;
};

export type GetPartQualityRisk = (
  args: Partial<PaginationQueryParams> & Partial<TimeQueryParams>
) => Promise<
  PageableResponse & {
    chartItems: PartQualityRiskChartItem[];
    heatmapItems: PartQualityRiskHeatmapItem[];
    content: PartQualityRiskContent[];
    moldId: number;
    moldCode: string;
  }
>;

export type GetHeatmapItems = (
  args: Partial<Pick<MoldInfo, "moldId">> & Partial<TimeQueryParams>
) => Promise<{
  heatmapItems: PartQualityRiskHeatmapItem[];
}>;

export type GetMoldItems = (
  args: { query?: string } & Partial<PaginationQueryParams> &
    Partial<TimeQueryParams>
) => Promise<
  PageableResponse & {
    content: MoldInfo[];
  }
>;

// COMMON
export type TableHeader = {
  id: number;
  title: string;
  styles: {
    width: string | number;
    align: "end" | "left" | "center" | "right" | "start" | undefined;
  };
  key: string;
  disabled: boolean;
};
