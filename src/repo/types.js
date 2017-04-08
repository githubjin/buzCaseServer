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
  categories?: Array<string>,
  gender?: string,
  birthday?: number,
  homePlace?: HomePlace,
  jobs?:Array<string>,
  marriage?:string,
  createOn?: number,
  education: string,
}
export type ConditionsWrap = {
  filter: Conditions
}
export type CommonArgs = {
  sorters?: Array<Sorter>,
  pageSize: number,
  page: number,
}
