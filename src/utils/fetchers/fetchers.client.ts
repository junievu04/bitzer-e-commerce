"use client";

import { HTTP_STATUS_CODE } from "@/constants/http-status";
import { ApiResponseError } from "@/utils/fetchers/fetchers.error";
import {
  FetchOptions,
  getFetchQueryOptions,
} from "@/utils/fetchers/fetchers.utils";

const REQUEST_TIMEOUT = 10000;

const fetchApi = async <
  TResponseData,
  TRequestBody = unknown,
  TErrorBody = unknown,
>(
  url: string,
  options: FetchOptions<TRequestBody> = {},
): Promise<TResponseData> => {
  const processResponse = async (response: Response) => {
    // handle error with empty body
    if (!response.ok && response.headers.get("content-length") === "0") {
      return "";
    }
    const isJSONResponse = options.isJSONResponse ?? true;
    const returnHeaders = options.returnHeaders ?? false;
    const res = isJSONResponse ? response.json() : response.text();
    if (!returnHeaders) {
      return res;
    }

    const data = await res;
    return {
      data,
      headers: Object.fromEntries(response.headers),
      status: response.status,
      statusText: response.statusText,
    };
  };

  try {
    const timeout = options.timeout ?? REQUEST_TIMEOUT;
    let timeoutId;
    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(() => {
        const message = "Request timeout";
        const timeoutResponse = {
          status: HTTP_STATUS_CODE.REQUEST_TIMEOUT,
          statusText: message,
        } as Response;
        const timeoutErrorBody = { error: { message } };

        reject(
          new ApiResponseError(timeoutResponse, timeoutErrorBody, message),
        );
      }, timeout);
    });

    const rawResponsePromise = fetch(url, getFetchQueryOptions(options));

    const rawResponse = (await Promise.race([
      rawResponsePromise,
      timeoutPromise,
    ])) as Response;
    clearTimeout(timeoutId);
    if (rawResponse.status === 204) {
      return Promise.resolve() as TResponseData;
    }

    const response: TResponseData | TErrorBody =
      await processResponse(rawResponse);
    if (rawResponse.ok) {
      return response as TResponseData;
    }

    throw new ApiResponseError(rawResponse, response as TErrorBody);
  } catch (error) {
    throw error;
  }
};

export const defaultFetchFn = async <TResponseData, TRequestBody = unknown>(
  path: string,
  options?: FetchOptions<TRequestBody>,
): Promise<TResponseData> => {
  const baseUrl = window.location.origin;
  const url = new URL(`/${path}`, baseUrl);

  return fetchApi(url.toString(), options);
};
