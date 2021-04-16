/**
 * Creates a brand with partial __brand value. This allows Surface type to
 * be used if the need emerges; while still returning an error if different
 * flavors are mixed
 *
 * @remarks
 * The shape of this type is modelled after
 * {@link https://github.com/piotrwitek/utility-types#brandt-u
 * | Brand type in piotrwitek/utility-types}.
 * For easy access, this Brand type is also exported from this repo
 */
export type Flavor<SurfaceType, BrandType> = SurfaceType & {
  __brand?: BrandType;
};
