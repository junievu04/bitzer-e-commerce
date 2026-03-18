export interface FetchOptions<TRequestBody> {
  method?: string
  headers?: Record<string, string>
  body?: TRequestBody
  isJSONResponse?: boolean
  returnHeaders?: boolean
  timeout?: number
}

const getMutationRequestBody = <TRequestBody>(
  requestBody: TRequestBody,
): BodyInit | undefined => {
  if (requestBody) {
    return requestBody instanceof Blob || requestBody instanceof FormData
      ? requestBody
      : JSON.stringify(requestBody)
  }
  return undefined
}

export const getFetchQueryOptions = <TRequestBody>({
  method = 'GET',
  headers,
  body,
}: FetchOptions<TRequestBody>): RequestInit => {
  return {
    method,
    headers: {
      Accept: 'application/json',
      ...headers,
    },
    ...(body ? {body: getMutationRequestBody(body)} : {}),
  }
}

export const parseErrorBody = async <TErrorBody = unknown>(
  response: Response,
): Promise<TErrorBody | string> => {
  // Handle error with empty body - similar to fetchApi logic
  let errorBody: TErrorBody | string = '' as TErrorBody
  if (response.headers.get('content-length') !== '0') {
    try {
      // Try to parse error response for better error handling
      errorBody = (await response.clone().json()) as TErrorBody
    } catch {
      try {
        errorBody = (await response.clone().text()) as TErrorBody
      } catch {
        // Keep empty string if both fail
        errorBody = '' as TErrorBody
      }
    }
  }
  return errorBody
}
