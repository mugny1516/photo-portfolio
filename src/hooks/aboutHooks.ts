import useSWR from "swr";
import { LoadState, ObjTypeResponse } from "../types/fetch";
import { About } from "../types/about";

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      "X-API-KEY": import.meta.env.VITE_MICROCMS_API_KEY,
    },
  }).then((res) => res.json());
const endpoint = import.meta.env.VITE_MICROCMS_ENDPOINT;

export const useAbout = () => {
  const { data, error, isLoading }: LoadState<ObjTypeResponse & About> = useSWR(
    `${endpoint}/about`,
    fetcher,
  );
  return { data, error, isLoading };
};
