import type { WithId, WithErrors } from './mixin.types';

/**
 * Mixin for response success state
 */
export type ResponseSuccess<ResSuccessBody> = WithId & {
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
 * Types hierarchy for response states
 */
export type ResStates<ResSuccessBody> = {
  Success: ResponseSuccess<ResSuccessBody>;
  Fail: ResponseFail;
  Union: ResponseSuccess<ResSuccessBody> | ResponseFail;
};
