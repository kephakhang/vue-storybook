import axios from "axios";
import { z, type ZodType } from "zod";
import { createZodFetcher } from "zod-fetch";

function createAxiosInstance() {
  const csrfToken = document
    .querySelector("meta[name='_csrf']")
    ?.getAttribute("content");

  const csrfKey = document
    .querySelector("meta[name='_csrf_header']")
    ?.getAttribute("content");

  return axios.create({
    headers: {
      common: csrfKey ? { [csrfKey]: csrfToken } : undefined,
    },
  });
}

const instance = createAxiosInstance();

export const zaxios = {
  request: createZodFetcher(instance.request),
  head: createZodFetcher(instance.head),
  options: createZodFetcher(instance.options),
  get: createZodFetcher(instance.get),
  post: createZodFetcher(instance.post),
  delete: createZodFetcher(instance.delete),
  patch: createZodFetcher(instance.patch),
  postForm: createZodFetcher(instance.postForm),
  putForm: createZodFetcher(instance.putForm),
  patchForm: createZodFetcher(instance.patchForm),
  response: <T>(data: ZodType<T>) => z.object({ data }),
};
