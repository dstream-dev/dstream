import React from "react";
import { toast } from "react-hot-toast";
import { IUser } from "../interfaces";
import api from "../apis";

export interface IAuthContext {
  loggedIn: boolean;
  activeOrganization: string;
  setLoggedIn: (value: boolean) => void;
  setActiveOrganization: (value: string) => void;
  setUpStorage: ({ user }: { user: IUser }) => void;
  fetchAccessToken: () => Promise<boolean>;
}

export const AuthContext = React.createContext<IAuthContext>(
  {} as IAuthContext
);

export const useAuth = () => React.useContext(AuthContext);

const useProviderAuth = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [activeOrganization, setActiveOrganization] =
    React.useState<string>("");

  async function setUpStorage({ user }: { user: IUser }) {
    try {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem(
        "organization_id",
        user.organizations[0].organization_id
      );
      setActiveOrganization(user.organizations[0].organization_id);
      setLoggedIn(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.response.data.message || err?.message);
    }
  }

  async function fetchAccessToken() {
    try {
      const rt = localStorage.getItem("refresh_token") || "";
      if (!rt) return false;
      const response = await api.auth.fetchAccessToken(rt);
      if (response) {
        localStorage.setItem("access_token", response.access_token);
        localStorage.setItem("refresh_token", response.refresh_token);
        return true;
      }
      return false;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast.error(e.response.data.message || e?.message);
      return false;
    }
  }

  return {
    loggedIn,
    activeOrganization,
    setUpStorage,
    setLoggedIn,
    setActiveOrganization,
    fetchAccessToken,
  };
};

interface IProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: IProps) => {
  const auth = useProviderAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
