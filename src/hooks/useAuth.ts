import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
  const context = useContext(AuthContext);
  useDebugValue(context.auth, (auth) => (auth?.user ? "authenticated" : "unauthenticated"));
  return context; // Return the whole context, not just `auth`
};


export default useAuth;
