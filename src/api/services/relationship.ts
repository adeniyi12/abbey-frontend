import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";

export const userRelationships = (id: string, type: string) => {
  const axiosPrivate = useAxiosPrivate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["userRelationships", id, type],
    queryFn: async () => await axiosPrivate.get(`/relationships/${id}?type=${type}`),
  });

  return { data: data?.data?.data, isLoading, error };
};

export const followUser = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const { mutate, error } = useMutation({
    mutationFn: (id: string) => axiosPrivate.post(`/follow/${id}`),
    onSuccess: (result) => {
      toast.success(result?.data?.message);
      queryClient.invalidateQueries({ queryKey: ["userRelationships"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  return { mutate, error };
};

export const unFollowUser = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const { mutate, error } = useMutation({
    mutationFn: (id: string) => axiosPrivate.post(`/unfollow/${id}`),
    onSuccess: (result) => {
      toast.success(result?.data?.message);
      queryClient.invalidateQueries({ queryKey: ["userRelationships"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  return { mutate, error };
};

export const isFollowing = (id: string) => {
  const axiosPrivate = useAxiosPrivate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["isFollowing", id],
    queryFn: async () => await axiosPrivate.get(`/isFollowing/${id}`),
  });

  return { data: data?.data?.data, isLoading, error };
}
