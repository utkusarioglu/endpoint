import type { ParamAcceptedPrimitives } from '../endpoint/endpoint.types';

/**
 * Extends type for request parameters. This type defines the basic
 * outline for a params type that will come from the user
 */
export type ReqParamsExtends = Record<string, ParamAcceptedPrimitives>;

/**
 * Extends type for request Query . This type defines the basic
 * outline for a Query  type that will come from the user
 */
export type ReqQueryExtends = Record<string, ParamAcceptedPrimitives>;

/**
 * Extends type for request body. This type defines the basic request
 * body that will be created by the user.
 */
export type ReqBodyExtends = Record<string, ParamAcceptedPrimitives>;

/**
 * Params type for the request section of rest endpoint types such as Get
 * and Post.
 */
export type ReqStatesParamsQuery<
  ReqParams extends ReqParamsExtends,
  ReqQuery extends ReqQueryExtends
> = {
  Params: ReqParams;
  Query: ReqQuery;
};

/**
 * Params and Body types for the request section of the rest endpoint
 * types such as Get and Post
 */
export type ReqStatesParamsQueryBody<
  ReqParams extends ReqParamsExtends,
  ReqQuery extends ReqQueryExtends,
  ReqBody extends ReqBodyExtends
> = {
  Params: ReqParams;
  Query: ReqQuery;
  Body: ReqBody;
};
