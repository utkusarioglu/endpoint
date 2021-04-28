import type {
  RequiredValidateProps,
  RequiredPrepareProps,
  IsFailInput,
} from './endpoint.types';

/**
 * An identity function that allows the validation of endpoint strings through
 * the defined generic value
 *
 * @remarks
 * Unless you are defining the generic types, there is no reason to use this
 * method. Its utility comes from comparing the endpoint input with the generic
 * provided.
 *
 * @generic Ep string literal version of the endpoint to be compared against
 *  the param
 * @param endpoint endpoint string to validate
 */
export const validateEndpoint: <
  EndpointHierarchy extends RequiredValidateProps
>(
  endpoint: EndpointHierarchy['Endpoint']
) => string = (endpoint) => endpoint;

/**
 * Prepares an endpoint to which the app will connect. The method also ensures
 * type safety through the generics
 *
 * @generics
 * @param Endpoint endpoint string literal from public api
 * @param Params types for the parameters that will be placed as request params
 * and will be accessed by the express server with `req.params`
 *
 * @param endpoint endpoint to format skeleton to which the connection will be made
 * @param params params that shall be placed into the skeleton
 * @param query query object that shall be parsed into the skeleton
 */
export function prepareEndpoint<EndpointHierarchy extends RequiredPrepareProps>(
  endpoint: EndpointHierarchy['Endpoint'],
  params?: EndpointHierarchy['_req']['Params'],
  query?: EndpointHierarchy['_req']['Query']
): string {
  let preparedEndpoint: string = endpoint;

  // Check of params.constructor === "object" is omitted
  // as this check is handled by ts
  if (params && Object.keys(params).length > 0) {
    Object.entries(params).forEach(([placeholder, param]) => {
      preparedEndpoint = preparedEndpoint.replace(
        `:${placeholder}`,
        '' + param // faster than toString() while using with primitives
      );
    });
  }

  // Apply query pairs if there are any
  if (query && Object.keys(query).length > 0) {
    preparedEndpoint +=
      '?' +
      Object.entries(query)
        .map(
          ([key, value]) =>
            encodeURIComponent(key) + '=' + encodeURIComponent(value)
        )
        .join('&');
  }

  return preparedEndpoint;
}

/**
 * Returns a boolean based of whether the request has failed.
 * Returns true on fail.
 *
 * @param data Data object returned from fetch, axios or alike
 * @returns boolean, true if the request state is 'fail'
 */
export function isFail(data: IsFailInput): boolean {
  return data.state === 'fail';
}
