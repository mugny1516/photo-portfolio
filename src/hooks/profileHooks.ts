import useSWR from "swr";
import { LoadState, ObjTypeResponse } from "../types/fetch";
import { Profile } from "../types/profile";

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      "X-API-KEY": import.meta.env.VITE_MICROCMS_API_KEY,
    },
  }).then((res) => res.json());
const endpoint = import.meta.env.VITE_MICROCMS_ENDPOINT;

export const useProfile = () => {
  const { data, error, isLoading }: LoadState<ObjTypeResponse & Profile> =
    useSWR(`${endpoint}/profile`, fetcher);
  return { data, error, isLoading };
};
