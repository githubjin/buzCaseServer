export type Sorter = {
  order: string,
  dir: "ASC" | "DESC"
};
export type HomePlace = {
  province?: string,
  city?: string,
  area?: string,
  address?: string
};
export type Conditions = {
  pageSize: number,
  page: number,
  sorters?: Array<Sorter>,
  conditions: Object
};
export type ConditionsWrap = {
  filter: Conditions
};
export type CommonArgs = {
  sorters?: Array<Sorter>,
  pageSize: number,
  page: number
};
export type CommonArgsWithToken = {
  sorters?: Array<Sorter>,
  pageSize: number,
  page: number,
  sessionToken?: string
};
