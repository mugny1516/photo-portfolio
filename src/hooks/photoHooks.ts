import useSWR from "swr";
import { Photo } from "../types/photo";
import { LoadState, ListTypeResponse } from "../types/fetch";

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      "X-API-KEY": import.meta.env.VITE_MICROCMS_API_KEY,
    },
  }).then((res) => res.json());
const endpoint = import.meta.env.VITE_MICROCMS_ENDPOINT;

export const usePhotos = () => {
  const { data, error, isLoading }: LoadState<ListTypeResponse<Photo>> = useSWR(
    `${endpoint}/photo-list?limit=100`,
    fetcher
  );
  return { data: data?.contents, error, isLoading };
};
