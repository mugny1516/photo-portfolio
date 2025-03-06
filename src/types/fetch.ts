import { KeyedMutator } from "swr";

export type LoadState<T> = {
  data: T | undefined;
  error: Error | undefined;
  isLoading: boolean;
  mutate?: KeyedMutator<T>;
};

export type ListTypeResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

export type ObjTypeResponse = {
  createdAt: string;
  updatedAt: string;
  revisedAt: string;
};
