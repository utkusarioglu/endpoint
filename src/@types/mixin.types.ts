import type { Uuid } from 'brands-and-flavors';

/**
 * Includes id: uuid in the type
 */
export type WithId = { id: Uuid };

/**
 * Mixin for response error states involved
 *
 * @remarks
 * This particular error shape is chosen for its compatibility with
 * {@link https://formik.org | Formik}. Which allows the server to set
 * separate errors for each input field, and these to be reflected to the
 * user with minimal manipulation
 */
export type WithErrors = {
  errors: Partial<{
    [field: string]: string;
  }>;
};

/**
 * Mixin for request id, useful when the requests and responses carry an
 * id to avoid double sends
 */
export type WithRequestId = { requestId: Uuid };

/**
 * Mixin for using the success state property
 */
export type WithSuccessState = {
  state: 'success';
};

/**
 * Mixin for using the fail state property
 */
export type WithFailState = {
  state: 'fail';
};
