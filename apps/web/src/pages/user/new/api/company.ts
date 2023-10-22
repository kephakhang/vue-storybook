import { z } from "zod";
import {
  pageableResponseSchema,
  type PageableQueryParams,
} from "~/common/types";
import { zaxios } from "~/utils/axios";

const companyTypes = ["IN_HOUSE", "SUPPLIER", "TOOL_MAKER"] as const;
const companyTypeTexts = ["In-house", "Supplier", "Toolmaker"] as const;
export type CompanyStatuses = "active" | (typeof companyTypes)[number];

const companySchema = z.object({
  companyCode: z.string(),
  companyType: z.enum(companyTypes),
  companyTypeText: z.enum(companyTypeTexts),
  email: z.string().nullable(),
  emoldino: z.boolean(),
  enabled: z.boolean(),
  id: z.number(),
  name: z.string(),
});

const companiesResponseSchema = zaxios.response(
  z.object({ content: z.array(companySchema) }).merge(pageableResponseSchema)
);
type CompaniesResponse = z.infer<typeof companiesResponseSchema>;
export type Company = z.infer<typeof companySchema>;

type GetCompaniesParams = PageableQueryParams & {
  query?: string;
  status?: CompanyStatuses;
};
abstract class CompanyBaseApi {
  abstract getCompanies(filter: GetCompaniesParams): Promise<CompaniesResponse>;
}

class CompanyApi extends CompanyBaseApi {
  override getCompanies = (filter: GetCompaniesParams) => {
    return zaxios.get(companiesResponseSchema, "/api/companies", {
      params: filter,
    });
  };
}

class CompanyMockApi extends CompanyBaseApi {
  companies: Company[] = [];

  async initCompanies() {
    const fakerModule = await import("@faker-js/faker");
    const faker = fakerModule.faker;

    for (let i = 0; i < 100; i++) {
      this.companies.push({
        companyCode: faker.company.name(),
        companyType: faker.helpers.arrayElement(companyTypes),
        companyTypeText: faker.helpers.arrayElement(companyTypeTexts),
        email: faker.internet.email(),
        emoldino: faker.datatype.boolean(),
        enabled: faker.datatype.boolean(),
        id: faker.number.int(),
        name: faker.company.name(),
      });
    }
  }

  override getCompanies = async ({
    page,
    size = 20,
    status = "active",
    query = "",
  }: GetCompaniesParams) => {
    if (this.companies.length === 0) {
      await this.initCompanies();
    }
    await this.sleep(500);

    let filteredCompanies = structuredClone(this.companies);
    if (status !== "active") {
      filteredCompanies = filteredCompanies.filter(
        (company) => company.companyType === status
      );
    }
    if (query) {
      filteredCompanies = filteredCompanies.filter((company) =>
        (company.name + company.companyCode)
          .toLowerCase()
          .includes(query.toLowerCase())
      );
    }
    const slicedCompanies = filteredCompanies.slice(
      (page - 1) * size,
      page * size
    );

    return {
      data: {
        content: slicedCompanies,
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
        on: false,
        totalElements: filteredCompanies.length,
        totalPages: Math.round(filteredCompanies.length / size),
        number: 0,
        sort: {
          unsorted: true,
          sorted: false,
          empty: true,
        },
        size,
        first: page === 1,
        last: page * size >= filteredCompanies.length,
        numberOfElements: filteredCompanies.length,
        empty: false,
      },
    };
  };

  sleep(ms = 200) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const companyApi = import.meta.env.DEV
  ? new CompanyMockApi()
  : new CompanyApi();
