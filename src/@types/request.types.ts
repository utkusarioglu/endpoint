import type { ParamAcceptedPrimitives } from '../endpoint/endpoint.types';

/**
 * Extends type for request parameters. This type defines the basic
 * outline for a params type that will come from the user
 */
export type ReqParamsExtends = Record<string, ParamAcceptedPrimitives>;

/**
 * Extends type for request body. This type defines the basic request
 * body that will be created by the user.
 */
export type ReqBodyExtends = Record<string, ParamAcceptedPrimitives>;

/**
 * Params type for the request section of rest endpoint types such as Get
 * and Post.
 */
export type ReqStatesParams<ReqParams extends ReqParamsExtends> = {
  Params: ReqParams;
};

/**
 * Params and Body types for the request section of the rest endpoint
 * types such as Get and Post
 */
export type ReqStatesParamsBody<
  ReqParams extends ReqParamsExtends,
  ReqBody extends ReqBodyExtends
> = {
  Params: ReqParams;
  Body: ReqBody;
};
