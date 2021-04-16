import { Flavor } from './helper.types';

/**
 * Alias for uuid
 */
export type uuid = Flavor<string, 'uuid'>;

/**
 * Alias for standard iso date
 */
export type isoDate = Flavor<string, 'isoDate'>;

/**
 * Alias for unsigned integer;
 */
export type uint = Flavor<number, 'uint'>;

/**
 * String literal for mime types
 */
export type mimetype = Flavor<string, 'mimetype'>;

/**
 * Record with 'any' entries
 */
export type RecordAny = Record<keyof any, any>;
