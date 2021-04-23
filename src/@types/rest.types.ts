import {
  ResStatesForBody,
} from './response.types';
import type {
  ReqStatesParams,
  ReqParamsExtends,
  ReqStatesParamsBody,
  ReqBodyExtends,
} from './request.types';

/*
 * Some of the definitions below are taken from:
 * {@link https://reqbin.com/Article/HttpMethods}
 */

/**
 * Rest GET endpoint types hierarchy
 *
 * The HTTP GET request method is used to request a resource from the
 * server. The GET request should only receive data (the server must
 * not change its state). If you want to change data on the server,
 * use POST, PUT, PATCH or DELETE methods.
 */
export type Get<
  Endpoint,
  ReqParams extends ReqParamsExtends,
  ResSuccessBody
> = {
  Endpoint: Endpoint;
  _get: {
    _req: ReqStatesParams<ReqParams>;
    _res: ResStates<ResSuccessBody>;
    _req: {
      Params: ReqParams;
    };
    _res: ResStates<ResSuccessType>;
  };
};

/**
 * Rest HEAD endpoint types hierarchy
 *
 * The HTTP HEAD method is used to request HTTP headers from the server.
 * The HTTP HEAD request is identical to the GET request except that
 * the server must not return the message body in the response. Requests
 * using the HTTP HEAD method should only retrieve data (server must not
 * change its state). If you want to change data on the server, use POST,
 * PUT, PATCH or DELETE methods.
 */
export type Head<Endpoint, ReqParams extends ReqParamsExtends> = {
  Endpoint: Endpoint;
  _head: {
    _req: ReqStatesParams<ReqParams>;
  };
};

/**
 * Rest POST endpoint types hierarchy
 *
 * The HTTP POST method is used to create or add a resource on the server.
 * Typically, the POST request adds a new resource to the server, while the
 * PUT request replaces an existing resource on the server. For example,
 * the HTTP POST request method is used by browsers when submitting HTML
 * form data to the server or when submitting data using jQuery/AJAX
 * requests. Unlike GET and HEAD requests, the HTTP POST requests may
 * change the server state.
 */
export type Post<
  Endpoint,
  ReqParams extends ReqParamsExtends,
  ReqBody extends ReqBodyExtends,
  ResSuccessType
> = {
  Endpoint: Endpoint;
  _post: {
    _req: ReqStatesParamsBody<ReqParams, ReqBody>;
    _res: ResStatesForBody<ResSuccessType>;
  };
};

/**
 * Rest PUT endpoint types hierarchy
 *
 * The HTTP PUT method is used to update an existing resource on the
 * server, while the POST method creates or adds a resource on the server.
 * Unlike GET and HEAD requests, the HTTP PUT request may change the server
 * state.
 */
export type Put<
  Endpoint,
  ReqParams extends ReqParamsExtends,
  ReqBody extends ReqBodyExtends,
  ResSuccessType
> = {
  Endpoint: Endpoint;
  _put: {
    _req: ReqStatesParamsBody<ReqParams, ReqBody>;
    _res: ResStatesForBody<ResSuccessType>;
  };
};

/**
 * Rest PATCH endpoint types hierarchy
 *
 * The HTTP PATCH method is used to make partial changes to an existing
 * resource. Typically, the PATCH method applies partial modifications
 * to a resource, while the PUT method performs a complete replacement
 * of the resource. Unlike GET and HEAD requests, the PATCH requests may
 * change the server state.
 */
export type Patch<
  Endpoint,
  ReqParams extends ReqParamsExtends,
  ReqBody extends ReqBodyExtends,
  ResSuccessType
> = {
  Endpoint: Endpoint;
  _patch: {
    _req: ReqStatesParamsBody<ReqParams, ReqBody>;
    _res: ResStatesForBody<ResSuccessType>;
  };
};

/**
 * Rest DELETE endpoint types hierarchy
 *
 * The HTTP DELETE method is used to delete a resource from the server.
 * Unlike GET and HEAD requests, the DELETE requests may change the server
 * state.
 *
 * Sending a message body on a DELETE request might cause some servers to
 * reject the request. For this reason, this library does not allow you to
 * define a body for your DELETE requests. You still can send data to the
 * server using URL parameters. This is usually an ID of the resource you
 * want to delete.
 */
export type Delete<
  Endpoint,
  ReqParams extends ReqParamsExtends,
  ResSuccessType
> = {
  Endpoint: Endpoint;
  _delete: {
    _req: ReqStatesParams<ReqParams>;
    _res: ResStatesForBody<ResSuccessType>;
  };
};
