import { useMutation } from "@tanstack/react-query";
import { publicApi } from "../axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export const userSignUp = () => {
  const navigate = useNavigate();

  const { mutate, error } = useMutation({
    mutationFn: (userData: any) => publicApi.post("/users/signup", userData),
    onSuccess: (result) => {
      toast.success(result?.data?.message);
      navigate("/login");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  return { mutate, error };
};

export const userLogin = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const { mutate, error } = useMutation({
    mutationFn: (userData: any) => publicApi.post("/login", userData),
    onSuccess: (result) => {
      const accessToken = result?.data?.token;
      const user = result?.data?.data;
      setAuth({ accessToken, user });
      toast.success(result?.data?.message);
      navigate("/feed");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  return { mutate, error };
};
