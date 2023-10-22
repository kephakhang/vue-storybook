import { z } from "zod";
import { zaxios } from "~/utils/axios";

const sortSchema = z.object({
  sorted: z.boolean(),
  unsorted: z.boolean(),
  empty: z.boolean(),
});

export const pageableResponseSchema = z.object({
  pageable: z.object({
    sort: sortSchema,
    offset: z.number().int(),
    pageNumber: z.number().int(),
    pageSize: z.number().int(),
    unpaged: z.boolean(),
    paged: z.boolean(),
  }),
  last: z.boolean(),
  totalElements: z.number().int(),
  totalPages: z.number().int(),
  number: z.number().int(),
  sort: sortSchema,
  size: z.number().int(),
  first: z.boolean(),
  numberOfElements: z.number().int(),
  empty: z.boolean(),
});

const sortOrderSchema = z.custom<"asc" | "desc">((value) => {
  return value === "asc" || value === "desc";
}, 'Sort order must be either "asc" or "desc"');

export const pageableQueryParamsSchema = z.object({
  page: z.number().int(),
  size: z.number().int(),
  sort: sortOrderSchema.optional(),
});

export type PageableQueryParams = z.infer<typeof pageableQueryParamsSchema>;

const timeScales = [
  "DATE",
  "WEEK",
  "MONTH",
  "QUARTER",
  "YEAR",
  "CUSTOM",
] as const;
const timeScaleSchema = z.enum(timeScales);

export const timeQueryParamsSchema = z.object({
  timeScale: timeScaleSchema,
  timeValue: z.string(),
});

export type TimeQueryParams = z.infer<typeof timeQueryParamsSchema>;

export const successResponseSchema = zaxios.response(
  z.object({
    success: z.boolean(),
  })
);

export type SuccessResponse = z.infer<typeof successResponseSchema>;
