import type { WithId, WithErrors } from './mixin.types';

/**
 * Mixin for response success state
 */
export type ResSuccessOpinionated<ResSuccessBody> = WithId & {
  state: 'success';
  body: ResSuccessBody;
};

/**
 * Response fail state
 */
export type ResponseFail = WithId &
  WithErrors & {
    state: 'fail';
  };

/**
 * Response states for opinionated response
 */
export type ResStatesForBody<ResSuccessBody> = {
  Success: ResSuccessOpinionated<ResSuccessBody>;
  Fail: ResponseFail;
  Union: ResSuccessOpinionated<ResSuccessBody> | ResponseFail;
};

/**
 * Types hierarchy for response states
 */
export type ResStates<ResSuccessBody> = {
  Success: ResponseSuccess<ResSuccessBody>;
  Fail: ResponseFail;
  Union: ResponseSuccess<ResSuccessBody> | ResponseFail;
};
