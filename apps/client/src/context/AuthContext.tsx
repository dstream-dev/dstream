import React from "react";
import api from "../apis";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export interface IAuthContext {
  logedIn: boolean;
  setUpStorge: ({
    access_token,
    refresh_token,
  }: {
    access_token: string;
    refresh_token: string;
  }) => void;
}

export const AuthContext = React.createContext<IAuthContext>(
  {} as IAuthContext
);

export const useAuth = () => React.useContext(AuthContext);

const useProviderAuth = () => {
  const [logedIn, setLogedIn] = React.useState(false);

  async function setUpStorge({
    access_token,
    refresh_token,
  }: {
    access_token: string;
    refresh_token: string;
  }) {
    try {
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      const res = await api.auth.login();
      localStorage.setItem("user", JSON.stringify(res.data));
      setLogedIn(true);
      console.log("jjj");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.response.data.message || err?.message);
    }
  }

  return {
    logedIn,
    setUpStorge,
  };
};

interface IProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: IProps) => {
  const auth = useProviderAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
