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
export const validateEndpoint: <Endpoint extends string>(
  endpoint: Endpoint
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
 */
export function prepareEndpoint<
  Endpoint extends string,
  Params extends Record<keyof any, string | number | boolean>
>(endpoint: Endpoint, params?: Params): string {
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

  return preparedEndpoint;
}
