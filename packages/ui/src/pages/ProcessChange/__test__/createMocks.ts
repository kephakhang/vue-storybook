import type {
  GetProcessChange,
  ProcessChangeContent,
  ProcessChangeDetailsContent,
  ProcessChangeParts,
} from "../types";
import { faker } from "@faker-js/faker";
import type { GetProcessChangeDetails } from "../types";

function generateContent(): ProcessChangeContent {
  return {
    moldId: faker.number.int(),
    moldCode: `T-${faker.number.int()}`,
    dateHourRange: faker.date.past().toISOString(),
    procChgCount: faker.number.int({ max: 1000 }),
    supplierId: faker.number.int(),
    supplierName: faker.company.name(),
    locationId: faker.number.int(),
    locationName: faker.location.city(),
  };
}

const contents = Array(200).fill(0).map(generateContent);

const topItems = contents.slice(0, 20).map(({ moldId, moldCode }) => ({
  moldId,
  moldCode,
  procChgCount: faker.number.int({ max: 1000 }),
}));

const chartItems = Array(4)
  .fill(0)
  .map((_, i) => ({
    title: `04/${13 + i}`,
    procChgCount: faker.number.int(),
    prodQty: faker.number.int(),
  }));

const totalProcChgCount = topItems
  .map((item) => item.procChgCount)
  .reduce((acc, cur) => {
    return acc + cur;
  }, 0);

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getMockProcessChanges({
  page = 1,
  size = 20,
}): ReturnType<GetProcessChange> {
  const paged = contents.slice((page - 1) * size, page * size);
  await sleep(500);

  return {
    content: paged,
    topItems,
    chartItems,
    totalProcChgCount,
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

function generateParts(): ProcessChangeParts {
  return {
    categoryId: faker.number.int(),
    code: `${faker.number.int()}${faker.string.alpha({
      length: 1,
    })}`,
    id: faker.number.int(),
    name: faker.commerce.productName(),
    partCode: `${faker.number.int()}${faker.string.alpha({
      length: 1,
    })}`,
  };
}

function generateDetailContent(): ProcessChangeDetailsContent {
  return {
    procChgTime: faker.date.past().toISOString(),
    locationId: faker.number.int(),
    locationName: faker.location.city(),
    parts: Array(faker.number.int({ max: 10 }))
      .fill(0)
      .map(generateParts),
  };
}

const detailContents = Array(200).fill(0).map(generateDetailContent);

export async function getMockProcessChangeDetails({
  page = 1,
  size = 20,
}): ReturnType<GetProcessChangeDetails> {
  const paged = detailContents.slice((page - 1) * size, page * size);

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
    moldId: faker.number.int(),
    moldCode: `T-${faker.number.int()}`,
    dateHourRange: faker.date.past().toISOString(),
    totalElements: detailContents.length,
    totalPages: Math.round(detailContents.length / size),
    number: 0,
    sort: {
      unsorted: true,
      sorted: false,
      empty: true,
    },
    size,
    first: page === 1,
    last: page * size >= detailContents.length,
    numberOfElements: detailContents.length,
    empty: false,
  };
}
