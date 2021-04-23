import type { WithSuccessState, WithFailState } from '../@types/mixin.types';

/**
 * Primitives that are accepted as props for Params object
 */

export type ParamAcceptedPrimitives = string | boolean | number;

/**
 * Defines the properties that are required for the prepare function
 */
export type RequiredPrepareProps = {
  Endpoint: string;
  _req: {
    Params: Record<string, ParamAcceptedPrimitives>;
  };
};

/**
 * Defines the properties that are required for the validate function.
 */
export type RequiredValidateProps = {
  Endpoint: string;
};

/**
 * Input type for isFail function
 */
export type IsFailInput = WithSuccessState | WithFailState;
