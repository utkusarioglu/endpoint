/**
 * An identity function that allows the validation of endpoint strings through
 * the defined generic value
 *
 * @param endpoint endpoint string to validate
 */
export const validateEndpoint: <T extends string>(endpoint: T) => string = (
  endpoint
) => endpoint;

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
export function prepareEndpoint<Endpoint extends string, Params>(
  endpoint: Endpoint,
  params?: Params
): string {
  let preparedEndpoint: string = endpoint;

  if (params) {
    Object.entries(params).forEach(([strRepresentation, param]) => {
      preparedEndpoint = preparedEndpoint.replace(
        `:${strRepresentation}`,
        param
      );
    });
  }
  return preparedEndpoint;
}
