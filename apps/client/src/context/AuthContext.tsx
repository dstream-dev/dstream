import React from "react";
import api from "../apis";
import { toast } from "react-hot-toast";
import { IUser } from "../interfaces";

export interface IAuthContext {
  logedIn: boolean;
  activeOrganization: string;
  setLogedIn: (value: boolean) => void;
  setActiveOrganization: (value: string) => void;
  setUpStorge: ({ user }: { user: IUser }) => void;
}

export const AuthContext = React.createContext<IAuthContext>(
  {} as IAuthContext
);

export const useAuth = () => React.useContext(AuthContext);

const useProviderAuth = () => {
  const [logedIn, setLogedIn] = React.useState(false);
  const [activeOrganization, setActiveOrganization] =
    React.useState<string>("");

  async function setUpStorge({ user }: { user: IUser }) {
    try {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem(
        "organization_id",
        user.organizations[0].organization_id
      );
      setActiveOrganization(user.organizations[0].organization_id);
      setLogedIn(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.response.data.message || err?.message);
    }
  }

  return {
    logedIn,
    activeOrganization,
    setUpStorge,
    setLogedIn,
    setActiveOrganization,
  };
};

interface IProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: IProps) => {
  const auth = useProviderAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
