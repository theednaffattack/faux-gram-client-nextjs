// Promise result for use with NextJS pages
export type PromiseResult<T> = T extends Promise<infer U> ? U : T;
