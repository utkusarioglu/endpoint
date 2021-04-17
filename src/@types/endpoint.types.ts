import type { WithId, WithErrors } from './mixin.types';

/**
 * Mixin for response success state
 */
export type ResponseSuccess<T> = WithId & {
  state: 'success';
  body: T;
};

/**
 * Response fail state
 */
export type ResponseFail = WithId &
  WithErrors & {
    state: 'fail';
  };

/**
 * Types hierarchy for response states
 */
type ResStates<ResSuccessType> = {
  Union: ResponseSuccess<ResSuccessType> | ResponseFail;
  Success: ResponseSuccess<ResSuccessType>;
  Fail: ResponseFail;
};

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
