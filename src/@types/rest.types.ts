import { ResStates } from './response.types';

/**
 * Rest GET endpoint types hierarchy
 */

export type Get<Endpoint, ReqParams, ResSuccessType> = {
  Endpoint: Endpoint;
  _get: {
    _req: {
      Params: ReqParams;
    };
    _res: ResStates<ResSuccessType>;
  };
};
/**
 * Rest POST endpoint types hierarchy
 */

export type Post<Endpoint, ReqParams, ReqBody, ResSuccessType> = {
  Endpoint: Endpoint;
  _post: {
    _req: {
      Params: ReqParams;
      Body: ReqBody;
    };
    _res: ResStates<ResSuccessType>;
  };
};
