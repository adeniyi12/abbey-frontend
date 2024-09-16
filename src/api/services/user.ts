import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const userDetails = (id: string) => {
  const axiosPrivate = useAxiosPrivate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => await axiosPrivate.get(`/users/${id}`),
  });

  return { data: data?.data?.data, isLoading, error };
};

export const updateUserDetails = () => {
  const axiosPrivate = useAxiosPrivate();
  const { mutate, error } = useMutation({
    mutationFn: (userData: any) => axiosPrivate.put("/users", userData),
    onSuccess: (result) => {
      toast.success(result?.data?.message);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  return { mutate, error };
};
