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
export type ResFailOpinionated = WithId &
  WithErrors & {
    state: 'fail';
  };

/**
 * Response states for opinionated response
 */
export type ResStatesOpinionated<ResSuccessBody> = {
  Success: ResSuccessOpinionated<ResSuccessBody>;
  Fail: ResFailOpinionated;
  Union: ResSuccessOpinionated<ResSuccessBody> | ResFailOpinionated;
};

/**
 * Types hierarchy for response states
 */
export type ResStatesMeek<
  ResSuccess extends ResSuccessExtends,
  ResFail extends ResFailExtends
> = {
  Success: ResSuccess;
  Fail: ResFailOpinionated;
  Union: ResSuccess | ResFail;
};

/**
 * Extends type for the basic shape of the user defined ResSuccess type
 */
export type ResSuccessExtends = Record<string, any>;

/**
 * Extends type for the basic shape of the user defined ResFail type
 */
export type ResFailExtends = Record<string, any>;
