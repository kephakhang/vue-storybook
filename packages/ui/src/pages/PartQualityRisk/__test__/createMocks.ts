import type {
  GetHeatmapItems,
  GetMoldItems,
  GetPartQualityRisk,
  MoldInfo,
  PartQualityRiskChartItem,
  PartQualityRiskContent,
  PartQualityRiskHeatmapItem,
  RiskLevel,
} from "../types";
import { faker } from "@faker-js/faker";

function generateContent(): PartQualityRiskContent {
  return {
    moldId: faker.number.int(),
    moldCode: `T-${faker.number.int()}`,
    partId: faker.number.int({ max: 10000 }),
    partName: faker.commerce.productName(),
    partCode: `PT-${faker.number.int()}`,
    supplierId: faker.number.int(),
    supplierName: faker.company.name(),
    supplierCode: faker.company.name(),
    locationId: faker.number.int(),
    locationName: faker.company.name(),
    locationCode: faker.company.name(),
    prodQty: faker.number.int({ max: 10000000 }),
    estimYieldRate: faker.number.float({ max: 100, precision: 0.1 }),
    trend: faker.number.float({ min: -100, max: 100, precision: 0.1 }),
  };
}

const contents = Array(200).fill(0).map(generateContent);

const chartItems: PartQualityRiskChartItem[] = Array(7)
  .fill(0)
  .map((_, i) => ({
    title: `03/${13 + i}`,
    estimYieldRate: faker.number.int({ max: 100 }),
    prodQty: faker.number.int(),
    goodProdQty: faker.number.int(),
    badProdQty: faker.number.int(),
  }));

const riskLevels: RiskLevel[] = ["HIGH", "MEDIUM", "LOW", null];

function generateHeatmapItemsForOneDay(
  date: number
): PartQualityRiskHeatmapItem[] {
  return Array(24)
    .fill(0)
    .map((_, i) => {
      return {
        date: `03/1${date}`,
        hour: `${i < 10 ? "0" : ""}${i}`,
        riskLevel: riskLevels[faker.number.int({ min: 0, max: 3 })],
        prodQty: faker.number.int(),
        descr: "Production during warm-up time",
      };
    });
}

function generateHeatmapItems() {
  let data: PartQualityRiskHeatmapItem[] = [];
  for (let i = 0; i < 7; i++) {
    data = [...data, ...generateHeatmapItemsForOneDay(i)];
  }
  return data;
}

const moldItemsContents: MoldInfo[] = Array(150)
  .fill(0)
  .map((_, index) => {
    return {
      moldId: faker.number.int(),
      moldCode: `Tooling-${index}`,
    };
  });

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getMockPartQualityRisk({
  page = 1,
  size = 20,
}): ReturnType<GetPartQualityRisk> {
  const paged = contents.slice((page - 1) * size, page * size);
  await sleep(500);

  return {
    chartItems,
    heatmapItems: generateHeatmapItems(),
    content: paged,
    moldId: faker.number.int(),
    moldCode: `T-${faker.number.int()}`,
    pageable: {
      sort: {
        unsorted: true,
        sorted: false,
        empty: true,
      },
      offset: 0,
      pageNumber: page,
      pageSize: size,
      unpaged: false,
      paged: true,
    },
    totalElements: contents.length,
    totalPages: Math.round(contents.length / size),
    number: 0,
    sort: {
      unsorted: true,
      sorted: false,
      empty: true,
    },
    size,
    first: page === 1,
    last: page * size >= contents.length,
    numberOfElements: contents.length,
    empty: false,
  };
}

export async function getMockHeatmapItems(): ReturnType<GetHeatmapItems> {
  await sleep(500);

  return {
    heatmapItems: generateHeatmapItems(),
  };
}

export async function getMockMoldItems({
  page = 1,
  size = 5,
}): ReturnType<GetMoldItems> {
  const paged = moldItemsContents.slice((page - 1) * size, page * size);
  await sleep(500);

  return {
    content: paged,
    pageable: {
      sort: {
        unsorted: true,
        sorted: false,
        empty: true,
      },
      offset: 0,
      pageNumber: page,
      pageSize: size,
      unpaged: false,
      paged: true,
    },
    totalElements: moldItemsContents.length,
    totalPages: Math.round(moldItemsContents.length / size),
    number: 0,
    sort: {
      unsorted: true,
      sorted: false,
      empty: true,
    },
    size,
    first: page === 1,
    last: page * size >= moldItemsContents.length,
    numberOfElements: moldItemsContents.length,
    empty: false,
  };
}
