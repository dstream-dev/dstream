import * as React from "react";
import { AuthProvider } from "./context/AuthContext";

interface IProps {
  children: React.ReactNode;
}

const AppProviders = ({ children }: IProps) => (
  <AuthProvider>{children}</AuthProvider>
);

export default AppProviders;
