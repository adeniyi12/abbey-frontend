import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export const getFeeds = () => {
  const axiosPrivate = useAxiosPrivate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["getFeeds"],
    queryFn: async () => await axiosPrivate.get("/feed"),
  });

  return { data: data?.data?.data, isLoading, error };
};
