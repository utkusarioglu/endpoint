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
export type ResStates<ResSuccessType> = {
  Union: ResponseSuccess<ResSuccessType> | ResponseFail;
  Success: ResponseSuccess<ResSuccessType>;
  Fail: ResponseFail;
};
