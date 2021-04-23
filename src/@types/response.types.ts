import type {
  WithRequestId,
  WithErrors,
  WithFailState,
  WithSuccessState,
} from './mixin.types';

/**
 * Mixin for response success state
 */
export type ResSuccessOpinionated<ResSuccessBody> = WithRequestId &
  WithSuccessState & {
    body: ResSuccessBody;
  };

/**
 * Response fail state
 */
export type ResFailOpinionated = WithRequestId & WithFailState & WithErrors;

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
